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
        <div class='img'><img :src="(item.articleVO||{}).articleCoverImagePath" alt=""></div>
        <div class='list_content'>
          <div>
            <div class='title size_16 bold mb_7 line_clamp1'>{{(item.articleVO||{}).articleTitle}}</div>
            <div class='line_clamp4 articleContent'>
              {{ delHtmlTag((item.articleVO||{}).articleContent) }}
            </div>
          </div>
          <div class='color_666 updata_time'>更新于{{(item.articleVO||{}).createDatetime}}</div>
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
    },
    name: {
      type: String
    },
    type: {
      type: String
    },
    routerName: {
      type: String
    }
  }
})
export default class MyList extends Vue {

  delHtmlTag(str) {
    return str?.replace(/<[^>]+>/g,"")
  }

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
    this.$router.push({name: this.name, query: {item: JSON.stringify(item)}, type: this.type, routerName: this.routerName})
  }
  add(){
    this.$router.push({name: this.name, query: {type: this.type, routerName: this.routerName}})
  }
  mounted() {

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
      width: 266px;
      margin: 0px 10px 28px;
      min-height: 200px;
      box-sizing: border-box;
      .img{
        width: 266px;
        height: 118px;
        display: block;
        margin-bottom: 7px;
        background-color: #ccc;
        img{
          width: 266px;
          height: 100%;
          display: block;
        }
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

<style lang='scss'>
  .articleContent{
        img{
          display: none;
        }
        video{
          display: none;
        }
        audio{
          display: none;
        }
      }
</style>
