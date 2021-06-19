<template>
  <my-edit @sumbit='sumbit'></my-edit>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyEdit from '@/pc/components/MyEdit.vue'
import $http from '@/pc/api/event';

@Component({
    components:{MyEdit}

})
export default class LeaderCareEdit extends Vue {
  sumbit(form: any, type: any){
    console.log(form, type)
    let key = 'leaderCareAdd'
    if (form.leaderCareId) {
      key = 'leaderCareEdit'
    }
    form.leaderCareType = type
    $http[key]({...form})
    .then(res => {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
      this.$router.push({name: 'leaderCare', query: {type}})
    })
  }
}
</script>
<style scoped lang="scss">
  
</style>
