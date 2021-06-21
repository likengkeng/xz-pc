<template>
  <div class="header">
    <div>
    <el-popover
      placement="right-end"
      width="100"
      trigger="click">
      <div class='mb_20 cup' @click='isShow = true'><i class='el-icon-s-tools'></i>  修改密码</div>
      <div @click='logout' class='cup'><i class='el-icon-switch-button'></i>  安全退出</div>
      <div slot="reference" class='cursor_pointer'>用户名</div>
    </el-popover>
    </div>
    <el-dialog title="修改密码" :visible.sync="isShow">
      <el-form ref="form" :model="form">
       <el-form-item label="账号" props='accountLoginName' label-width="120px" :rules="{
              required: true, message: '账号不能为空', trigger: 'blur'
            }">
          <el-input v-model="form.accountLoginName" placeholder='输入密码'></el-input>
        </el-form-item>
        <el-form-item label="旧密码" props='password' label-width="120px" :rules="{
              required: true, message: '密码不能为空', trigger: 'blur'
            }">
          <el-input v-model="form.password" placeholder='输入密码'></el-input>
        </el-form-item>
        <el-form-item label="新密码" props='newPassword' label-width="120px" :rules="{
              required: true, message: '密码不能为空', trigger: 'blur'
            }">
          <el-input v-model="form.newPassword" placeholder='输入密码'></el-input>
        </el-form-item>
        <el-form-item label="确认密码" props='confirmPassword' label-width="120px" :rules="{
              required: true, message: '密码不能为空', trigger: 'blur'
            }">
          <el-input v-model="form.confirmPassword" placeholder='确认密码'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="sumbit('form')">确 定</el-button>
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
  sumbit(){
    if (!this.form.accountLoginName) {
      this.$message({
        message: '账号不能为空',
        type: 'none'
      });
      return
    }
    if (!this.form.password) {
      this.$message({
        message: '密码不能为空',
        type: 'none'
      });
      return
    }
    if (!this.form.newPassword) {
      this.$message({
        message: '密码不能为空',
        type: 'none'
      });
      return
    }
    if (!this.form.confirmPassword) {
      this.$message({
        message: '密码不能为空',
        type: 'none'
      });
      return
    }
    if (this.form.newPassword != this.form.confirmPassword) {
      this.$message({
        message: '两次密码不一致',
        type: 'none'
      });
      return
    }
    const accountId = sessionStorage.getItem("accountId")
     $http.editPassword({...this.form, accountId })
    .then(res => {
      this.$message({
        message: '操作成功',
        type: 'success'
      });
      this.isShow = false
      this.logout()
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
.cup{
  cursor: pointer
}
</style>
