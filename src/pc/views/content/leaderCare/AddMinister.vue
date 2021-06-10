<template>
  <div class='AddMinister'>
     <el-form ref="form" label-position='right' :model="form" label-width="90px">
        <el-form-item label="发布类型：" class='mb_25'>
          <el-radio-group v-model="form.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">超链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class='item_box border_radius'>
          <el-form-item :label='`第几任`' props='leaderVO.leaderSort' :rules="{
              required: true, message: '第几任不能为空', trigger: 'blur'
            }">
            <el-input-number v-model="form.leaderVO.leaderSort" :step='1' :precision='0' :min="1" :max="1000" label=""></el-input-number>
          </el-form-item>
          <el-form-item
            label="姓名"
            props='leaderVO.leaderName'
            :rules="{
              required: true, message: '姓名不能为空', trigger: 'blur'
            }"
          >
            <el-input class='input' v-model="form.leaderVO.leaderName" placeholder="输入姓名"></el-input>
          </el-form-item>
          <el-form-item
            label="照片"
            props='leaderVO.leaderImagePath'
            :rules="{
              required: true, message: '照片不能为空', trigger: 'blur'
            }"
          >
            <el-upload
              :file-list="fileList"
              :action="apiUrl + '/file/upload'"
              name='files'
              list-type="picture-card"
              :on-change='onchang'>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item
            label="简介"
            props='leaderVO.leaderComment'
            :rules="{
              required: true, message: '简介不能为空', trigger: 'blur'
            }"
          >
            <el-input :rows='4' type="textarea" class='input' v-model="form.leaderVO.leaderComment"></el-input><span class='color_666'>不限字数</span> 
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
     </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {apiUrl} from '@/pc/url.config.js'

@Component({})
export default class AddMinister extends Vue {
  apiUrl: String = apiUrl
  form: any = {
    leaderVO: {}
  }
  dialogImageUrl: String = ''
  dialogVisible: Boolean = false
  fileList: Array<any> = []
  isEdit: Boolean = false
  addDomain(){
    this.form.domains.push({
      value: '',
      key: Date.now()
    });
  }
  onchang(file, fileList){
    if (!this.isEdit) {
    this.form.leaderVO.leaderImagePath = []
    }
    fileList.forEach(el => {
      if (el.response?.data?.path) {
        this.form.leaderVO.leaderImagePath.push(el.response?.data?.path)
      }
    });
    console.log(fileList)
  }
  mounted() {
    if (this.$route.query.item) {
      this.form = JSON.parse(this.$route.query.item)
      this.form.leaderVO.leaderImagePathAlls.forEach(item => {
          let obj = new Object();
          obj.url = item;
          this.fileList.push(obj);
      });
      // this.fileList = this.form.memorabiliaImagePathAlls
      this.isEdit = true
    }
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
