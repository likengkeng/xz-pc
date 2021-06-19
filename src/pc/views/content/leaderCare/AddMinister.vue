<template>
  <div class='AddMinister'>
     <el-form ref="form" label-position='right' :model="form" label-width="90px">
        <!-- <el-form-item label="发布类型：" class='mb_25' props='type' :rules="{
              required: true, message: '照片不能为空', trigger: 'blur'
            }">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">超链接</el-radio>
          </el-radio-group>
        </el-form-item> -->
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
              :headers="importHeaders"
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
          >
            <el-input :rows='4' type="textarea" class='input' v-model="form.leaderVO.leaderComment"></el-input><span class='color_666'>不限字数</span> 
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
     </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {apiUrl} from '@/pc/url.config.js'
import $http from '@/pc/api/event';

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
  importHeaders = {
    TOKEN: sessionStorage.getItem("token")
  }
  onchang(file, fileList){
    if (!this.isEdit) {
    this.form.leaderVO.leaderImagePaths = []
    }
    fileList.forEach(el => {
      if (el.response?.data?.path) {
        this.form.leaderVO.leaderImagePaths.push(el.response?.data?.path)
      }
    });
    console.log(fileList)
  }
  submitForm(key){
    this.$refs[key].validate((valid) => {
      if (valid) {
        let key = 'leaderCareAdd'
        if (this.isEdit) {
          key = 'leaderCareEdit'
        }
        this.form.leaderCareType = 3
        $http[key]({...this.form})
        .then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.$router.push({name: 'leaderCare', query: {type: 3}})
        })
      } else {
        console.log('error submit!!');
        return false;
      }
    });
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
