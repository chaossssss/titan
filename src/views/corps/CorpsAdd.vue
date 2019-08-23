<template>
<el-row style="margin-left:20px;text-align:left;">
  <el-form ref="form" :model="form" label-width="80px">
    <el-col :span="10" class="pr20">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker format="MM-dd" value-format="MM-dd" type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
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
          <el-radio :label="1">存活</el-radio>
          <el-radio :label="0">死亡</el-radio>
          <el-radio :label="2">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="继承巨人">
        <el-switch v-model="form.titan"></el-switch>
      </el-form-item>
      <quill-editor v-model="content"
                    ref="myQuillEditor"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
      <el-form-item>
        <el-button @click="onSubmit()" type="primary">提交</el-button>
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item label="格斗术">
        <el-input v-model="ability1"></el-input>
      </el-form-item>
      <el-form-item label="行动力">
        <el-input v-model="ability2"></el-input>
      </el-form-item>
      <el-form-item label="头脑战">
        <el-input v-model="ability3"></el-input>
      </el-form-item>
      <el-form-item label="协调性">
        <el-input v-model="ability4"></el-input>
      </el-form-item>
      <el-form-item label="无情">
        <el-input v-model="ability5"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
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
      },
      content:'',
      ability1:'',
      ability2:'',
      ability3:'',
      ability4:'',
      ability5:'',
    }
  },
  mounted(){
    let userid = this.$route.params.id
    let path = "/" + this.$route.path.split("/")[1]
    if(path == "/SurveyCorps"){

    }else if(path == "/CharterCorps"){

    }else if(path == "/BeStationedCorps"){

    }
  },
  methods:{
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    onSubmit(){
      let submitData = this.form;
      let userid = this.$route.params.total
      submitData.id = parseInt(userid) + 1
      submitData.ability = [
      {
        "name":"格斗术",
        "score":this.ability1
      },
      {
        "name":"行动力",
        "score":this.ability2
      },
      {
        "name":"头脑战",
        "score":this.ability3
      },
      {
        "name":"协调性",
        "score":this.ability4
      },
      {
        "name":"无情",
        "score":this.ability5
      }
      ]
      
      let pagePath = this.$route.path.split("/")[1]
      let data = submitData
      console.log(data)
      if(pagePath == "SurveyCorpsAdd") {  
        this.$post(api.GetSurverCorpsList,data).then(res=>{
          
        })
      }else if(pagePath == "CharterCorpsAdd"){
        this.$post(api.GetCharterCorpsList,data).then(res=>{

        })
      }else if(pagePath == "BeStationedCorpsAdd"){
        this.$post(api.GetBeStationedCorpsList,data).then(res=>{

        })
      }
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
