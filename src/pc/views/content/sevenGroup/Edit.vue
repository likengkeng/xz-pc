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
  url: String = ''
 sumbit(form: any, type: any, url: String){
    console.log(form, type, url)
    let key = 'voiceAdd'
    if (form.areaVoiceId) {
      key = 'voiceEdit'
    }
    form.areaVoiceMeunType = type
    form.areaVoiceType = 2
    $http[key]({...form})
    .then(res => {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
      this.$router.push({name: url, query: {type}})
    })
  }
}
</script>
<style scoped lang="scss">
  
</style>
