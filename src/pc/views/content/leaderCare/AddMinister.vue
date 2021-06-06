<template>
  <div class='AddMinister'>
     <el-form ref="form" label-position='right' :model="form" label-width="90px">
        <el-form-item label="发布类型：" class='mb_25'>
          <el-radio-group v-model="form.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">超链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-for="(domain, index) in form.domains" :key="domain.key" class='item_box border_radius'>
          <el-form-item :label='`第${index+1}任`'></el-form-item>
          <el-form-item
            label="姓名"
            :rules="{
              required: true, message: '姓名不能为空', trigger: 'blur'
            }"
          >
            <el-input class='input' v-model="domain.name" placeholder="输入姓名"></el-input>
          </el-form-item>
          <el-form-item
            label="照片"
            :rules="{
              required: true, message: '照片不能为空', trigger: 'blur'
            }"
          >
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :limit='4'
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item
            label="简介"
            :rules="{
              required: true, message: '简介不能为空', trigger: 'blur'
            }"
          >
            <el-input class='input' v-model="domain.name"></el-input><span class='color_666'>不限字数</span> 
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="addDomain">新增域名</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
     </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({})
export default class AddMinister extends Vue {
  form: any = {
    domains: [{value: ''}]
  }
  dialogImageUrl: String = ''
  dialogVisible: Boolean = false
  addDomain(){
    this.form.domains.push({
      value: '',
      key: Date.now()
    });
  }
  removeDomain(item) {
    var index = this.form.domains.indexOf(item)
    if (index !== -1) {
      this.form.domains.splice(index, 1)
    }
  }
  handleRemove(file, fileList) {
    console.log(file, fileList);
  }
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  }
}
</script>
<style scoped lang="scss">
  .AddMinister{
    padding: 27px 28px;
    .item_box{
      padding: 8px 0px;
      background: #F6F6F6;
      margin-bottom: 15px;
    }
    .input{
      display: inline-block;
      max-width: 468px;
      margin-right: 11px;
    }
  }
  
</style>
