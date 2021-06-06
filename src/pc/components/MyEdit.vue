<template>
  <div class="LeaderCare_edit">
    <div>
      <el-form ref="form" label-position='right' :model="form" label-width="90px">
        <el-form-item label="发布类型：" class='mb_25'>
          <el-radio-group v-model="form.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">超链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if='form.type == 1'>
          <el-form-item label="选择：" class='mb_25'>
            <el-button>图片</el-button>
            <el-button>音频</el-button>
            <el-button>视频</el-button>
          </el-form-item>
          <el-form-item label="" class='mb_25'>
            <el-input class='header' v-model="form.input" placeholder="请在这里输入标题"></el-input>
          </el-form-item>
          <el-form-item label="" class='mb_25'>
            <el-input class='title' v-model="form.input" placeholder="从这里开始正文"></el-input>
          </el-form-item>
          
          <el-form-item label="" class='mb_25'>
            <!-- <vue-ueditor-wrap v-model="form.msg"></vue-ueditor-wrap> -->
              <el-input
                type="textarea"
                :autosize='{minRows: 5}'
                placeholder="请输入内容"
                v-model="textarea1">
              </el-input>
          </el-form-item>
          <el-form-item label="选择封面图片" class='mb_25 img_size' label-width='120px'>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item label="发布设置：" class='mb_25' label-width='120px'>
            <el-radio-group v-model="form.radio">
              <el-radio :label="1">用户可评论</el-radio>
              <el-radio :label="2">用户不可评论</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="" class='mb_25'>
            <el-input class='链接' v-model="input" placeholder="粘贴地址"></el-input>
          </el-form-item>
        </div>

      </el-form>
      <div class='flex jc_center'>
        <el-button type="primary">保存</el-button>
        <el-button>预览</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  props: {
    url: {
    type: String
    }
  }
})
export default class MyEdit extends Vue {
  form: any = {
    type: 1,
    msg: ''
  }
  input: String = ''
  imageUrl: String = ''
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
}
</script>
<style scoped lang="scss">
  .LeaderCare_edit{
    padding: 39px 13px;
    .mb_25{
      margin-bottom: 25px;
    }
    .header{
       ::v-deep .el-input__inner{
        font-weight: bold;
        font-size: 20px;
        text-align: center;
      }
    }
    .title{
      ::v-deep .el-input__inner{
        text-align: center;
      }
    }
  }
  ::v-deep .img_size{
    font-weight: 16px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
