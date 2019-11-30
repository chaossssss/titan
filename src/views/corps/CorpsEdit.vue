<template>
<el-row style="margin-left:20px;text-align:left;">
  <el-form ref="form" :model="form" label-width="80px">
      <el-col :span="10" class="pr20">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker format="MM-dd" type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
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
          <el-switch disabled v-model="form.titan"></el-switch>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            action="/api/image"
            list-type="picture-card"
            name="the_file"
            :file-list="fileArr"
            :multiple="multipleBol"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="function(res,file){return uploadSuccess(res,file,'avatar')}">
            <img id="avatar" :src="avatar" v-if="avatar && !changedFlag" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="editorcon">
          <quill-editor v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        @change="onEditorChange($event)">
          </quill-editor>
        </div>
          <el-upload
            class="avatar-uploader"
            action="/api/image"
            name="the_file"
            :show-file-list="false"
            :on-success="function(res,file){return uploadSuccess(res,file,'editor')}"
          >
          </el-upload>
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
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]
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
        titan: false,
        evaluate: '',
      },
      content:'',
      ability1:'',
      ability2:'',
      ability3:'',
      ability4:'',
      ability5:'',
      id:'',
      avatar:'',
      fileArr:[],
      editorOption: {
        placeholder: '',
        theme: 'snow',  // or 'bubble'
        modules: {
           toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {

                if (value) {
                  // document.querySelector('#quill-upload input').click()
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      },
      changedFlag: false,
      multipleBol: false
    }
  },
  mounted(){
    let userid = this.$route.params.id
    this.id = userid
    let path = "/" + this.$route.path.split("/")[1]
    this.getView(userid)
    // jsonserver
    // if(path == "/SurveyCorps"){
    //   this.$get(api.GetSurverCorpsList,{
    //     id: userid
    //   }).then((res)=>{
    //       console.log(res)
    //       this.form.name = res[0].name
    //       this.form.birth = res[0].birth
    //       this.form.height = res[0].height
    //       this.form.weight = res[0].weight
    //       this.form.survival = res[0].survival
    //       this.form.titan = res[0].titan
    //   })
    // }else if(path == "/CharterCorps"){
    //   this.$get(api.GetCharterCorpsList,{
    //     id: userid
    //   }).then((res)=>{
    //       console.log(res)
    //       this.form.name = res[0].name
    //       this.form.birth = res[0].birth
    //       this.form.height = res[0].height
    //       this.form.weight = res[0].weight
    //       this.form.survival = res[0].survival
    //       this.form.titan = res[0].titan
    //   })
    // }else if(path == "/BeStationedCorps"){
    //   this.$get(api.GetBeStationedCorpsList,{
    //     id: userid
    //   }).then((res)=>{
    //       console.log(res)
    //       this.form.name = res[0].name
    //       this.form.birth = res[0].birth
    //       this.form.height = res[0].height
    //       this.form.weight = res[0].weight
    //       this.form.survival = res[0].survival
    //       this.form.titan = res[0].titan
    //   })
    // }
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {

    },
    uploadSuccess(response,file,type){
      console.log(response,type)
      if(type == 'avatar'){
        this.avatar = response.data;
        this.changedFlag = true
      }else if(type == 'editor'){
        let quill = this.$refs.myQuillEditor.quill
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', `http://127.0.0.1:3000/${response.data}`)
        // 调整光标到最后
        quill.setSelection(length + 1)
      }
    },
    getView(id){
      this.$get('/GetSurveyCorpsListView',{
        id:id
      }).then((data)=>{
        console.log(data)
        this.form.name = data.data.data[0].name
        this.form.age = data.data.data[0].age
        this.form.birth = data.data.data[0].birth
        this.form.height = data.data.data[0].height
        this.form.weight = data.data.data[0].weight
        this.form.survival = parseFloat(data.data.data[0].survival)
        this.form.titan = data.data.data[0].titan == '1' ? true : false
        let abilityData = JSON.parse(data.data.data[0].ability)
        console.log(abilityData)
        this.ability1 = abilityData[0].score
        this.ability2 = abilityData[1].score
        this.ability3 = abilityData[2].score
        this.ability4 = abilityData[3].score
        this.ability5 = abilityData[4].score
        this.form.evaluate = data.data.data[0].evaluate
        this.avatar = `http://127.0.0.1:3000/${data.data.data[0].avatar}`
        this.content = data.data.data[0].content
        console.log(data.data.data[0].avatar)
        // this.fileArr = [{url:require('@'+data.data.data[0].avatar)}]
      })
    },
    onSubmit(){
      let _this = this
      let submitData = this.form;
      submitData.id = this.id
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
      submitData.titan = this.form.titan ? '1' : '0'
      submitData.avatar = this.avatar
      submitData.content = this.content
      let pagePath = this.$route.path.split("/")[1]
      let data = submitData
      console.log(data)
      // jsonserver
      // if(pagePath == "SurveyCorpsAdd") {  
      //   this.$patch(api.GetSurverCorpsList,data).then(res=>{
          
      //   })
      // }else if(pagePath == "CharterCorpsAdd"){
      //   this.$patch(api.GetCharterCorpsList,data).then(res=>{

      //   })
      // }else if(pagePath == "BeStationedCorpsAdd"){
      //   this.$patch(api.GetBeStationedCorpsList,data).then(res=>{

      //   })
      // }
      var instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
      instance.post(`/UpdateSurveyCorps`,qs.stringify(data)).then(res => {
        console.log(res)
        if(res.data.err_code == "OK"){
          this.$message({
            message:"修改成功！",
            onClose:function(){
              // _this.$router.go(-1)
              // _this.$router.push({path:"/SurveyCorps"})
              
            }
          })
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pr20 {
  padding-right: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
