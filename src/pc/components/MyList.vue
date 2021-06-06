<template>
  <div class="leader-care">
    <div class='flex list_box wrap'>
      <div class='flex size_16 list bg_color_fff border_radius ovh add_btn border al_center jc_center cursor_pointer' @click='add'>
        <div class='text_center'>
          <i class="el-icon-plus"></i>
          <div class='add_btn'>新增内容</div>
        </div>
      </div>
      <div v-for='(item, index) in list' :key='index' class='list bg_color_fff border_radius ovh border pr' @mouseover.stop="mouseOver(item, index)" @mouseleave.stop="mouseLeave(item, index)">
        <div class='img'></div>
        <div class='list_content'>
          <div>
            <div class='title size_16 bold mb_7'>大标题</div>
            <div class='line_clamp4'>藏与祖国同呼吸、共命运，西藏的发展历程也与祖国的发展历程紧密相连新中国成立以来，在中国共产党的领导下，西藏地区历经和平藏与祖国同呼吸、共命运，西藏的发展历程也与祖国的发展历程紧密相连新中国成立以来，在中国共产党的领导下，西藏地区历经和平</div>
          </div>
          <div class='color_666 updata_time'>更新于2021.06.09</div>
        </div>
        <div class='edit_modal' v-if='item.checked'>
          <div class='del_icon cursor_pointer' @click='del(item)'><i class="el-icon-delete-solid"></i></div>
          <div class='edit_icon cursor_pointer' @click='edit(item)'><i class="el-icon-edit"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    list: {
    type: Array
    }
  }
})
export default class MyList extends Vue {

  handleClick(){
  }
  
  mouseOver(item, index){
    item.checked = true
    this.list.splice(index, 1, item)
  }
  mouseLeave(item, index){
    item.checked = false
    this.list.splice(index, 1, item)
  }
  del(item, index){
    this.$emit("del", item, index)
  }
  edit(item){
    this.$emit("edit", item)
  }
  add(){
    this.$emit("add")
  }
  mounted: {
    
  }
}
</script>
<style scoped lang="scss">

  .list_box{
    padding: 23px 0px;
    box-sizing: border-box;
    .add_btn{
      margin-top: 10px;
    }
    .list{
      width: 23%;
      margin: 0px 1% 28px;
      box-sizing: border-box;
      .img{
        width: 100%;
        height: 118px;
        display: block;
        margin-bottom: 7px;
        background-color: #ccc;
      }
      .list_content{
        padding: 0px 15px 22px;
      }
      .mb_7{
        margin-bottom: 7px;
      }
      .updata_time{
        margin-top: 15px;
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
        .del_icon, .edit_icon{
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          background-color: #fff;
          margin: 15px 15px 0px 0px;
        }
      }
    }
  }
  
</style>
