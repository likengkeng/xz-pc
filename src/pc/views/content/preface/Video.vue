<template>
  <div class="preface_video flex column">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="视频" name="1"></el-tab-pane>
          <el-tab-pane label="图片" name="2"></el-tab-pane>
        </el-tabs>
      </div>
      <div class='mt_15'>
        <el-checkbox-group v-model="checkList" class='flex wrap'>
          <template v-if='activeName=="1"'>
          <div class='addbtn flex size_16 img_list bg_color_fff border_radius ovh add_btn border al_center jc_center cursor_pointer'  @click='isShow = true'>
                <div class=' text_center'>
                  <i class="el-icon-plus"></i>
                  <div class='add_btn'>新增内容</div>
                </div>
              </div>
            <div v-for='(item, index) in videoList' :key='index' @mouseover.stop="mouseOver(item, index, 'videoList')" @mouseleave.stop="mouseLeave(item, index, 'videoList')">
              <!--<el-checkbox :label="item" class='pr'>-->
                <div class='img_list pr'>
                  <video :src="(item.materialVO||{}).pathAll" class='video'>
                    您的浏览器不支持 video 标签。
                  </video>
                  <!--<div class='flex column jc_sa'>
                    <p class='line_clamp1 width_176'>{{item.name}}</p>
                    <p>{{item.createDatetime}}</p>
                  </div>-->
                  <div class='edit_modal' v-if='item.checked'>
                    <div class='del_icon cursor_pointer' @click='suspend(item,"video")'><i class="el-icon-video-play size_14"></i></div>
                    <div class='del_icon cursor_pointer' @click='del(item, "videoList")'><i class="el-icon-delete-solid size_18"></i></div>
                  </div>
                </div>

                
              <!--</el-checkbox>-->
            </div>
          </template>
          <template v-if='activeName=="2"'>
            <div class='addbtn flex size_16 img_list bg_color_fff border_radius ovh add_btn border al_center jc_center cursor_pointer'  @click='isShow = true'>
                <div class=' text_center'>
                  <i class="el-icon-plus"></i>
                  <div class='add_btn'>新增内容</div>
                </div>
              </div>
            <div v-for='(item, index) in imgList' :key='index' @mouseover.stop="mouseOver(item, index, 'imgList')" @mouseleave.stop="mouseLeave(item, index, 'imgList')">
              <!--<el-checkbox :label="item" class='pr'>-->
                <div class='img_list pr'>
                  <img :src="(item.materialVO||{}).pathAll" alt="" class='img'>
                  <div class='line_clamp1 width_176'>
                    {{item.name}}
                  </div>
                  <div class='edit_modal' v-if='item.checked'>
                    <div class='cursor_pointer see' @click='suspend(item,"img")'>查看</div>
                    <div class='del_icon cursor_pointer' @click='del(item, "imgList")'><i class="el-icon-delete-solid size_18"></i></div>
                  </div>
                </div>
                
              <!--</el-checkbox>-->
            </div>
          </template>
        </el-checkbox-group>
        <!--<div class='mt_15'><el-button type="primary" @click='isShow = true'>{{activeName == 1 ? '选择视频': '选择图片'}}</el-button></div>-->
      </div>
      <!--<div class='flex jc_center'>
          <el-button type="primary" @click='sumbit'>确定</el-button>
          <el-button @click='cancel'>取消</el-button>
      </div>-->
    <el-dialog title="选择素材" :visible.sync="isShow" width='70vw'>
      <div>
        <el-checkbox-group v-model="dialogCheckList" class='flex wrap'>
          <div v-for='(item, index) in materialList' :key='index' class='dialog_list'>
            <el-checkbox :label="item" class='pr'>
              <video :src="item.pathAll" class='dialog_video' v-if='activeName == 1'>
                您的浏览器不支持 video 标签。
              </video>
              <img :src="item.pathAll" class='dialog_video' v-if='activeName == 2' />
              <div class='line_clamp1 width_176'>{{item.name}}</div>
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
        <el-button type="primary" @click="sumbit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="" :visible.sync="imgModal">
      <img v-if='type=="img"' :src="showSrc" alt="" class='modal_src'>
      <!-- <audio v-if='activeName=="audio"' :src="imgModalSrc" alt="" class='modal_src'> -->
      <video v-if='type=="video"' ref='video' controls :src="showSrc" alt="" class='modal_src'></video>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import img from '@/images/news1.jpg';

