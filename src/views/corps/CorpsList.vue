<template>
  <div>
    <el-button @click="add(total)" style="margin: 0 0 10px 10px;" type="success" plain><i class="el-icon-circle-plus"></i>新增</el-button>
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
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
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
import axios from 'axios';
var qs=require('qs');
export default {
  name: 'CorpsList',
  data(){
    return {
      usersList:[],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pagePath: ""
    }
  },
  watch:{
    $route(to,from){
      let path = to.path
      this.pagePath = path
      console.log('path',path)
      this.getList(path,0)
      this.getList(path,1)
    }
  },
  mounted(){
    this.currentPage = 1
    // this.getList(this.$route.path,0)
    // this.getList(this.$route.path,1)
    this.getPropsList()
  },
  methods: {
    handleClick(row) {
      console.log(row);
      let path = this.$route.path.substring(1,this.$route.path.length)
      this.$router.push({path:`${path}/${row.id}`})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      // jsonserver
      // this.getList(this.pagePath)
      this.getPropsList()
    },
    getList(pagePath,index){
      if(index == 1){     
        if(pagePath == "/SurveyCorps") {        
          this.$get(api.GetSurverCorpsList,{
              _page:this.currentPage,
              _limit:this.pageSize
          }).then((res)=>{
              // console.log(res)
              this.usersList = res
          })
        }else if(pagePath == "/CharterCorps"){
          this.$get(api.GetCharterCorpsList,{
              _page:this.currentPage,
              _limit:this.pageSize
          }).then((res)=>{
              // console.log(res)
              this.usersList = res
          })
        }else if(pagePath == "/BeStationedCorps"){
          this.$get(api.GetBeStationedCorpsList,{
              _page:this.currentPage,
              _limit:this.pageSize
          }).then((res)=>{
              // console.log(res)
              this.usersList = res
          })
        }
      }else if(index == 0){
        if(pagePath == "/SurveyCorps") {  
          this.$get(api.GetSurverCorpsList).then((res)=>{
            this.total = res.length
          })
        }else if(pagePath == "/CharterCorps"){
          this.$get(api.GetCharterCorpsList).then((res)=>{
            this.total = res.length
          })
        }else if(pagePath == "/BeStationedCorps"){
          this.$get(api.GetBeStationedCorpsList).then((res)=>{
            this.total = res.length
          })
        }

      }
    },
    getPropsList(){
      let that = this
      this.$get('/GetSurveyCorpsList',{
        pageNo:that.currentPage,
        pageSize:that.pageSize
      }).then((data)=>{
        console.log(data)
        this.usersList = data.data.listData
        this.total = data.data.allCount
        
      })
    },
    add(total){
      let path = this.$route.path.substring(1,this.$route.path.length)
      this.$router.push({path:`${path}Add/${total}`})
    },
    edit(row){
      let path = this.$route.path.substring(1,this.$route.path.length)
      this.$router.push({path:`${path}Edit/${row.id}`})
    },
    del(row){
      // jsonserver
      // if(this.pagePath == "/SurveyCorps") {        
      //   this.$del(api.GetSurverCorpsList,{
      //       id:row.id,
      //   }).then((res)=>{

      //   })
      // }else if(this.pagePath == "/CharterCorps"){
      //   this.$del(api.GetCharterCorpsList,{
      //       id:row.id,
      //   }).then((res)=>{

      //   })
      // }else if(this.pagePath == "/BeStationedCorps"){
      //   this.$del(api.GetBeStationedCorpsList,{
      //       id:row.id,
      //   }).then((res)=>{

      //   })
      // }
      var instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
      instance.post(`/DelSurveyCorps`,qs.stringify({id:row.id})).then(res => {
        console.log(res)
        if(res.data.code == 1){
          this.getPropsList()
        }
      });
    }
  },
}
</script>
<style scoped>

</style>
