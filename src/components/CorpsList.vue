<template>
  <el-table
    :data="usersList"
    height="250"
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
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'CorpsList',
  data(){
    return {
      usersList:[]
    }
  },
  mounted(){
    let path = this.$route.path
    console.log(path)
    this.$get("/users").then((res)=>{
        console.log(res)
        this.usersList = res
    })
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
}
</script>
<style scoped>

</style>
