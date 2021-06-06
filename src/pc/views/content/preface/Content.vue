<template>
  <div class="big-event">
    <my-list :list='list' @add='add' @edit='edit' @del='del'></my-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyList from '@/pc/components/MyList.vue'
// import $http from '@/pc/api/event';
// import { eventList } from '../mock';

@Component({
  components:{MyList}
})
export default class PrefaceContent extends Vue {
  list: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  getList(){
    // 获取列表
  }
  del(item){
    // 删除
    this.getList()
  }
  edit(item){
    this.$router.push({name: 'prefaceEdit'})
  }
  add(){
    this.$router.push({name: 'prefaceEdit'})
  }
  mounted() {
  }
}
</script>
<style scoped lang="scss">

</style>
