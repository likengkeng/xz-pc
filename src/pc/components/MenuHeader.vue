<template>
  <div class="header">
    <div>
    <el-popover
      placement="right-end"
      width="100"
      trigger="click">
      <div class='mb_20' @click='isShow = true'><i class='el-icon-s-tools'></i>  修改密码</div>
      <div @click='logout'><i class='el-icon-switch-button'></i>  安全退出</div>
      <div slot="reference" class='cursor_pointer'>用户名</div>
    </el-popover>
    </div>
    <el-dialog title="修改密码" :visible.sync="isShow">
      <el-form :model="form">
        <el-form-item label="账号" label-width="120px">
          <el-input v-model="form.name" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.name" placeholder='输入密码'></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px">
          <el-input v-model="form.name" placeholder='确认密码'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import $http from '@/pc/api/event';

@Component({})
export default class MenuHeader extends Vue {
  isShow: Boolean = false
  form: any = {}
  logout(){
    $http.logout()
    .then(res => {
      sessionStorage.removeItem("token")
      this.$router.push({name: 'login'})
    })
  }
}
</script>
<style scoped lang="scss">
.header {
  height: 48px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 28px;
}
.mb_20{
  margin-bottom: 20px;
}
</style>
