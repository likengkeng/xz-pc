<template>
  <div class="account">
    <div class='flex jc_sb al_center mb_20'>
      <el-row class='flex_g1'>
        <el-col :span='2' class='text_center line_40'>
           时间
        </el-col>
        <el-col :span="6">
          <el-date-picker
            style='width: 100%'
            v-model="queryTime"
            type="date"
            value-format='timestamp'
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span='2' class='text_center line_40'>
           状态
        </el-col>
        <el-col :span="6">
          <el-select v-model="touristCommentStatus" placeholder="请选择" clearable style='width: 90%'>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
      </el-row>
      <el-button type="primary" @click='query'>查询   </el-button>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
        <el-tab-pane label="序言" name="1"></el-tab-pane>
        <el-tab-pane label="领导关怀" name="2"></el-tab-pane>
        <el-tab-pane label="大事记" name="3"></el-tab-pane>
        <el-tab-pane label="组织工作" name="4"></el-tab-pane>
        <el-tab-pane label="榜样力量" name="5"></el-tab-pane>
        <el-tab-pane label="七地组声" name="6"></el-tab-pane>
      </el-tabs>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="文章标题">
        </el-table-column>
        <el-table-column
          prop="touristCommentContent"
          max-width='300px'
          label="评论内容">
          <template  slot-scope="scope">
            <div class='line_clamp2 tablehtml' v-html='scope.row.touristCommentContent'></div>
          </template>
        </el-table-column>
      
        <el-table-column
          prop="touristCommentStatus"
          label="状态">
          <template  slot-scope="scope">
            {{scope.row.touristCommentStatus==1?"审核通过":scope.row.touristCommentStatus==2?"审核中":"审核未通过"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createDatetime"
          label="评论时间">
        </el-table-column>
        <el-table-column
          label="操作" width='400px'>
          <template slot-scope="scope">
          <div>
            <el-button v-if='scope.row.touristCommentStatus==1' @click='reply(scope.row)'>回复</el-button>
            <el-button v-if='scope.row.touristCommentStatus==2' type='primary' @click='adopt(scope.row)'>审核通过</el-button>
            <el-button v-if='scope.row.touristCommentStatus==2' @click='noAdopt(scope.row)'>审核不通过</el-button>
            <el-button @click="delail(scope.row)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class='pages'>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="详情" :visible.sync="isShow">
      <div class='text_center size_16 mb_20'>{{type[detail.touristCommentType]}}</div>
      <div class='mb_20'>评论内容：</div>
      <div class='mb_20' v-html='detail.touristCommentContent'>
      </div>
      <div class='mb_20'>
        评论时间： {{detail.createDatetime}}
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="回复" :visible.sync="isReplyShow">
      <quill-editor 
        class='quill_editor'
          v-model="articleContent" 
          ref="myQuillEditor" 
          :options="editorOption" 
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
      </quill-editor>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isReplyShow = false">取 消</el-button>
        <el-button type="primary" @click="commentReply">确 定</el-button>
      </div>
    </el-dialog>
      <input v-show='false' type="file" id='check' multiple @change='changefile'>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import $http from '@/pc/api/event';
import Component from 'vue-class-component';
import { Message } from 'element-ui'

import { quillEditor, Quill } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    // ['clean'],                                         // remove formatting button
    ['voice']
]
@Component({
  components: {
            quillEditor,
            Quill,
        },
})

export default class Comment extends Vue {
  activeName: string = '1'
  tableData: Array<any> = []
  account: String = ''
  form: any = {}
  isShow: Boolean = false
  value1: String = ''
  options: Array<any> = [
    {
      value: '1',
      label: '审核通过'
    }, {
      value: '3',
      label: '审核不通过'
    }, {
      value: '2',
      label: '审核中'
    }
  ]
  type = {1:'序言', 2: '领导关怀', 3: '大事记', 4: '组织工作', 5: '榜样力量', 6:'七地组声'}
  touristCommentStatus: String = ''
  queryTime: any = ''
  pageSize: Number = 10
  total: Number = 0
  pageIndex: Number = 1
  detail = {}

  editorOption: any = {
      modules: {
      toolbar: {
          container: toolbarOptions,  // 工具栏
          handlers: {
          'image': function (value) {
              if (value) {
              document.getElementById('check').click()
              } else {
              this.quill.format('image', false);
              }
          },
          'video': function (value) {
              if (value) {
                  document.getElementById('check').click()
              } else {
              this.quill.format('video', false);
              }
          },
          'voice': function(value){ //添加工具方法，即点击时模仿点击上传组件的按钮
              if (value) {
              document.getElementById('check').click()
              } else {
              this.quill.format('voice', false);
              }
          }
          }
      }
      },
      initVoiceButton:function(){ //初始化"voice"按钮样式
      // let voiceButton = document.querySelector('.ql-voice'); //"ql-" 是插件自动加的前缀
      // voiceButton.classList.add('fa');
      // voiceButton.classList.add('fa-volume-up');
      // voiceButton.classList.add('fa-lg');
          // 当然，可以直接手写样式，如：
      // voiceButton.style.csstext = "width:80px; border:1px solid #ccc; border-radius:5px;";
      // voiceButton.innertext="上传音频";
      // const sourceEditorButton = document.querySelector('.ql-voice');
      // sourceEditorButton.style.cssText = "width:50px; border:1px solid #ccc; border-radius:5px;";
      // sourceEditorButton.innerText="音频"
      }
  }
  get editor() {
      return this.$refs?.myQuillEditor?.quill
  }
  onEditorReady(editor) { // 准备编辑器

  }
  onEditorBlur(){} // 失去焦点事件
  onEditorFocus(){} // 获得焦点事件
  onEditorChange(){} // 内容改变事件


  handleClick(){
    this.getList()
  }
  delail(item){
    console.log(this)
    this.detail = item
    this.isShow = true
  }
  format(shijianchuo){
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();

    var h = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    var mm = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes(); 
    var s = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    return `${y}-${m}-${d} ${h}:${mm}:${s}`
  }
  getList(){
    $http.commentList({
      touristCommentType: this.activeName,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      touristCommentStatus: this.touristCommentStatus,
      queryTime: this.queryTime
    })
    .then(res => {
      res.data.data.map(el => {
        el.createDatetime = this.format(el.createDatetime)
        return el
      })
      this.tableData = res.data.data
      this.total = res.data.totalElements
    })
  }
  query(){
    this.pageIndex = 1
    this.getList()
  }
  handleSizeChange(val){
    this.pageSize = val
    this.getList()
  }
  handleCurrentChange(val){
    this.pageIndex = val
    this.getList()
  }
  noAdopt(item){
    this.$confirm('审核不通过, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.commentNg({touristCommentId: item.touristCommentId})
      .then(el => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
        this.getList()
      })
    }).catch(() => {
               
    });
    
  }
  adopt(item){
    $http.commentOk({touristCommentId: item.touristCommentId})
    .then(el => {
      this.$message({
          type: 'success',
          message: '操作成功!'
        });
      this.getList()
    })
  }
  isReplyShow = false
  articleContent = ''
  touristCommentId = ''
  reply(item){
    this.touristCommentId = item.touristCommentId
    this.isReplyShow = true
  }
  commentReply(){
    $http.commentReply({
      touristCommentId: this.touristCommentId,
      content: this.articleContent
    })
    .then(res => {
      Message({  //elemen组件库中的提示组件
        message: '回复成功',
        type:'sucess',
        duration: 2000
      })
      this.getList()
      this.isReplyShow = false
    })
  }
  mounted() {
    this.getList()
  }

  changefile(e){
      const con = document.getElementById('check')
      console.log(con.files,con.files.length )
      if (con.files.length > 1) {
          Message('最多1张')
          return
      }
      if (con.files[0].size  > 5 * 1024 * 1024) {
            Message('文件最大5M')
          return
      }
      if (con.files[0].type.match(RegExp(/video/))) {
          if (!con.files[0].type.match(RegExp(/mp4/))) {
              Message('视频格式只允许mp4')
              return
          }
      }
      if (con.files[0].type.match(RegExp(/audio/))) {
          if (!con.files[0].type.match(RegExp(/mpeg/)) || !con.files[0].type.match(RegExp(/mp3/)) ) {
              Message('音频格式只允许mp3')
              return
          }
      }
      if (con.files[0]) {
          let file = con.files;
          let param = new FormData(); //创建form对象
          param.append("files", file[0]); //通过append向form对象添加数据
          $http.fileUpload(param).then((res) => {
              this.uploadSuccess(res.data)
          });

      }
  }
  uploadSuccess(res){
      console.log(res)
      let key = 'img'
      if (res.stffix == 'mp4') {
      key = 'video'
      }
      if (res.stffix == 'mp3') {
      key = 'audio'
      }
      let quill = this.editor
      let length = quill.getSelection().index;  // 获取光标所在位置

      let BlockEmbed = Quill.import('blots/block/embed');
      class AudioBlot extends BlockEmbed {
          static create(value) {
          console.log(value)
          let node = super.create();
          node.setAttribute('src', value.url);      //设置audio的src属性
          node.setAttribute('controls', true);      //设置audio的controls，否则他将不会显示
          node.setAttribute('controlsList', 'nodownload');      //设置audio的下载功能为不能下载
          node.setAttribute('id', 'voice');         //设置一个id
          return node;
          }
      }
      AudioBlot.blotName = key;
      AudioBlot.tagName = key;      //自定义的标签为audio
      Quill.register(AudioBlot);

      // insertEmbed(index: Number(插入的位置), type: String(标签类型), value: any(参数，将传入到create的方法中去), source: String = 'api')
      quill.insertEmbed(length, key,  {url: res.pathAll}, "api");
      quill.setSelection(length + 1);  //光标位置向后移动一位

  }

}
</script>

<style scoped lang="scss">
.account{
  padding: 13px 8px;

  .input-with-select{
    width: 550px;
  }


  .color{
    color: #1890FFFF;
  }
  .mb_20{
    margin-bottom: 20px;
  }
  .pages{
    padding: 0px 19px;
    margin: 34px 0px;
    text-align: right;
  }
  .line_40{
    line-height: 40px;
  }
}
::v-deep .ql-toolbar.ql-snow + .ql-container.ql-snow{
  height: 200px;
}
</style>
<style>
  .tablehtml{
    img{
      width: 50px;
      height: 50px;
    }
    video{
      width: 50px;
      height: 50px;
    }
  }
</style>
