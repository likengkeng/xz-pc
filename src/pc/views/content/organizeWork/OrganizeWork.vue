<template>
  <div class="leader-care">
    <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
      <el-tab-pane label="党的政治建设" name="1"></el-tab-pane>
      <el-tab-pane label="干部工作" name="2"></el-tab-pane>
      <el-tab-pane label="党的组织建设" name="3"></el-tab-pane>
      <el-tab-pane label="人才工作" name="4"></el-tab-pane>

      <el-tab-pane label="干部人才援藏工作" name="5"></el-tab-pane>

      <el-tab-pane label="自身建设" name="6"></el-tab-pane>

    </el-tabs>
    <my-list :list='list' name='OrganizeWorkEdit' :type='activeName' @del='del'></my-list>

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
export default class OrganizeWork extends Vue {
  activeName: string = '1'
  list: Array<any> = []
  handleClick(){
    this.getList()
  }
  getList(){
    // 获取列表
    $http.powerList(
      {organizationPowerType: this.activeName, organizationPowerMeunType: 1}
    )
    .then(res => {
      res.data.map(el => {
        if (el.articleVO?.createDatetime) {
          el.articleVO.createDatetime = this.format(el.articleVO.createDatetime)
        }
        // 
        return el
      })
      this.list = res.data
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
  del(item){
    this.$confirm('此操作将永久删除该该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.powerDelete({prefaceId: item.organizationPowerId})
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

  mounted() {
    if(this.$route.query.type)  this.activeName = this.$route.query.type.toString()
    this.getList()
  }
}
</script>
<style scoped lang="scss">

  
</style>
