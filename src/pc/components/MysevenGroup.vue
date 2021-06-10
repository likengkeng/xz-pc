<template>
  <div class="tabs_box">
    <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
      <el-tab-pane label="设置首页封面图" name="1"></el-tab-pane>
      <el-tab-pane label="新增内容" name="2"></el-tab-pane>
    </el-tabs>
    <div v-if='activeName==1'>
      <div class='mb_20'>上传封面图片</div>
      <div class='flex mb_20 wrap'>
        <img v-for='item in list' :key='item.areaVoiceCoverImagePath' :src="item.areaVoiceCoverImagePath" alt="" class='img'>
        <el-upload
          class="avatar-uploader"
          :limit='1'
          :http-request="upload"
          :action="apiUrl + '/file/upload'"
          :multiple="true"
          :show-file-list="false">
          <img v-if="fileUrl" :src="fileUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div>
        <el-button type="primary" @click='storageImg' :loading="btnLoading">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
    <div v-if='activeName==2'>
      <my-list :list='list' name='SevenGroupEdit' :routerName='name' :type='type' @del='del'></my-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyList from '@/pc/components/MyList.vue'
import $http from '@/pc/api/event';
import {apiUrl} from '@/pc/url.config.js'

@Component({
  components:{MyList},
  watch: {
    '$route'(val, oldval){
      console.log(val)
      this.type = val.meta.type
      this.getList()
    }
  }
})
export default class MysevenGroup extends Vue {
  apiUrl: String = apiUrl
  activeName: string = '1'
  name: String = ''
  list: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  type: Number = 1
  fileUrl: String = ''
  btnLoading: Boolean = false
  handleClick(){
    this.getList()
  }
  getList(){
    // 获取列表
    $http.voiceList({
      areaVoiceMeunType: this.type,
      areaVoiceType: this.activeName
    })
    .then(res => {
      this.list = res
    })
  }
  del(item){
    // 删除
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      $http.voiceDelete({areaVoiceId: item.areaVoiceId})
      .then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList()
      })
    }).catch(() => {        
    });
    
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
  upload(file){
    console.log(file)
    let param = new FormData(); //创建form对象
    param.append("files", file.file); //通过append向form对象添加数据
    $http.fileUpload(param).then((res) => {
      this.fileUrl = res.pathAll
    });
  }
  storageImg(){
    if (!this.fileUrl) {
      this.$message({
        message: '请先选择图片',
        type: 'warning'
      });
      return
    }
    this.btnLoading = true
    $http.voiceAdd({
      areaVoiceCoverImagePath: this.fileUrl,
      areaVoiceType: 1,
      areaVoiceMeunType: this.type
    })
    .then(res => {
      this.btnLoading = false
      this.$message({
        message: '上传成功',
        type: 'success'
      });
      this.fileUrl = ''
      this.getList()
    })
  }
  
  mounted() {
    // console.log(this.$route.meta.type)
    this.type = this.$route.meta.type
    this.name = this.$route.name
    if(this.$route.query.type)  this.activeName = '2'

    this.getList()
  }
}
</script>
<style scoped lang="scss">
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
  .tabs_box{
    padding: 0px 30px;
    .mb_20{
      margin-bottom: 20px;
    }
  }
  .img{
    width: 178px;
    height: 178px;
    display: block;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
