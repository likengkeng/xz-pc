<template>
  <div class="big_event_edit">
    <el-form :model="form" ref="form" label-width="100px" class="demo-dynamic">
      <div v-for='(item, index) in form.domains' :key='index' class='list_box border_radius pr'>
        <div class='size_16 del_icon cursor_pointer' @click='remove(item, index)'>
          删除<i class="el-icon-delete-solid"></i>
        </div>
        <el-form-item
          label="时间"
          props='date'
          :rules="{
            required: true, message: '时间不能为空', trigger: 'blur'
          }"
        >
           <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="大事记标题"
          props='date'
          :rules="{
            required: true, message: '大事记标题不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="大事记内容"
          props='date'
          :rules="{
            required: true, message: '大事记内容不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="大事记图片"
          props='date'
          :rules="{
            required: true, message: '大事记图片不能为空', trigger: 'blur'
          }"
        >
          <el-upload
            :limit='4'
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item label="">
           <el-button type="primary" @click="addDomain">添加事迹</el-button>
      </el-form-item>
      <div class='dividing'></div>
      <el-form-item
          label="发布设置"
          props='date'
          :rules="{
            required: true, message: '用户是否可评论', trigger: 'blur'
          }"
        >
           <el-radio-group v-model="form.radio">
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
@Component({})
export default class BigEventEdit extends Vue {
  form: any = {domains: [{}], radio: 1}
  imageUrl: String = ''
  submitForm(key){

  }
  addDomain(){
    this.form.domains.push({
      value: '',
      key: Date.now()
    });
  }
  remove(item, index){
    if (index !== -1) {
      this.form.domains.splice(index, 1)
    }
  }
  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  }
  cancel(){
    this.$router.go(-1)
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
