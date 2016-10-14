var fs = require("fs");

/*
console.log("创建目录 /tmp/test/");
fs.mkdir("/tmp/test1/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});*/
/////////////////////////
console.log("查看 /tmp 目录");
fs.readdir("/tmp/",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       console.log( file );
   });
});

///////////////////////////////////////////

console.log("准备删除目录 /tmp/test");
fs.rmdir("/tmp/test1",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("读取 /tmp 目录");
   fs.readdir("/tmp/",function(err, files){
      if (err) {
          return console.error(err);
      }
      files.forEach( function (file){
          console.log( file );
      });
   });
});