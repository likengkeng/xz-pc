<template>
  <div class="leader-care">
    <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
      <el-tab-pane label="中央领导关怀" name="1"></el-tab-pane>
      <el-tab-pane label="自治区党委书记" name="2"></el-tab-pane>
      <el-tab-pane label="历任组织部部长" name="3"></el-tab-pane>
    </el-tabs>
    <my-list :list='list' :name='name' :type='activeName' @del='del'></my-list>

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
  list: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  name: String = 'leaderCareEdit'
  handleClick(){
    if (this.activeName == '1') {
      this.name = 'leaderCareEdit'
    }
    if (this.activeName == '1') {
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
      this.list = res.data
    })
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
    if (this.activeName == 3) name =  'AddMinister'
    // 去编辑
    this.$router.push({name})
  }
  add(){
    let name = 'leaderCareEdit'
    if (this.activeName == 3) name =  'AddMinister'
    this.$router.push({name})
  }
  mounted() {
    if(this.$route.query.type)  this.activeName = this.$route.query.type.toString()
    this.getList() 
   
  }
}
</script>
<style scoped lang="scss">

  
</style>
