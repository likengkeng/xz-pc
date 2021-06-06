<template>
  <div class="leader-care">
    <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
      <el-tab-pane label="图片" name="img"></el-tab-pane>
      <el-tab-pane label="音频" name="audio"></el-tab-pane>
      <el-tab-pane label="视频" name="video"></el-tab-pane>
    </el-tabs>
    <div class='list_box'>
      <div class='total_header size_16'>
        图片（共{{total}}张）
      </div>
      <div class='flex wrap'>
        <div v-for='(item, index) in list' :key='index' class='list bg_color_fff border_radius ovh pr'>
          <div class='pr' @mouseover.stop="mouseOver(item, index)" @mouseleave.stop="mouseLeave(item, index)" v-if="activeName=='img'">
            <img :src='img' class='img' />
            <div class='edit_modal' v-if='item.checked'>
              <div class='del_icon cursor_pointer' @click='del(item)'><i class="el-icon-delete-solid"></i></div>
              <div class='see bg_color_fff text_center cursor_pointer' @click='see(item)'>查看</div>
            </div>
          </div>
          <div v-if="activeName=='audio'">
            <audio :src="mp3" controls class='audio'>
                您的浏览器不支持 audio 标签。
              </audio>
              <div class='flex mt_12'>
              <div class='flex_g1 size_16 line_clamp1'>您的浏览器不支持 audio 标签。</div>
              <div class='flex_s0 cursor_pointer' @click='del(item)'><i class="el-icon-delete-solid"></i></div>
            </div>
          </div>
          <div class='pr' @mouseover.stop="mouseOver(item, index)" @mouseleave.stop="mouseLeave(item, index)" v-if="activeName=='video'">
            <video :src="video" class='video' :ref='`video${index}`'>
              您的浏览器不支持 video 标签。
            </video>
            <div class='edit_modal' v-if='item.checked'>
              <div v-if='item.isPlay' class='del_icon cursor_pointer' @click='suspend(item,index)'><i class="el-icon-video-pause size_14"></i></div>
              <div v-else class='del_icon cursor_pointer' @click='play(item,index)'><i class="el-icon-video-play size_14"></i></div>
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
        :current-page="1"
        :page-sizes="[12, 24, 36, 400]"
        :page-size="imgPage.pageSize"
        layout="total, prev, pager, next ,sizes, jumper"
        :total="imgPage.total">
      </el-pagination>
    </div>

    <el-dialog title="" :visible.sync="imgModal">
      <img :src="imgModalSrc" alt="" class='modal_src'>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import img from '@/images/news1.jpg';
import mp3 from '@/images/audio.mp3';
import video from '@/images/video.mp4';
interface Object {
  total: Number;
  pageSize: Number;
  currentPage: Number;
}
@Component({
})
export default class LeaderCare extends Vue {
  activeName: string = 'img'
  imgList: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  audioList: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  videoList: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  list: Array<any> = this.imgList
  img: String = img
  mp3: String = mp3
  video: String = video
  imgPage: Object = {
    total: 100,
    pageSize: 12,
    currentPage: 1,
  }
  audioPage: Object = {
    total: 100,
    pageSize: 12,
    currentPage: 1,
  }
  videoPage: Object = {
    total: 100,
    pageSize: 12,
    currentPage: 1,
  }
  // page: Object = this.imgPage
  total: Number = 100
  pageSize: Number = 12
  currentPage: Number = 1
  imgModal: Boolean = false // 查看图片模态框
  imgModalSrc: String = '' // 查看的图片地址
  handleClick(){
    this.list = this[`${this.activeName}List`]
    this.pageSize = this[`${this.activeName}Page`].pageSize
    this.currentPage = this[`${this.activeName}Page`].currentPage
  }
  getList(){
    // 获取列表
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
    // 删除
    this.getList()
  }
  see(item){
    this.imgModalSrc = this.img
    this.imgModal = true
  }
  handleSizeChange(val){
    this.$set(this[`${this.activeName}Page`], 'pageSize', val)
    this.pageSize = val
    this.getList()
  }
  handleCurrentChange(val){
    this.$set(this[`${this.activeName}Page`], 'currentPage', val)
    this.currentPage = val
    this.getList()
  }
  play(item, index){
    this.$refs[`video${index}`][0].play()
    item.isPlay = true
    this.list.splice(index, 1, item)
  }
  suspend(item, index){
    this.$refs[`video${index}`][0].pause()
    item.isPlay = false
    this.list.splice(index, 1, item)
  }
  mounted() {
    
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
        height: 99px;
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
