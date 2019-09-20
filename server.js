const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const cors=require('cors');//解决跨域
const router=express.Router();
const fs=require('fs');
const path=require('path');
const app = express();
app.use(express.static(__dirname + "./uploads"));
app.use(bodyParser.json())//json请求
app.use(bodyParser.urlencoded({extended:false}));//表单请求
app.use(cors());
app.listen(3000, ()=>{
    // 打印一下
    console.log('http://127.0.0.1:3000')
}) ;//创建服务器
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'titan'
});//配置数据库
 
connection.connect();

app.get('/GetSurveyCorpsList',(req,res) => {
    // 定义SQL语句
    console.log('请求内容',req.query);
    const sqlStr = 'select * from surveycorps'
    connection.query(sqlStr,(err,results) => {
        
        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json(
         new Result({data:results})
        );
        
    })
})
app.get('/AddSurveyCorps',(req,res) => {
	var response = {
		"name":req.query.name,
		"age":req.query.age,
		"birth":req.query.birth,
		"height":req.query.height,
		"weight":req.query.weight,
		"survival":req.query.survival,
		"titan":req.query.titan,
		"ability":req.query.ability,
		"evaluate":req.query.evaluate,
		"filePath":req.query.filePath
	}
	var addSql = 'INSERT INTO suveycorps(name,age,birth,height,weight,survival,titan,ability,evaluate,filePath) values(?,?,?,?,?,?,?,?,?,?)'
})	var addSqlParams = []
function Result({code=1,msg='',data={}}){
    this.code=code;
    this.msg=msg;
    this.data=data;
}

//拦截请求
app.post("/image",function (req,res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/src/upload");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files){
    	console.log(files)
        console.log(files.the_file);
        var filename = files.the_file.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.the_file.path, newPath);  //重命名
        res.send({data:"/upload/"+avatarName})
    })
});
