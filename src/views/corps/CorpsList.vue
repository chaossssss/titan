<template>
  <div>
    <el-table
      :data="usersList"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="180">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期">
      </el-table-column>
      <el-table-column
        prop="height"
        label="身高(cm)">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="体重(kg)">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/api.js'

export default {
  name: 'CorpsList',
  data(){
    return {
      usersList:[],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted(){
    this.currentPage = 1
    let path = this.$route.path
    console.log(path)
    if(path == '/SurveyCorps'){
      this.$get(api.GetPropsList).then((res)=>{
        this.total = res.length
      })
      this.getList()
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.$router.push({path:`SurveyCorps/${row.id}`})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getList()
    },
    getList(){
      this.$get(api.GetPropsList,{
          _page:this.currentPage,
          _limit:this.pageSize
      }).then((res)=>{
          console.log(res)
          this.usersList = res
      })
    }
  },
}
</script>
<style scoped>

</style>
