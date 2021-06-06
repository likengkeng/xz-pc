<template>
  <div class="leader-care">
    <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
      <el-tab-pane label="中央领导关怀" name="1"></el-tab-pane>
      <el-tab-pane label="自治区党委书记" name="2"></el-tab-pane>
      <el-tab-pane label="历任组织部部长" name="3"></el-tab-pane>
    </el-tabs>
    <my-list :list='list' @add='add' @edit='edit' @del='del'></my-list>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyList from '@/pc/components/MyList.vue'

@Component({
    components:{MyList}

})
export default class LeaderCare extends Vue {
  activeName: string = '1'
  list: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  handleClick(){
  }
  getList(){
    // 获取列表
  }
  del(item){
    // 删除
    this.getList()
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
  mounted: {
    
  }
}
</script>
<style scoped lang="scss">

  
</style>
