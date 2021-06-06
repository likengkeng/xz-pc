<template>
  <div class="header">
    <div class='nav'>{{nav}}</div>
    <div class='title'>{{title}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class MyHeader extends Vue {
  get nav(){
    let str = ''
    this.$route.matched.forEach(el => {
      if (el.meta.name) {
        str += ` ${el.meta.name} /`
      }
    })
    str = str.substr(0, str.length-1)
    return str
  }
  get title(){
    return this.$route.meta.name
  }
  mounted(){
      console.log()

  }
}
</script>
<style scoped lang="scss">
.header {
  padding: 16px 32px;
  background-color: #fff;
  .nav{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    margin-bottom: 16px;
  }
  .title{
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 20px;
  }
}
</style>
