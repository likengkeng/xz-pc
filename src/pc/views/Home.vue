<template>
  <div class="home">
    <div class='nav'>
      <menu-left></menu-left>
    </div>
    <div class='content'>
      <div class='header pr'>
        <menu-header></menu-header>
      </div>
      <div>
        <my-header></my-header>
      </div>
      <div class='main'>
        <div class='main_content'><router-view></router-view></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MenuHeader from '@/pc/components/MenuHeader.vue';
import MenuLeft from '@/pc/components/MenuLeft.vue';
import MyHeader from '@/pc/components/MyHeader.vue';

@Component({
  components: {
    MenuHeader,
    MenuLeft,
    MyHeader
  },
})

export default class Home extends Vue {


}
</script>

<style  lang="scss" scoped>
  .home{
    display: flex;
    .nav{
      width: 208px;
      flex-shrink: 0;
    }
    .content{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      width: calc(100vw - 208px);
      .header{
        flex-shrink: 0;
      }
      .main{
        flex-grow: 1;
        padding: 18px;
        background: #F0F2F5;
        .main_content{
          background-color: #fff;
          border-radius: 2px;
          overflow-x: hidden;
          overflow-y: auto;
          height: 100%;
        }
      }
    }
  }
</style>
