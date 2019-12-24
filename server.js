var express=require('express');
var app=express();
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.post('/upload',function(req,res,next){
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.sampleFile;
    
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv('C:/Users/limin/Desktop/1.txt', function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send('File uploaded!');
      });
      next();
});
app.use(express.static('www'));
app.listen(8080);