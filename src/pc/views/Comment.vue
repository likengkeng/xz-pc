<template>
  <div class="account">
    <div class='flex jc_sb al_center mb_20'>
      <el-row class='flex_g1'>
        <el-col :span='2' class='text_center line_40'>
           时间
        </el-col>
        <el-col :span="6">
          <el-date-picker
            style='width: 100%'
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span='2' class='text_center line_40'>
           状态
        </el-col>
        <el-col :span="6">
          <el-select v-model="value" placeholder="请选择" style='width: 90%'>
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
      <el-tabs v-model="activeName" @tab-click="handleClick" class='p_lr_30'>
        <el-tab-pane label="序言" name="1"></el-tab-pane>
        <el-tab-pane label="领导关怀" name="2"></el-tab-pane>
        <el-tab-pane label="大事件" name="3"></el-tab-pane>
        <el-tab-pane label="组织工作" name="4"></el-tab-pane>
        <el-tab-pane label="榜样力量" name="5"></el-tab-pane>
        <el-tab-pane label="七地组声" name="6"></el-tab-pane>
      </el-tabs>
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
      <div class='pages'>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
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
import $http from '@/pc/api/event';
import Component from 'vue-class-component';
@Component({
})

export default class Comment extends Vue {
  activeName: string = '1'

  tableData: Array<any> = []
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
  pageSize: Number = 10
  total: Number = 0
  pageIndex: Number = 1
  handleClick(){
    this.getList()
  }
  delail(){
    console.log(this)
    this.isShow = true
  }
  getList(){
    $http.commentList({
      touristCommentType: this.activeName,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    })
    .then(res => {
      this.tableData = res.data
      this.total = res.totalElements
    })
  }
  handleSizeChange(val){
    this.pageSize = val
    this.getList()
  }
  handleCurrentChange(val){
    this.pageIndex = val
    this.getList()
  }
  mounted() {
    this.getList()
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
  .pages{
    padding: 0px 19px;
    margin: 34px 0px;
    text-align: right;
  }
  .line_40{
    line-height: 40px;
  }
}
</style>
