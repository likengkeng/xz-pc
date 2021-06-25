<template>
  <div class="LeaderCare_edit">
    <div>
      <el-form ref="form" label-position='right' :model="form" label-width="90px">
        <el-form-item label="发布类型：" class='mb_25'>
          <el-radio-group v-model="form.articleVO.articleType">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">超链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if='form.articleVO.articleType == 1'>
          <el-form-item label="选择：" class='mb_25'>
            <el-button @click='material(3)'>图片</el-button>
            <el-button @click='material(2)'>音频</el-button>
            <el-button @click='material(1)'>视频</el-button>
          </el-form-item>
          <el-form-item label="" class='mb_25'>
            <el-input class='header' v-model="form.articleVO.articleTitle" placeholder="请在这里输入标题"></el-input>
          </el-form-item>
          <el-form-item label="" class='mb_25'>
            <div class="edit_container">
                <quill-editor
                    v-model="form.articleVO.articleContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>
            </div>
              <!-- <MyQuill v-model='form.articleContent'></MyQuill> -->
          </el-form-item>
        </div>
        <div>
          <el-form-item label="选择封面图片" class='mb_25 img_size' label-width='120px' props='articleVO.articleCoverImagePath' :rules="{ required: true, message: '封面不能为空'}">
              <el-upload
                class="avatar-uploader"
                :action="apiUrl + '/file/upload'"
                :on-success="handleAvatarSuccess"
                 :headers="importHeaders"
                :show-file-list="false"
                name='files'
                :before-upload='before'
                >
                <div v-loading="loading">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </el-upload>
          </el-form-item>
        </div>
        <div v-if='form.articleVO.articleType == 1'>
          <el-form-item label="发布设置：" class='mb_25' label-width='120px'>
            <el-radio-group v-model="form.articleVO.articleCanDiscuss">
              <el-radio :label="1">用户可评论</el-radio>
              <el-radio :label="2">用户不可评论</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-if='form.articleVO.articleType == 2'>
          <el-form-item label="链接" class='mb_25'>
            <el-input class='' v-model="form.articleVO.articleSuperUrl" placeholder="粘贴地址"></el-input>
          </el-form-item>
        </div>

      </el-form>
      <div class='flex jc_center'>
        <el-button type="primary" @click='sumbit("form")'>保存</el-button>
        <el-button @click='dialogVisible=true'>预览</el-button>
      </div>
    </div>
    <el-dialog title="上传" :visible.sync="allObj.dialogTableVisible">
      <MyUpload @uploadSuccess='uploadSuccess'></MyUpload>
    </el-dialog>

     <el-dialog title="选择素材" :visible.sync="isShow" width='70vw'>
      <div>
        <el-checkbox-group v-model="dialogCheckList" class='flex wrap'>
          <div v-for='(item, index) in list' :key='index' class='dialog_list'>
            <el-checkbox :label="item" class='pr'>
              <video :src="item.pathAll" class='dialog_video' v-if='dialogType==1'>
                您的浏览器不支持 video 标签。
              </video>
              <audio :src="item.pathAll" controls class='dialog_video' v-if='dialogType==2'>
                您的浏览器不支持 audio 标签。
              </audio>
              <img :src='item.pathAll' class='dialog_video' v-if='dialogType==3' />

              <div class='line_clamp1 dialog_video_name'>{{item.name}}</div>
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="pageChange">
        </el-pagination>
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="60%">
      <div class=''center>{{form.articleVO.articleTitle}}</div>
      <div v-html='form.articleVO.articleContent'></div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
      <input v-show='false' type="file" id='check' multiple @change='changefile'>
  </div>
</template>

<script lang="ts">
// import MyQuill from '@/pc/components/MyQuill.vue'
import { quillEditor, Quill } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Vue from 'vue';
import Component from 'vue-class-component';
import MyUpload from '@/pc/components/MyUpload.vue'
import {apiUrl, imgUrl} from '@/pc/url.config.js'
import $http from '@/pc/api/event';
import { Message } from 'element-ui'
import VideoBlot from './video';
Quill.register(VideoBlot);


