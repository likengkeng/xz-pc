<template>
  <div class="preface_video flex column">
    <div class='header size_16 bold mb_22 flex_s0'>
      选择视频
    </div>
    <div class='content flex column flex_g1'>
       <el-tabs class='flex_g1' v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="视频" name="first">
            <div class='flex jc_end'>
               <el-button>本地上传</el-button>
            </div>
            <el-checkbox-group v-model="checkList" size='medium'>
              <div class='list_box flex wrap'>
                <div v-for='(item, index) in list' :key='index' class='list bg_color_fff border_radius ovh pr'>
                  <video :src="video" class='video' :ref='`video${index}`'>
                    您的浏览器不支持 video 标签。
                  </video>
                  <el-checkbox :label='index' class='checked'></el-checkbox>
                </div>
              </div>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="视频链接" name="second">
            <div class='flex'>
              <p class='flex_s0 label'>链接</p><el-input class='flex_g1' v-model="input" placeholder="请输入地址"></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class='flex_s0'>
           <div class='color_666 mb_30' v-if='activeName=="first"'>已选择视频{{checkList.length}}/{{list.length}}</div>
          <div class='flex pd_l100'>
            <el-button type="primary">确定</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import video from '@/images/video.mp4';

// import $http from '@/pc/api/event';
// import { eventList } from '../mock';

@Component({
})
export default class Video extends Vue {
  activeName: String = 'first'
  input: String = ''
  list: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  video: String = video
  checkList: Array<String> = []
  handleClick(){}
  mounted() {
    // $http.getBigEventList()
    //   .then((res) => {
    //     // bigEventList = res;
    //   })
    //   .catch(() => {

    //   });
    // this.bigEventList = eventList;
  }
}
</script>
<style scoped lang="scss">
  .preface_video{
    padding: 21px 25px;
    height: 100%;
    box-sizing: border-box;
    .header{
      padding-left: 20px;
    }
    .label{
      width: 100px;
    }
    .mb_30{
      margin-bottom: 30px;
    }
    .pd_l100{
      padding-left: 100px;
    }
    .mb_22{
      margin-bottom: 22px;
    }
    .list_box{
      padding: 23px 0.5%;
      box-sizing: border-box;
      .list{
        width: 14.6666665%;
        margin: 0px 1% 30px;
        box-sizing: border-box;
        .video{
          width: 100%;
          height: 99px;
        }
        .checked{
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
          z-index: 10
        }
        ::v-deep .el-checkbox__label{
          display: none;
        }
      }
    }
  }
  
</style>
