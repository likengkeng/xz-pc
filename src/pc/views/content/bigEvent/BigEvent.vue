<template>
  <div class="big-event pr">
    <div class='list pr'>
      <div class='add border border_radius flex al_center jc_center cursor_pointer' @click='add'>
        <div class='text_center'>
          <div><i class="el-icon-plus"></i></div>
          <div>新增</div>
        </div>
      </div>
    </div>
      <div v-for='(item, index) in list' :key='index' class='list pr flex'>
        <div class='time'>
          <div class='size_28 bold'>2022年</div>
          <div class='size_18'>12月12日</div>
        </div>
        <div class='content'>
          <div @mouseover.stop="mouseOver(item, index)" @mouseleave.stop="mouseLeave(item, index)" class='flex pr'>
            <img :src="img" alt="" class='img' >
            <div class='edit_modal' v-if='item.checked'>
              <div class='del_icon cursor_pointer' @click='del(item)'><i class="el-icon-delete-solid"></i></div>
              <div class='edit__icon bg_color_fff text_center cursor_pointer' @click='edit(item)'><i class='el-icon-edit'></i></div>
            </div>
          </div>
          <div class='size_20 bold list_header'>大标题文案</div>
          <div class='text_content line_clamp2'>
            位身中确单生期具革活口成干委较状府压织流题市长支提联会史运多级织增日受群商四在干听马列线
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import img from '@/images/news1.jpg';

// import $http from '@/pc/api/event';
// import { eventList } from '../mock';

@Component({
})
export default class BigEvent extends Vue {
  bigEventList: Array<{[key: string]: any}> = [];
  list: Array<any> = [{}, {}, {}, {}, {}]
  img: String = img
  add(){
    this.$router.push({name: 'bigEventEdit'})
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
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
  }
  edit(item){
    this.$router.push({name: 'bigEventEdit'})
  }
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
  .big-event{
    padding: 29px 0px 0px 90px;
    &::before{
      content: '';
      display: block;
      position: absolute;
      top: 0px;
      height: 30px;
      width: 6px;
      background: #1890FF;
      left: 62.5px;
    }
    .add{
      width: 266px;
      height: 148px;
      box-sizing: border-box;
    }
    & .list:first-child{
       &::before{
         top: 0px;
       }
       &::after{
         height: calc(100% - 10px);
         top: 20px
       }
    }
    .list{
      padding-bottom: 45px;
      &::before{
        content: '';
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        top: 10px;
        left: -35px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 3px solid #1890FF;
      }
      &::after{
        content: '';
        width: 6px;
        background-color: #1890FF;
        height: calc(100% - 19px);
        position: absolute;
        top: 30px;
        left: -28.5px;
      }
      .list_header{
        margin: 28px 0px 11px;
      }
      .text_content{
        width: 336px;
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
        .del_icon, .edit__icon{
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          background-color: #fff;
          margin: 9px 23px 0px 0px;
        }
      }
    }
    .time{
      margin-right: 32px;
    }
    .img{
      width: 336px;
      height: 213px;
    }
  }
</style>
