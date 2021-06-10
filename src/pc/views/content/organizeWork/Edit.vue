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
export default class organizeWorkEdit extends Vue {
  sumbit(form: any, type: any){
    console.log(form)
    let key = 'powerAdd'
    if (form.organizationPowerId) {
      key = 'powerEdit'
    }
    form.organizationPowerMeunType = 1
    form.organizationPowerType = type
    $http[key]({...form})
    .then(res => {
      this.$message({
        message: '新增成功',
        type: 'success'
      });
      this.$router.push({name: 'OrganizeWork', query: {type}})
    })
  }
}
</script>
<style scoped lang="scss">
  
</style>
