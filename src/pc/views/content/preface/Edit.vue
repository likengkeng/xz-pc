<template>
  <my-edit url='url'></my-edit>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyEdit from '@/pc/components/MyEdit.vue'

@Component({
  components:{MyEdit}
})
export default class PreaceEdit extends Vue {
 
}
</script>
<style scoped lang="scss">

</style>
