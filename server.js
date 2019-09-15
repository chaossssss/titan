const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');//解决跨域

const app = express();
app.use(bodyParser.json())//json请求
app.use(bodyParser.urlencoded({extended:false}));//表单请求
app.use(cors());
app.listen(5000, ()=>{
    // 打印一下
    console.log('http://127.0.0.1:5000')
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
    const sqlStr = 'select * from surveycorps'
    connection.query(sqlStr,(err,results) => {
        
        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json(
         new Result({data:results})
        );
        
    })
})
function Result({code=1,msg='',data={}}){
    this.code=code;
    this.msg=msg;
    this.data=data;
}