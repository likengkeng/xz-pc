<template>
  <div class="preface_video flex column">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="视频" name="1"></el-tab-pane>
          <el-tab-pane label="图片" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <div class='mt_15'>
        <el-checkbox-group v-model="checkList" class='flex wrap'>
          <template v-if='activeName=="1"'>
            <div v-for='(item, index) in videoList' :key='index' class=''>
              <el-checkbox :label="item" class='pr'>
                <div class='flex list'>
                  <video :src="item.path" class='video'>
                    您的浏览器不支持 video 标签。
                  </video>
                  <div class='flex column jc_sa'>
                    <p class='line_clamp1 width_176'>{{item.name}}</p>
                    <p>{{item.createDatetime}}</p>
                  </div>
                </div>
              </el-checkbox>
            </div>
          </template>
          <template v-if='activeName=="3"'>
            <div v-for='(item, index) in imgList' :key='index' class=''>
              <el-checkbox :label="item" class='pr'>
                <div class='img_list'>
                  <img :src="item.pathAll" alt="" class='img'>
                  <div class='line_clamp1 width_176'>
                    {{item.name}}
                  </div>
                </div>
              </el-checkbox>
            </div>
          </template>
        </el-checkbox-group>
        <div class='mt_15'><el-button type="primary" @click='isShow = true'>{{activeName == 1 ? '选择视频': '选择图片'}}</el-button></div>
      </div>
      <div class='flex jc_center'>
          <el-button type="primary" @click='sumbit'>确定</el-button>
          <el-button @click='cancel'>取消</el-button>
      </div>
    <el-dialog title="选择视频" :visible.sync="isShow" width='70vw'>
      <div>
        <el-checkbox-group v-model="dialogCheckList" class='flex wrap'>
          <div v-for='(item, index) in materialList' :key='index' class='dialog_list'>
            <el-checkbox :label="item" class='pr'>
              <video :src="item.pathAll" class='dialog_video'>
                您的浏览器不支持 video 标签。
              </video>
              <div class='line_clamp1 width_176'>{{item.name}}</div>
            </el-checkbox>
            
          </div>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
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
  handleClick(){
    let key = 'videoList'
      if (this.activeName != '1') {
        key = 'imgList'
      }
    this.getList(key)
    this.getMaterialList()
  }
  dialogConfirm(){
    if(this.activeName == '1') {
      this.videoList = this.dialogCheckList
    } else {
      this.imgList = this.dialogCheckList
    }
    this.checkList = this.dialogCheckList
    this.isShow = false
  }
  getList(key){
    $http.prefaceList({
      prefaceType: this.activeName
    })
    .then(res => {
      console.log(res.data, key)
      res.data.map(el => {
        el.createDatetime = this.format(el.createDatetime)
        return el
      })
      this[key] = res.data
    })
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
  getMaterialList(){
    $http.materialListType({
      type: this.activeName
    })
    .then(res => {
      this.materialList = res.data
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
  sumbit(){
    let materialIds: Array<string> = []
    this.checkList.forEach(el => {
      materialIds.push(el.materialId)
    })
    $http.prefaceAdd({
      prefaceType: this.activeName,
      materialIds
    })
    .then(res => {
      this.cancel()
      let key = 'videoList'
      if (this.activeName != '1') {
        key = 'imgList'
      }
      this.getList(key)
    })
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
      width: 160px;
      height: 96px;
      margin-right: 15px;
    }
    .img{
      width: 176px;
      height: 100px;
      margin-bottom: 10px;
    }
    .img_list{
      margin-right: 12px;
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
  
</style>
