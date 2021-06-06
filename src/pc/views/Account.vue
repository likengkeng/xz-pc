<template>
  <div class="account">
    <div class='flex jc_sb al_center mb_20'>
      <el-input placeholder="请输入账号" v-model="account" class="input-with-select">
        <el-button  slot="append" type="primary" icon="el-icon-search">搜索</el-button>
      </el-input>
      <el-button type="primary" @click='add'><i class="el-icon-plus"></i>  新建</el-button>
    </div>
    <div>
      <div class='tip'><i class="el-icon-info"></i> 全部账号<span class='color'>{{tableData.length}}</span>号 </div>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="address"
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

    <el-dialog title="新增" :visible.sync="isShow">
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


export default class Account extends Vue {
  tableData: Array<any> = [1,2,3]
  account: String = ''
  form: any = {}
  isShow: Boolean = false
  reset(item){
    console.log(this)
    this.$message({
      message: '重置成功',
      type: 'success'
    });
  }
  del(item){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
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
  mounted() {
    
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
}
</style>