let allObj = {dialogTableVisible: false}
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
  components:{quillEditor, MyUpload}
})
export default class MyEdit extends Vue {
  apiUrl: String = apiUrl
  dialogVisible = false
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
      const sourceEditorButton = document.querySelector('.ql-voice');
      sourceEditorButton.style.cssText = "width:50px; border:1px solid #ccc; border-radius:5px;";
      sourceEditorButton.innerText="音频"
    }
  }
  onEditorReady(editor) { // 准备编辑器

  }
  onEditorBlur(){} // 失去焦点事件
  onEditorFocus(){} // 获得焦点事件
  onEditorChange(){} // 内容改变事件
  get editor() {
    return this.$refs.myQuillEditor.quill
  }
  importHeaders = {
    TOKEN: sessionStorage.getItem("token")
  }
  loading: Boolean = false
  allObj: any = allObj
  form: any = {
    articleVO: {
      articleSuperUrl: '',
      articleTitle: '',
      articleContent: '',
      articleCanDiscuss: '',
      articleType: 1
    }
  }
  isEdit: Boolean = false
  imageUrl: String = ''
  isShow: Boolean = false
  list: Array<any> = []
  dialogCheckList: Array<any> = []
  dialogType: Number = 1
  handleAvatarSuccess(res, file) {
    this.form.articleVO.articleCoverImagePath = res.data.path
    this.imageUrl = res.data.pathAll
    this.loading = false
  }
  uploadSuccess(res){
    const path = res.data?.materialVo?.pathAll || res.data?.pathAll || res.pathAll
    if (!path) {
      return
    }
    let key = 'img'
    if (res.stffix == 'mp4') {
      key = 'video'
    }
    if (res.stffix == 'mp3') {
      key = 'audio'
    }
    // console.log(eky)
      let quill = this.editor
      let length = quill.getSelection()?.index || 0;  // 获取光标所在位置
      let BlockEmbed = Quill.import('blots/block/embed');
      class AudioBlot extends BlockEmbed {
          static create(value) {
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
      quill.insertEmbed(length, key,  {url: path}, "api");
      quill.setSelection(length + 1);  //光标位置向后移动一位

    allObj.dialogTableVisible = false
  }
  sumbit(formName){
    this.$refs[formName].validate((valid) => {
      if (valid) {
        delete this.form.createDatetime
        delete this.form.updateDatetime
        if (this.form.articleVO?.createDatetime) {
          delete this.form.articleVO.createDatetime
        }
        if (this.form.articleVO?.updateDatetime) {
          delete this.form.articleVO.updateDatetime
        }
        if (this.form.leaderVO?.createDatetime) {
          delete this.form.leaderVO.createDatetime
        }
        if (this.form.leaderVO?.updateDatetime) {
          delete this.form.leaderVO.updateDatetime
        }
        if (this.form.articleVO.articleCoverImagePath) {
          this.form.articleVO.articleCoverImagePath=this.form.articleVO.articleCoverImagePath.replace(imgUrl,"");
        }
        const type = this.form.areaVoiceMeunType || this.form.organizationPowerType  || this.form.leaderCareType || this.$route.query.type
        this.$emit("sumbit", this.form, type, this.$route.query.routerName)
      } else {
        return false;
      }
    });

  }
  before(){
    this.loading = true
    return true
  }
  error(){
    this.loading = false
  }
  dialogConfirm(){

    this.dialogCheckList.forEach(el => {
      this.uploadSuccess(el)
    })
    this.dialogCheckList = []
    this.isShow = false
  }
  material(index){
    this.dialogType = index
    this.isShow=true
    this.getMaterialList()
  }
  total = 1
  getMaterialList(page=1){
    $http.materialList({
      type: this.dialogType,
      page_index: page,
      page_size: 12,
    })
    .then(res => {
      this.list = res.data.data
      this.total = res.data.totalElements
    })
  }
  changefile(e){
      const con = document.getElementById('check')
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
          if (!(con.files[0].type.match(RegExp(/mpeg/)) || con.files[0].type.match(RegExp(/mp3/)) )) {
              Message('音频格式只允许mp3')
              return
          }
      }
      if (con.files[0]) {
          let file = con.files;
          let param = new FormData(); //创建form对象
          param.append("files", file[0]); //通过append向form对象添加数据
          $http.fileUpload(param).then((res) => {
              this.uploadSuccess1(res.data)
          });

      }
  }
  uploadSuccess1(res){
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
  pageChange(page){
    this.getMaterialList(page)
  }
  mounted() {
    this.editorOption.initVoiceButton();
    this.form = { ...this.$store.state.editorContent };
    console.log('form:', this.form)
    console.log('store:', this.$store.state.editorContent)
    if (this.$route.query.item) {
      this.form = JSON.parse(this.$route.query.item)
      this.imageUrl = this.form.articleVO?.articleCoverImagePath
      this.isEdit = true
    }
  }
}
</script>
<style scoped lang="scss">
  .LeaderCare_edit{
    padding: 39px 13px;
    .mb_25{
      margin-bottom: 25px;
    }
    .header{
       ::v-deep .el-input__inner{
        font-weight: bold;
        font-size: 20px;
        text-align: center;
      }
    }
    .title{
      ::v-deep .el-input__inner{
        text-align: center;
      }
    }
    .width_400{
      width: 400px;
    }
  }
  ::v-deep .img_size{
    font-weight: 16px;
  }
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  ::v-deep .ql-editor{
      height:400px;
  }
  .center{
    text-align: center
  }
  .dialog_list{
    margin: 0px 10px 10px 0px;
  }
  .dialog_video{
    width: 176px;height:100px;display:block;
  }
  .dialog_video_name{
    width: 176px;
  }
</style>
