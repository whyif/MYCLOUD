var express=require('express');
var app=express();
const fileUpload = require('express-fileupload');
var morgan = require('morgan');
var fs=require('fs');
var path = require('path');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
//创建一个可写流，写入到目录下的access.log文件中        //morgan只能记录“通过”他的请求，放在最后的话post请求被app.post拦截，故应该放在前面
app.use(morgan(':date[clf] :method', {stream: accessLogStream}));
//记录日志，形式为short，写入到accessLogStream      //无法记录post请求？？？？？？时间为格林尼治时间？？？？？？
app.use(fileUpload());
app.post('/upload',function(req,res,next){
    if (!req.files || Object.keys(req.files).length === 0) {
        res.send('No files were uploaded.');
      }
      var sampleFile = req.files.sampleFile;
    
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(path.join('C:/Users/limin/Desktop/'+req.files.sampleFile.name), function(err) {
        if (err){
          res.send(err);
        }
        res.send('upload successfully!');
      });
});

app.use(express.static('www'));
app.listen(8080);