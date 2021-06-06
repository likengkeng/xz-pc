<template>
  <div class="account">
    <div class='flex jc_sb al_center mb_20'>
      <el-row class='flex_g1'>
        <el-col :span="8">
          <span class="demonstration">时间</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <span>状态   </span>
          <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-col>
      </el-row>
      <el-button type="primary">查询   </el-button>
    </div>
    <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="name"
        label="评论内容">
      </el-table-column>
      <el-table-column
        prop="address"
        label="图片">
      </el-table-column>
      <el-table-column
        prop="address"
        label="视频">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="评论时间">
      </el-table-column>
      <el-table-column
        label="操作" width='400px'>
        <template slot-scope="scope">
          <el-button type='primary'>审核通过</el-button>
          <el-button>审核不通过</el-button>
          <el-button @click="delail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <el-dialog title="详情" :visible.sync="isShow">
      <div class='text_center size_16 mb_20'>大事记</div>
      <div class='mb_20'>评论内容：</div>
      <div class='mb_20'>
        我是内容。。。。。。。
      </div>
      <div class='mb_20'>
        评论时间： 11111111
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="isShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default class Comment extends Vue {
  tableData: Array<any> = [1,2,3]
  account: String = ''
  form: any = {}
  isShow: Boolean = false
  value1: String = ''
  options: Array<any> = [
    {
      value: '选项1',
      label: '审核通过'
    }, {
      value: '选项2',
      label: '审核不通过'
    }
  ]
  delail(){
    console.log(this)
    this.isShow = true
  }
  
  mounted() {
    
  }

}
</script>

<style scoped lang="scss">
.account{
  padding: 13px 8px;

  .input-with-select{
    width: 550px;
  }


  .color{
    color: #1890FFFF;
  }
  .mb_20{
    margin-bottom: 20px;
  }
}
</style>
