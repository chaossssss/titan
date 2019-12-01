const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const cors=require('cors');//解决跨域
const router=express.Router();
const fs=require('fs');
const path=require('path');
const app = express();
app.use(express.static("./src/upload"))
app.use(express.static(__dirname + "./uploads"));
app.use(bodyParser.json())//json请求
app.use(bodyParser.urlencoded({extended:false}));//表单请求
app.use(cors());
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.listen(3000, ()=>{
    // 打印一下
    console.log('http://127.0.0.1:3000')
}) ;//创建服务器
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'titan',
  multipleStatements: true
});//配置数据库
 
connection.connect();

app.get('/Login',(req,res) => {
	const sqlStr = 'select count(*) from user where username=' + req.query.username + 'and password=' + req.query.password
	connection.query(sqlStr,(err,results) => {
	    if(err) return res.json({err_code:'0',message:'获取失败',affectedRows:0})
	    res.json(
	    	new Result({data:{
	    		err_code:'OK',
	    		data:results
	    	}})
	    );  
	})
})

app.get('/GetSurveyCorpsList',(req,res) => {
    // 定义SQL语句
    console.log('请求内容',req.query);
    var pageSize = req.query.pageSize
    var pageNo = req.query.pageNo
    const sqlStr = 'select count(*) from surveycorps;select * from surveycorps order by id desc limit ' + (pageNo-1)*pageSize + ',' + pageSize
    connection.query(sqlStr,(err,results) => {
    	var dataString = JSON.stringify(results);
    	var data = JSON.parse(dataString);
        if(err) return res.json({err_code:'0',message:'获取失败',affectedRows:0})
        // 计算总页数
        var allCount = results[0][0]['count(*)'];
        var allPage = parseInt(allCount)/pageSize;
        var pageStr = allPage.toString();
        // 不能被整除
        if (pageStr.indexOf('.')>0) {
            allPage = parseInt(pageStr.split('.')[0]) + 1; 
        }
        res.json(
        	new Result({data:{
        		err_code:'OK',
        		totalPage:allPage,
        		allCount:allCount,
        		listData:data[1]
        	}})
        );
        
    })
})
app.get('/GetSurveyCorpsListView',(req,res) => {
    const sqlStr = 'select * from surveycorps where id=' + req.query.id 
    connection.query(sqlStr,(err,results) => {
        if(err) return res.json({err_code:'0',message:'获取失败',affectedRows:0})
        res.json(
        	new Result({data:{
        		err_code:'OK',
        		data:results
        	}})
        );  
    })
})
app.post('/AddSurveyCorps',(req,res) => {
	// var form = new formidable.IncomingForm();
	// form.encoding = 'utf-8';
	var response = {
		"name":req.body.name,
		"age":req.body.age,
		"birth":req.body.birth,
		"height":req.body.height,
		"weight":req.body.weight,
		"survival":req.body.survival,
		"titan":req.body.titan,
		"ability":req.body.ability,
		"evaluate":req.body.evaluate,
		"avatar":req.body.avatar,
		"content":req.body.content
	}
	console.log(response)
	var addSql = 'INSERT INTO surveycorps(name,age,birth,height,weight,survival,titan,ability,evaluate,avatar,content) values(?,?,?,?,?,?,?,?,?,?,?)'
	var addSqlParams = [response.name,response.age,response.birth,response.height,response.weight,response.survival,response.titan,response.ability,response.evaluate,response.avatar,response.content]
	connection.query(addSql,addSqlParams,function (err, results){
		console.log(addSqlParams)
		if(err){
			console.log(err)
			return res.json({err_code:'0',content:results,message:'添加失败',affectedRows:0});
		}
		return res.json({err_code:'OK'});
	})
})
app.post('/DelSurveyCorps',(req,res) => {
	var delSql = 'delete from surveycorps where id=' + req.body.id
	connection.query(delSql,function(err,results){
		if(err){
			console.log(err)
			return res.json({err_code:'0',content:results,message:'删除失败',affectedRows:0});
		}
		return res.json({err_code:'OK'})
	})
})
app.post('/UpdateSurveyCorps',(req,res) => {
	var response = {
		"id":req.body.id,
		"name":req.body.name,
		"age":req.body.age,
		"birth":req.body.birth,
		"height":req.body.height,
		"weight":req.body.weight,
		"survival":req.body.survival,
		"titan":req.body.titan,
		"ability":req.body.ability,
		"evaluate":req.body.evaluate,
		"avatar":req.body.avatar,
		"content":req.body.content
	}
	var modSql = 'UPDATE surveycorps SET name = ?,age = ?,birth = ?,height = ?,weight = ?,survival = ?,titan = ?,ability = ?,evaluate = ?,avatar = ?,content = ? where id = ?'
	var modSqlParams = [response.name,response.age,response.birth,response.height,response.weight,response.survival,response.titan,response.ability,response.evaluate,response.avatar,response.content,response.id]
	connection.query(modSql,modSqlParams,function (err, results){
		if(err){
			console.log(err)
			return res.json({err_code:'0',content:results,message:'修改失败',affectedRows:0});
		}
		return res.json({err_code:'OK'})
	})
})




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
        res.send({data:avatarName})
    })
});
