<template>
  <div>
    <el-upload
      class='myUpload'
      :http-request="chunkedUpload"
      :ref="chunkedUpload"
      :action="apiUrl + '/file/upload'"
      :data="uploadData"
      :on-change="onchange"
      :multiple="true"
      :auto-upload="false"
      :show-file-list="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="chunkedUpload"
        >上传到服务器</el-button
      >
    </el-upload>

    <div class="file_list">
      <div
        v-for="(item,index) in fileList"
        :key="item.params.file.uid"
        class="file_item"
      >
        <div>
          <span>{{ item.params.file.name }}</span>
          <el-progress
            :percentage="item.progress"
            color="#409eff"
            v-show="showProgress"
          ></el-progress>
        </div>

        <i class="el-icon-close" @click="remove(index)"></i>
        
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import md5 from 'js-md5';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import $http from '@/pc/api/event';
  import {apiUrl} from '@/pc/url.config.js'

  @Component({
  })
  export default class MyUpload extends Vue {
    apiUrl: String = apiUrl
    obj: any = {}
    fileList: any = []
    showProgress: Boolean = false
    uploadData: any = {}
    myRequest(file){
      console.log(file)
      let reader = new FileReader();
      reader.readAsArrayBuffer(file.file);
      this.obj = {reader}
      setTimeout(() => {
        const checksum = md5(this.obj.reader.result)
        console.log(checksum)
        $http.metadataGet({
          file_size: reader.result.byteLength,
          file_name: file.file.file_name,
          checksum
        })
      .then(el => {

      })
      }, 1000);
    }
    chunkedUpload() {
      this.showProgress = true;
      let fileList = this.fileList;
      console.log(fileList[0].reader.result)
      fileList.forEach((element) => {
        element.params.checksum = md5(element.reader.result);
        element.params.file_size = element.reader.result.byteLength;
        console.log(element.params.file_size, 5*1024*1024)
        if (element.params.file_size > 5 * 1024 * 1024) {

          //文件的实际大小大于5M走断点续传
          $http.metadataGet({
            file_size: element.params.file_size,
            file_name: element.params.file_name,
            checksum: element.params.checksum,
          }).then((res) => {
            let qpInfo = res.data; //接口返回的切片文件信息
            element.qpInfo = qpInfo;
            this.bigFile(element);
          });
        } else {
          // 这里直接上传文件走另外的接口
           let file = element.params.file;
            let param = new FormData(); //创建form对象
            param.append("files", file); //通过append向form对象添加数据
            element.progress = 10;
            $http.fileUpload(param).then((res) => {
              element.progress = 100;
              this.uploadSuccess(res)
            });
        }
      });
    }
    // 大文件切片上传方法
    async bigFile(qpInfo) {
      console.log(qpInfo);
      let { reader } = qpInfo;
      let { blockStatus, blockList, blockSize, blockCount } = qpInfo.qpInfo;

      let fnArr = [];
      let idx = 0;
      for (let i = 0; i < blockCount; i++) {
        var blockNumber = blockList[i];
        if (!blockStatus[i]) {
          var udata = reader.result.slice(idx, idx + blockSize[i]);
          var sign = md5(udata);
          var headers = {
            "Content-Type": "application/octet-stream",
            "File-Size": qpInfo.params.file_size,
            Checksum: qpInfo.params.checksum,
            "Block-Checksum": sign,
            "Block-Number": blockNumber,
          };

          await $http.blockUpload(headers, udata).then((res) => {
            if (res.errorCode === "0000") {
              idx += blockSize[i];
              qpInfo.progress += parseFloat((100 / blockCount).toFixed(2));
            }
            this.$message({
              message: "上传成功",
              type: "success",
            });
            qpInfo.progress = 100;
            this.uploadSuccess(res)
          });
        } else {
          idx += blockSize[i];
          qpInfo.progress += parseFloat((100 / blockCount).toFixed(2));
        }
      }
    }
    onchange(e) {
      let reader = new FileReader();
      let firstFile = e.raw;
      reader.readAsArrayBuffer(firstFile);
      let obj = {
        reader,
        params: {
          checksum: "",
          file_size: 0,
          file_name: firstFile.name,
          file: firstFile,
          fileData: null,
        },
        progress: 0,
      };
      this.fileList.push(obj);
    }
    remove(index){
      this.fileList.splice(index,1)
    }
    format(percentage) {
      return percentage === 100 ? "上传成功" : `${percentage}%`;
    }
    
    uploadSuccess(res){
      console.log(res)
      this.$emit("uploadSuccess", res)
    }
  }
</script>
 
<style>
.display_none{
    display: none;
  }
</style>