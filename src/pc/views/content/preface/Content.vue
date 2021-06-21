<template>
  <div class="big-event">
    <my-list :list='list' name='prefaceEdit' @del='del'></my-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyList from '@/pc/components/MyList.vue'
import $http from '@/pc/api/event';
// import { eventList } from '../mock';

@Component({
  components:{MyList}
})
export default class PrefaceContent extends Vue {
  list: Array<any> = []
  getList(key){
    $http.prefaceList({
      prefaceType: 4
    })
    .then(res => {
      console.log(res)
       res.data.map(el => {
        if (el.articleVO?.createDatetime) {
          el.articleVO.createDatetime = this.format(el.articleVO.createDatetime)
        }
        if (el.articleVO?.updateDatetime) {
          el.articleVO.updateDatetime = this.format(el.articleVO.updateDatetime)
        }

        return el
      })
      this.list = res.data
    })
  }
  del(item, index){
    this.$confirm('此操作将永久删除该该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.prefaceDelete({prefaceId: item.prefaceId})
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
  format(shijianchuo){
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    return `${y}-${m}-${d}`
  }

  mounted() {
    console.log(1111)
    this.getList()
  }
}
</script>
<style scoped lang="scss">

</style>
