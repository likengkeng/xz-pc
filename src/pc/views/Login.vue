<template>
  <div class="login flex al_center jc_center">
    <div class='flex'>
      <div class='left'>
        <img :src="cms" alt="" class='cms'>
      </div>
      <div class='right'>
        <div class='text_center mb_37 size_18'>登录</div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账号" class='mb_20' :rules="{required: true, message: '账号不能为空', trigger: 'blur'}">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" class='mb_32' :rules="{required: true, message: '密码不能为空', trigger: 'blur'}">
            <el-input type='password' v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="" class='mb_32'>
            <el-button class='width_100' type="primary" @click='login'>登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import $http from '@/pc/api/event';
import Component from 'vue-class-component';
import cms from '../../images/cms.png'
@Component({
})
export default class Login extends Vue {
  cms = cms
  form: any = {
    name: '', password: ''
  }
  login(){
    console.log(this.form.name)
    if (!this.form.name) {
      console.log(this.form.name, !this.form.name)
      this.$message({
          message: '请输入账号',
          type: 'warning'
        });
      return
    }
    if (!this.form.password) {
      this.$message({
          message: '请输入密码',
          type: 'warning'
        });
      return
    }
    $http.login({
      "loginName": this.form.name,
      "password": this.form.password
    })
      .then((res) => {
        console.log(res)
        sessionStorage.setItem("token",res.data.token)
        sessionStorage.setItem("accountLoginName",res.data.accountLoginName)
        sessionStorage.setItem("accountId", res.data.accountId)
        this.$router.push({name: 'home'})
      })
      .catch(() => {

      });
  }
  mounted() {
    
  }

}
</script>

<style scoped lang="scss">
  .login{
    width: 100vw;
    height: 100vh;
    background: url('@/images/login-background.png') no-repeat;
    background-size:100% 100%;
    .cms{
      width: 100%;
      height: 100%;
    }
    .left{
      width: 350px;
      height: 466px;
      // padding-top: 70px;
      text-align: center;
      box-sizing: border-box;
      color: #fff;
      font-size: 20px;
      background: #BDBDBD;
      border-radius: 4px 0px 0px 4px;
      background: url('@/images/login-1.png') no-repeat;
      background-size:100% 100%;
    }
    .right{
      width: 350px;
      height: 466px;
      padding: 68px 20px 0px;
      box-sizing: border-box;
      border-radius: 0px 4px 4px 0px;
      background-color: #fff;
    }
    .mb_37{
      margin-bottom: 37px;
    }
    .mb_20{
      margin-bottom: 20px;
    }
    .mb_32{
      margin-bottom: 32px;
    }
    .width_100{
      width: 100%;
    }
  }
</style>
