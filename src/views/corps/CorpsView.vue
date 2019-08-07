<template>
<el-row style="margin-left:20px;text-align:left;">
  <el-col :span="10" class="pr20">
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
  <el-col :span="10">
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
        this.initCharts(res)
    })
  },
  methods:{
    initCharts(data){
      let radar = this.$echarts.init(this.$refs.radar)
      let abilitys = data[0].ability
      let abilityName = [],abilityValue = []
      for(let k in abilitys){
        let json = {}
        json.name = abilitys[k].name
        json.max = 12
        abilityName.push(json)
        abilityValue.push(abilitys[k].score)
      }
      console.log(abilityName,abilityValue)
      let option = {
          title: {
              text: '公式书数据'
          },
          tooltip: {},
          legend: {
              data: [data[0].name]
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
              indicator: abilityName
          },
          series: [{
              name: '五星图',
              type: 'radar',
              // areaStyle: {normal: {}},
              data : [
                  {
                      value : abilityValue,
                      name : data[0].name
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
.pr20 {
  padding-right: 20px;
}
</style>
