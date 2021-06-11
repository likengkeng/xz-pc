<template>
  <div class="leader-care">
    <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
      <el-tab-pane label="图片" name="img"></el-tab-pane>
      <el-tab-pane label="音频" name="audio"></el-tab-pane>
      <el-tab-pane label="视频" name="video"></el-tab-pane>
    </el-tabs>
    <div class='list_box'>
      <div class='total_header size_16'>
        （共{{total}}张）
      </div>
      <div class='flex wrap'>
        <div class='flex size_16 list bg_color_fff border_radius ovh add_btn border al_center jc_center cursor_pointer' @click='add'>
          <div class='text_center'>
            <i class="el-icon-plus"></i>
            <div class=''>新增内容</div>
          </div>
        </div>
        <div v-for='(item, index) in list' :key='index' class='list bg_color_fff border_radius ovh pr'>
          <div class='pr' @mouseover.stop="mouseOver(item, index)" @mouseleave.stop="mouseLeave(item, index)" v-if="activeName=='img'">
            <img :src='item.pathAll' class='img' />
            <div class='edit_modal' v-if='item.checked'>
              <div class='del_icon cursor_pointer' @click='del(item)'><i class="el-icon-delete-solid"></i></div>
              <div class='see bg_color_fff text_center cursor_pointer' @click='see(item)'>查看</div>
            </div>
          </div>
          <div v-if="activeName=='audio'">
            <audio :src="item.pathAll" controls class='audio'>
                您的浏览器不支持 audio 标签。
              </audio>
              <div class='flex mt_12'>
              <div class='flex_g1 size_16 line_clamp1'>{{item.name}}</div>
              <div class='flex_s0 cursor_pointer' @click='del(item)'><i class="el-icon-delete-solid"></i></div>
            </div>
          </div>
          <div class='pr' @mouseover.stop="mouseOver(item, index)" @mouseleave.stop="mouseLeave(item, index)" v-if="activeName=='video'">
            <video :src="item.pathAll" class='video' :ref='`video${index}`'>
              您的浏览器不支持 video 标签。
            </video>
            <div class='edit_modal' v-if='item.checked'>
              <div class='del_icon cursor_pointer' @click='suspend(item,index)'><i class="el-icon-video-play size_14"></i></div>
              <!-- <div v-else class='del_icon cursor_pointer' @click='play(item,index)'><i class="el-icon-video-play size_14"></i></div> -->
              <div class='del_icon cursor_pointer' @click='del(item)'><i class="el-icon-delete-solid size_14"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='pages'>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[12, 24, 36]"
        :page-size="pageSize"
        layout="total, prev, pager, next ,sizes, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="" :visible.sync="imgModal">
      <img v-if='activeName=="img"' :src="imgModalSrc" alt="" class='modal_src'>
      <!-- <audio v-if='activeName=="audio"' :src="imgModalSrc" alt="" class='modal_src'> -->
      <video v-if='activeName=="video"' controls :src="videoSrc" alt="" class='modal_src'></video>
    </el-dialog>
    <el-dialog title="上传素材" :visible.sync="isShow" width='70vw'>
      <MyUpload @uploadSuccess='uploadSuccess'></MyUpload>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import $http from '@/pc/api/event';
import MyUpload from '@/pc/components/MyUpload.vue'

import img from '@/images/news1.jpg';
import mp3 from '@/images/audio.mp3';
import video from '@/images/video.mp4';
interface Object {
  total: Number;
  pageSize: Number;
  currentPage: Number;
}
@Component({
    components:{ MyUpload}

})
export default class LeaderCare extends Vue {
  activeName: string = 'img'
  imgList: Array<any> = []
  audioList: Array<any> = []
  videoList: Array<any> = []
  list: Array<any> = this.imgList
  img: String = img
  mp3: String = mp3
  video: String = video
  total: Number = 0
  pageSize: Number = 12
  currentPage: Number = 1
  imgModal: Boolean = false // 查看图片模态框
  imgModalSrc: String = '' // 查看的图片地址
  videoSrc: String = ''
  isShow:Boolean = false
  handleClick(){
    this.currentPage = 1
    this.total = 0
    this.getList()
    // this.list = this[`${this.activeName}List`]
    // this.pageSize = this[`${this.activeName}Page`].pageSize
    // this.currentPage = this[`${this.activeName}Page`].currentPage
  }
  uploadSuccess(){
    this.getList()
    this.isShow = false
  }
  getList(){
    let type = 1
    if (this.activeName == 'img') {
      type = 3
    }
    if (this.activeName == 'audio') {
      type = 2
    }
    // 获取列表
    console.log(type)
    $http.materialList({
      page_size: this.pageSize,
      page_index: this.currentPage,
      type
    })
    .then(res => {
      console.log(res)
      this.list = res.data.data
      this.total = res.data.totalElements
      
      // this.$set(this[`${this.activeName}Page`], 'total', res.totalElements)

    })
  }
  mouseOver(item, index){
    item.checked = true
    this.list.splice(index, 1, item)
  }
  mouseLeave(item, index){
    item.checked = false
    this.list.splice(index, 1, item)
  }
  del(item){
    this.$confirm('此操作将永久删除该该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.materialDel({material_id: item.materialId})
      .then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList()
      })
    }).catch(() => {       
    });
  }
  see(item){
    this.imgModalSrc = item.pathAll
    this.imgModal = true
  }
  handleSizeChange(val){
    // this.$set(this[`${this.activeName}Page`], 'pageSize', val)
    this.pageSize = val
    this.getList()
  }
  handleCurrentChange(val){
    // this.$set(this[`${this.activeName}Page`], 'currentPage', val)
    this.currentPage = val
    this.getList()
  }
  suspend(item, index){
    this.videoSrc=item.pathAll
    this.imgModal = true
  }
  add(){this.isShow = true}
  mounted() {
    this.getList()
  }
}
</script>
<style scoped lang="scss">

  .list_box{
    padding: 23px 0.5%;
    box-sizing: border-box;
    .total_header{
      margin-bottom: 22px;
      padding-left: 29px;
    }
    .add_btn{
      height: 130px;
    }
    .list{
      width: 14.6666665%;
      margin: 0px 1% 28px;
      box-sizing: border-box;
      
      .img{
        width: 100%;
        height: 130px;
        display: block;
      }
      .video{
        width: 100%;
        height: 130px;
        background: rgba(0,0,0,.2);
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
          margin: 9px 23px 0px 0px;
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
        }
      }
    }
  }
  .pages{
    padding: 0px 19px;
    margin: 34px 0px;
    text-align: right;
  }
  .modal_src{
    max-width: 80vw;
    max-height: 80vh;
  }
  .mt_12{
    margin-top: 12px;
  }
  .audio{
    width: 100%;
  }
  
</style>
