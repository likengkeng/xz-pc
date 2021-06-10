<template>
  <div class="account">
    <div class='flex jc_sb al_center mb_20'>
      <el-input placeholder="请输入账号" v-model="account" class="input-with-select">
        <el-button  slot="append" type="primary" icon="el-icon-search">搜索</el-button>
      </el-input>
      <el-button type="primary" @click='add'><i class="el-icon-plus"></i>  新建</el-button>
    </div>
    <div>
      <div class='tip'><i class="el-icon-info"></i> 全部账号<span class='color'>{{tableData.length}}</span>项 </div>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="accountLoginName"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="createDatetime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click='reset(scope.row)'>重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class='pages'>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, prev, pager, next ,sizes, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="新增" :visible.sync="isShow" width='500px'>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="accountLoginName">
          <el-input v-model="ruleForm.accountLoginName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="ruleForm.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="sumbit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import $http from '@/pc/api/event';
import Component from 'vue-class-component';


@Component({
})
export default class Account extends Vue {
  tableData: Array<any> = []
  account: String = ''
  ruleForm: any = {}
  isShow: Boolean = false
  pageSize: Number = 10
  total: Number = 0
  pageIndex: Number = 1
  validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (this.ruleForm.confirmPassword !== '') {
        this.$refs.ruleForm.validateField('confirmPassword');
      }
      callback();
    }
  }
  validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.ruleForm.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  }
  rules = {
    password: [
      { required: true, validator: this.validatePass, trigger: 'blur' }
    ],
    confirmPassword: [
      { required: true, validator: this.validatePass2, trigger: 'blur' }
    ],
    accountLoginName: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ]
  }
  reset(item){
    $http.resetPassword({...item})
    .then(res => {
      this.$message({
        message: '重置成功',
        type: 'success'
      });
    })
    
  }
  del(item){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.accountDel({...item})
      .then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
     
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
  }
  add(){
    console.log(this)
    this.isShow=true
  }
  getList(){
    $http.accountList({
      	pageIndex: 1,
        pageSize: this.	pageSize
    })
    .then(res => {
      this.tableData = res.data
      this.total = res.totalElements
    })
  }
  handleSizeChange(val){
    this.pageSize = val
    this.getList()
  }
  handleCurrentChange(val){
    this.pageIndex = val
    this.getList()
  }
  sumbit(formName){
    this.$refs[formName].validate((valid) => {
      if (valid) {
        $http.accountAdd({...this.ruleForm})
        .then(res => {
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.getList()
          this.isShow = false
        })
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  mounted() {
    this.getList()
  }

}
</script>

<style scoped lang="scss">
.account{
  padding: 13px 8px;
  ::v-deep .el-input-group__append{
    background: #1890FFFF;
    color: #fff;
  }
  .input-with-select{
    width: 550px;
  }
  .tip{
    padding: 9px 17px;
    background: #BAE7FFFF;
    border: 1px solid #BAE7FF;
  }
  ::v-deep .el-icon-info{
    color: #1890FFFF!important;
  }
  .color{
    color: #1890FFFF;
  }
  .mb_20{
    margin-bottom: 20px;
  }
  .pages{
    padding: 0px 19px;
    margin: 34px 0px;
    text-align: right;
  }
}
</style>
