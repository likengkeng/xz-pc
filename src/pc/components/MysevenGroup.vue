<template>
  <div class="tabs_box">
    <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
      <el-tab-pane label="设置首页封面图" name="1"></el-tab-pane>
      <el-tab-pane label="新增内容" name="2"></el-tab-pane>
    </el-tabs>
    <div v-if='activeName==1'>
      <div class='mb_20'>上传封面图片</div>
      <div>
        <el-upload
          class="avatar-uploader"
          :limit='1'
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div>
        <el-button type="primary" @click='storageImg'>保存</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
    <div v-if='activeName==2'>
      <my-list :list='list' @add='add' @edit='edit' @del='del'></my-list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyList from '@/pc/components/MyList.vue'

@Component({
    components:{MyList}

})
export default class MysevenGroup extends Vue {
  activeName: string = '1'
  list: Array<any> = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  imageUrl: String = ''
  handleClick(){
  }
  getList(){
    // 获取列表
  }
  del(item){
    // 删除
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.getList()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
    
  }
  edit(item){
    let name = 'leaderCareEdit'
    this.$router.push({name})
  }
  add(){
    let name = 'leaderCareEdit'
    this.$router.push({name})
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
  storageImg(){}
  mounted() {
    console.log(this.$router.options)
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
</style>
