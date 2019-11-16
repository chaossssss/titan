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
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
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
      <el-form-item label="头像">
        <el-upload
          action="/api/image"
          list-type="picture-card"
          name="the_file"
          :multiple="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="function(res,file){return uploadSuccess(res,file,'avatar')}">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <div class="editorcon">
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                      @change="onEditorChange($event)">
        </quill-editor>
        <el-upload
                class="avatar-uploader"
                action="/api/image"
                name="the_file"
                :show-file-list="false"
                :on-success="function(res,file){return uploadSuccess(res,file,'editor')}"
                :on-error="uploadError"
                :before-upload="beforeUpload">
        </el-upload>
      </div>
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
      <el-form-item label="评价">
        <el-input v-model="form.evaluate"></el-input>
      </el-form-item>
    </el-col>
  </el-form>
</el-row>
</template>

<script>
import * as api from '@/api/api.js'
import axios from 'axios';
var qs=require('qs');
export default {
  name: 'CorpsView',
  data() {
    return {
      form: {
        name: '',
        birth: '',
        age: '',
        height: '',
        weight: '',
        survival: '',
        titan: true,
        evaluate:'',
      },
      avatar: '',
      content:'',
      ability1:'',
      ability2:'',
      ability3:'',
      ability4:'',
      ability5:'',
      dialogImageUrl: '',
      dialogVisible: false,
      editorPic: '',
      editorOption: {
        placeholder: '',
        theme: 'snow',  // or 'bubble'
        modules: {
           toolbar: {
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('#quill-upload input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      }
    }
  },
  mounted(){

  },
  methods:{
    onEditorBlur(quill) {
    },
    onEditorFocus(quill) {
    },
    onEditorReady(quill) {
    },
    onEditorChange({ quill, html, text }) {
      this.content = html
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {

    },
    uploadSuccess(response,file,type){
      console.log(response,type)
      if(type == 'avatar'){
        this.avatar = response.data;
      }else if(type == 'editor'){

      }
    },
    uploadEditorSuccess(response,file,fileList){
      console.log(response)
      this.editorPic = response.data;
    },
    onSubmit(){
      let _this = this;
      let submitData = this.form;
      // let userid = this.$route.params.total
      // submitData.id = parseInt(userid) + 1
      submitData.titan = submitData.titan ? 1 : 0
      submitData.avatar = this.avatar
      submitData.ability = JSON.stringify([
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
      ])
      
      let pagePath = this.$route.path.split("/")[1]
      let data = submitData
      console.log(data)
      // json-server
      // if(pagePath == "SurveyCorpsAdd") {  
      //   this.$post(api.GetSurverCorpsList,data).then(res=>{
          
      //   })
      // }else if(pagePath == "CharterCorpsAdd"){
      //   this.$post(api.GetCharterCorpsList,data).then(res=>{

      //   })
      // }else if(pagePath == "BeStationedCorpsAdd"){
      //   this.$post(api.GetBeStationedCorpsList,data).then(res=>{

      //   })
      // }
      var instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
      instance.post(`/AddSurveyCorps`,qs.stringify(data)).then(res => {
        console.log(res)
        if(res.data.err_code == "OK"){
          this.$message({
            message:"提交成功！",
            onClose:function(){
              // _this.$router.go(-1)
              _this.$router.push({path:"/SurveyCorps"})
            }
          })
        }
      });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.pr20 {
  padding-right: 20px;
}
.editorcon .ql-editor{
  height:400px;
}
</style>
