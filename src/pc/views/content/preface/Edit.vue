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
export default class PreaceEdit extends Vue {
  sumbit(form: any){
    console.log(form)
    let key = 'prefaceAdd'
    if (form.prefaceId) {
      key = 'prefaceEdit'
    }
    form.prefaceType = form.articleVO.articleType ==  1 ? 4 : 3
    $http[key]({...form})
    .then(res => {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
      this.$router.push({name: 'prefaceContent'})
    })
  }
  mounted() {
    
  }
}
</script>
<style scoped lang="scss">

</style>
