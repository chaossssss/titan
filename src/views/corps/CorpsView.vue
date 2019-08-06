<template>
<el-row style="margin-left:20px;text-align:left;">
  <el-col :span="12">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker format="MM-dd" type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="身高">
        <el-input v-model="form.height"></el-input>
      </el-form-item>
      <el-form-item label="体重">
        <el-input v-model="form.weight"></el-input>
      </el-form-item>
      <el-form-item label="生存状况">
        <el-radio-group v-model="form.survival">
          <el-radio label="存活"></el-radio>
          <el-radio label="死亡"></el-radio>
          <el-radio label="未知"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="继承巨人">
        <el-switch v-model="form.titan"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col :span="12">
  <div style="width:500px;height:500px;" ref="radar"></div>
  </el-col>
</el-row>
</template>

<script>
import * as api from '@/api/api.js'
export default {
  name: 'CorpsView',
  data() {
    return {
      form: {
        name: '',
        birth: '',
        height: '',
        weight: '',
        survival: '',
        titan: false,
      }
    }
  },
  mounted(){
    let userid = this.$route.params.id
    this.initCharts()
    this.$get(api.GetPropsList,{
      id: userid
    }).then((res)=>{
        console.log(res)
        this.form.name = res[0].name
        this.form.birth = res[0].birth
        this.form.height = res[0].height
        this.form.weight = res[0].weight
        this.form.survival = res[0].survival
        this.form.titan = res[0].titan
    })
  },
  methods:{
    initCharts(){
      let radar = this.$echarts.init(this.$refs.radar)
      let option = {
          title: {
              text: '基础雷达图'
          },
          tooltip: {},
          legend: {
              data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
          },
          radar: {
              // shape: 'circle',
              name: {
                  textStyle: {
                      color: '#fff',
                      backgroundColor: '#999',
                      borderRadius: 3,
                      padding: [3, 5]
                 }
              },
              indicator: [
                 { name: '销售（sales）', max: 6500},
                 { name: '管理（Administration）', max: 16000},
                 { name: '信息技术（Information Techology）', max: 30000},
                 { name: '客服（Customer Support）', max: 38000},
                 { name: '研发（Development）', max: 52000},
                 { name: '市场（Marketing）', max: 25000}
              ]
          },
          series: [{
              name: '预算 vs 开销（Budget vs spending）',
              type: 'radar',
              // areaStyle: {normal: {}},
              data : [
                  {
                      value : [4300, 10000, 28000, 35000, 50000, 19000],
                      name : '预算分配（Allocated Budget）'
                  },
                   {
                      value : [5000, 14000, 28000, 31000, 42000, 21000],
                      name : '实际开销（Actual Spending）'
                  }
              ]
          }]
      };
      radar.setOption(option)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
