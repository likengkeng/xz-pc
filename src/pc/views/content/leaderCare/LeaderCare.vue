<template>
  <div class="leader-care">
    <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
      <el-tab-pane label="中央领导关怀" name="1"></el-tab-pane>
      <el-tab-pane label="自治区党委书记" name="2"></el-tab-pane>
      <el-tab-pane label="历任组织部部长" name="3"></el-tab-pane>
    </el-tabs>
    <div v-if='activeName == 3'>
      <div class="leader-care">
        <div class='flex list_box wrap'>
          <div class='flex size_16 list bg_color_fff border_radius ovh add_btn border al_center jc_center cursor_pointer' @click='historyadd'>
            <div class='text_center'>
              <i class="el-icon-plus"></i>
              <div class='add_btn'>新增内容</div>
            </div>
          </div>
          <div v-for='(item, index) in list' :key='index' class='list bg_color_fff border_radius ovh border pr' @mouseover.stop="mouseOver(item, index)" @mouseleave.stop="mouseLeave(item, index)">
            <div class='img'><img :src="(item.leaderVO||{}).leaderImagePathAlls[0]" alt=""></div>
            <div class='list_content'>
              <div>
                <div class='title size_16 bold mb_7'>{{(item.leaderVO||{}).leaderName}}</div>
                <div class='line_clamp4 articleContent'>{{(item.leaderVO||{}).leaderComment}}</div>
              </div>
              <div class='color_666 updata_time'>更新于{{item.leaderVO.updateDatetime || item.leaderVO.createDatetime}}</div>
            </div>
            <div class='edit_modal' v-if='item.checked'>
              <div class='del_icon cursor_pointer' @click='historydel(item)'><i class="el-icon-delete-solid"></i></div>
              <div class='edit_icon cursor_pointer' @click='historyedit(item)'><i class="el-icon-edit"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
          <my-list :list='list' :name='name' :type='activeName' @del='del'></my-list>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyList from '@/pc/components/MyList.vue'
import $http from '@/pc/api/event';

@Component({
    components:{MyList}

})
export default class LeaderCare extends Vue {
  activeName: string = '1'
  list: Array<any> = []
  name: String = 'leaderCareEdit'
  handleClick(){
    if (this.activeName == '1') {
      this.name = 'leaderCareEdit'
    }
    if (this.activeName == '2') {
      this.name = 'leaderCareEdit'
    }
    if (this.activeName == '3') {
      this.name = 'AddMinister'
    }
    this.getList()
  }
  getList(){
    // 获取列表
    $http.leaderCareList({leaderCareType: this.activeName})
    .then(res => {
      console.log(res)
      res.data.map(el => {
        if (el.leaderVO?.updateDatetime) {
          el.leaderVO.updateDatetime = this.format(el.leaderVO.updateDatetime)
        }
        if (el.leaderVO?.createDatetime) {
          el.leaderVO.createDatetime = this.format(el.leaderVO.createDatetime)
        }
        if (el.articleVO?.createDatetime) {
          el.articleVO.createDatetime = this.format(el.articleVO.createDatetime)
        }
        if (el.articleVO?.updateDatetime) {
          el.articleVO.updateDatetime = this.format(el.articleVO.updateDatetime)
        }

        return el
      })
      if (this.activeName == '3') {
        this.list = res.data
      } else {
      this.list = res.data

      }
    })
  }
  format(shijianchuo){
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    return `${y}-${m}-${d}`
  }
  del(item, index){
    this.$confirm('此操作将永久删除该该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.leaderCareDelete({leaderCareId: item.leaderCareId})
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
  edit(item){
    let name = 'leaderCareEdit'
    if (this.activeName == '3') name =  'AddMinister'
    // 去编辑
    this.$router.push({name})
  }
  add(){
    let name = 'leaderCareEdit'
    if (this.activeName == 3) name =  'AddMinister'
    this.$router.push({name})
  }
  mouseOver(item, index){
    item.checked = true
    this.list.splice(index, 1, item)
  }
  mouseLeave(item, index){
    item.checked = false
    this.list.splice(index, 1, item)
  }
  historydel(item){
    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.leaderCareDelete({leaderCareId: item.leaderCareId})
      .then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList()
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
  }
  historyedit(item){
    this.$router.push({name: this.name, query: {item: JSON.stringify(item)}, type: this.type, routerName: this.routerName})
    // this.$emit("edit", item)
  }
  historyadd(){
    this.$router.push({name: this.name, query: {type: this.type, routerName: this.routerName}})
  }
  mounted() {
    if(this.$route.query.type)  this.activeName = this.$route.query.type.toString()
    this.getList() 
   
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
      min-height: 200px;
      box-sizing: border-box;
      .img{
        width: 100%;
        height: 118px;
        display: block;
        margin-bottom: 7px;
        background-color: #ccc;
        img{
          width: 100%;
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