import $http from '@/pc/api/event';
// import { eventList } from '../mock';

@Component({
})
export default class Video extends Vue {
  activeName: String = '1'
  imgList: Array<any> = []
  img: String = img
  videoList: Array<any> = []
  checkList: Array<Number> = []
  dialogCheckList: Array<Number> = []
  isShow: Boolean = false
  materialList: Array<any> = []
  type = ''
  handleClick(){
    let key = 'videoList'
      if (this.activeName != '1') {
        key = 'imgList'
      }
    this.getList(key)
    this.getMaterialList()
  }
  getList(key){
    $http.prefaceList({
      prefaceType: this.activeName
    })
    .then(res => {
      console.log(res.data, key)
      res.data.map(el => {
        el.createDatetime = this.format(el.createDatetime)
        el.check = false
        return el
      })
      this[key] = res.data
    })
  }
  mouseOver(item, index, key){
    item.checked = true
    this[key].splice(index, 1, item)
  }
  mouseLeave(item, index, key){
    item.checked = false
    this[key].splice(index, 1, item)
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
  total = 1
  getMaterialList(page = 1){
    $http.materialList({
      type: this.activeName==1?1:3,
      page_index: page,
      page_size: 12,
    })
    .then(res => {
      this.materialList = res.data.data
      this.total = res.data.totalElements
    })
  }
  cancel(){
    if (this.activeName=='1') {
      this.videoList = []
    } else {
      this.imgList = []
    }
    this.checkList = []
  }
  del(item, key){
    this.$confirm('此操作将永久删除该该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.prefaceDelete({prefaceId: item.prefaceId})
      .then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList(key)
      })
    }).catch(() => {       
    });
  }
  showSrc = ''
  imgModal = false
  suspend(item, key){
    this.type = key
    this.showSrc = item.materialVO.pathAll
    this.imgModal = true
  }
  sumbit(){
    let materialIds: Array<string> = []
    this.dialogCheckList.forEach(el => {
      materialIds.push(el.materialId)
    })
    this.dialogCheckList = []
    $http.prefaceAdd({
      prefaceType: this.activeName,
      materialIds
    })
    .then(res => {
      this.isShow = false
      let key = 'videoList'
      if (this.activeName != '1') {
        key = 'imgList'
      }
      this.getList(key)
    })
  }
  pageChange(page){
    console.log(page)
    this.getMaterialList(page)
  }
  mounted() {
    this.getList('videoList')
    this.getMaterialList()
  }
}
</script>
<style scoped lang="scss">
  .preface_video{
    padding: 21px 25px;
    .mb_17{
      margin-bottom: 17px;
    }
    .mt_15{
      margin-top: 15px;
    }
    .video{
      width: 176px;
      height: 100px;
      // margin-right: 15px;
    }
    .addbtn{
      width: 176px;
      height: 100px;
      margin-right: 15px;
    }
    .img{
      width: 176px;
      height: 100px;
      margin-bottom: 10px;
    }
    .img_list{
      margin-right: 15px;
      margin-bottom: 20px;
    }
    .list{
      border: 1px solid #1890FF;
      padding-right: 100px;
      margin-right: 60px;
      margin-bottom: 20px;
    }
    ::v-deep .el-checkbox__label{
      padding-left: 0px!important;
    }
    ::v-deep .el-checkbox__input{
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .dialog_video{
      width: 176px;
      height: 100px;
      margin-bottom: 10px;
    }
    .dialog_list{
      margin: 20px;
    }
    .width_176{
      max-width: 176px;
    }
  }
  .edit_modal{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: rgba(0,0,0,.5);
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    .del_icon{
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      background-color: #fff;
      margin: 15px 15px 0px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .modal_src{
    width: 100%;
    height: 100%
  }
  .cup{
    cursor: pointer
  }
  ::v-deep .el-dialog{
    max-height: 85vh;
    overflow: hidden;
  }
  ::v-deep .el-dialog__body{
    height: calc(80vh - 200px);
    overflow-y: auto
  }
   .see{
          width: 95px;
          height: 30px;
          line-height: 30px;
          border-radius: 30px;
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
              background: #fff;
    text-align: center;
    font-size: 14px;

        }
</style>
