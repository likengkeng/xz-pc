<template>
  <MysevenGroup></MysevenGroup>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MysevenGroup from '@/pc/components/MysevenGroup.vue'

@Component({
    components:{MysevenGroup}

})
export default class sevenGroup extends Vue {
  
  mounted: {
    
  }
}
</script>
<style scoped lang="scss">

  
</style>
