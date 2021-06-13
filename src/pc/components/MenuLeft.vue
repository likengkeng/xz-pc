<template>
  <div class="menu_left">
    <div class='flex al_center'>
      <img :src="logo" alt="" class='logo'>
      <div class='color_fff size_16'>西藏组织部</div>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      text-color="#fff"
      router
      active-text-color="#fff">
      <template v-for='item in navList'>
        <el-submenu :index="item.path" :key='item.path' v-if='!!item.children && item.meta.isShowChildren'>
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.meta.name}}</span>
          </template>
          <template v-for='el in item.children'>
            <el-submenu :index="el.path" :to='el.path' v-if='!!el.children && el.meta.isShowChildren' :key='el.path'>
              <template slot="title" >
                <i class="el-icon-location"></i>
                <span>{{el.meta.name}}</span>
              </template>
              <template v-for='res in el.children'>
                <el-menu-item :to='res.path' :index='res.path' :key='res.path' v-if='res.meta.isShowChildren' :route='res'>{{res.meta.name}}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item :index='el.path' :to='el.path' :route="el" :key='el.path' v-else>
              <i class="el-icon-menu"></i>
              <span slot="title">{{el.meta.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index='item.path' :route="item" :key='item.path' v-else>
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.meta.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import logo from '@/images/logo.png';

@Component({})
export default class MenuLeft extends Vue {
  navList:[] = this.$router.options.routes[0].children
  logo: String = logo

  handleOpen(){}
  handleClose(){}
  mounted() {
   
  }
}
</script>
<style scoped lang="scss">
  .menu_left{
    color: #fff;
    background: #001529;
    box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.35);
    min-height: 100vh;
    padding-top: 16px;
    height: 100%;
    box-sizing: border-box;

    .logo{
      width: 36px;
      height: 38px;
      display: block;
      margin-right: 12px;
      margin-left: 14px;
    }
  }

  ::v-deep .is-active{
    background-color: #1890FFFF!important;
  }
  ::v-deep .el-menu{
    border-right: 0px;
  }
</style>
