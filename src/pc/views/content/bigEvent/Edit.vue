<template>
  <div class="big_event_edit">
    <el-form :model="form" ref="form" label-width="100px" class="demo-dynamic">
      <div class='list_box border_radius pr'>
        <!-- <div class='size_16 del_icon cursor_pointer' @click='remove(item, index)'>
          删除<i class="el-icon-delete-solid"></i>
        </div> -->
        <el-form-item
          label="时间"
          props='memorabiliaDatetime'
          :rules="{
            required: true, message: '时间不能为空', trigger: 'blur'
          }"
        >
           <el-date-picker
            class='width_400'
            format='yyyy-MM-dd'
            v-model="form.memorabiliaDatetime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="大事记标题"
          props='memorabiliaTitle'
          :rules="{
            required: true, message: '大事记标题不能为空', trigger: 'blur'
          }"
        >
          <el-input class='width_400' v-model="form.memorabiliaTitle"></el-input>
        </el-form-item>
        <el-form-item
          label="大事记内容"
          props='memorabiliaContent'
        >
          <el-input class='width_400' v-model="form.memorabiliaContent"></el-input>
        </el-form-item>
        <el-form-item
          label="大事记文件"
          props='memorabiliaImagePaths'
        >
          <el-upload
            :action="apiUrl + '/file/upload'"
            name='files'
            :on-remove='remove'
            :headers="importHeaders"
            :on-change='onchang'
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <!-- <el-form-item label="">
           <el-button type="primary" @click="addDomain">添加事迹</el-button>
      </el-form-item> -->
      <div class='dividing'></div>
      <el-form-item
          label="发布设置"
          props='date'
          :rules="{
            required: true, message: '用户是否可评论', trigger: 'blur'
          }"
        >
           <el-radio-group v-model="form.memorabiliaCanDiscuss">
              <el-radio :label="1">用户可评论</el-radio>
              <el-radio :label="2">用户不可评论</el-radio>
            </el-radio-group>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import $http from '@/pc/api/event';
import {apiUrl} from '@/pc/url.config.js'

@Component({})
export default class BigEventEdit extends Vue {
  apiUrl: String = apiUrl
  form: any = {}
  imageUrl: String = ''
  fileList: Array<any> = []
  isEdit: Boolean = false
  importHeaders = {
    TOKEN: sessionStorage.getItem("token")
  }
  submitForm(key){
    this.$refs[key].validate((valid) => {
      if (valid) {
        if (!this.fileList.length) {
          this.$message({
            message: '请上传文件',
            type: 'none'
          });
          return
        }
        this.form.memorabiliaImagePaths = []
        this.fileList.forEach(el => {
          if (el.path || el.response?.data?.pathAll) {
            this.form.memorabiliaImagePaths.push(el.path || el.response?.data?.path)
          }
        })
        let data = [this.form]
        let key = 'memorabiliaAdd'
        if (this.isEdit) {
          key = 'memorabiliaEdit'
          data = this.form
        }
        $http[key](data)
        .then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.$router.push({name: 'bigEvent'})
        })
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  addDomain(){
    this.form.domains.push({
      value: '',
      key: Date.now()
    });
  }
  remove(file, fileList){
    this.fileList = fileList
    // if (index !== -1) {
    //   this.form.domains.splice(index, 1)
    // }
  }
  onchang(file, fileList){
    this.fileList = fileList
  }
  // remove(file, fileList){
  //   this.fileList = []
  //   fileList.forEach(el => {
  //     if (el.response?.data?.path) {
  //       list.push(el.response.data.pathAll)
  //       let obj = new Object();
  //         obj.url = el.response.data.pathAll;
  //         this.fileList.push(obj);
  //     }
  //   })
  // }
  preview(){
  }
  cancel(){
    this.$router.go(-1)
  }
  mounted() {
    if (this.$route.query.item) {
      this.form = JSON.parse(this.$route.query.item)
      this.form.memorabiliaImagePathAlls.forEach(item => {
          let obj = new Object();
          obj.url = item;
          this.fileList.push(obj);
      });
      this.isEdit = true
    }
  }
}
</script>
<style scoped lang="scss">
  .big_event_edit {
    padding: 55px 16px;
    .list_box{
      padding: 11px 37px 31px;
      background: #F6F6F6;
      margin-bottom: 25px;
      .del_icon{
        position: absolute;
        top: 10px;
        right: 15px;
        z-index: 10
      }
    }
    .dividing{
      margin: 50px 0px;
      border-bottom: 1px solid #E5E5E5;
    }
    .width_400{
      width: 400px;
    }
  }
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 170px;
    height: 122px;
    line-height: 122px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 170px;
    height: 122px;
    display: block;
  }
</style>
