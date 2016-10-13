/////////////////////////////////////////////////////
/*
 * Node.js 函数
 * 在JavaScript中，一个函数可以作为另一个函数接收一个参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。
 * Node.js中函数的使用与Javascript类似，举例来说，你可以这样做：
 */
function say(word) {
  console.log(word);
}
function execute(someFunction, value) {
  someFunction(value);
}
execute(say, "Hello");
////////////////////////////////////////////////////
/*
 * 
匿名函数
我们可以把一个函数作为变量传递。但是我们不一定要绕这个"先定义，再传递"的圈子，我们可以直接在另一个函数的括号中定义和传递这个函数：
 */
function execute(someFunction, value) {
  someFunction(value);
}
execute(function(word){ console.log(word) }, "Hello");
//////////////////////////////////////////////////////////////
/*
 * 函数传递是如何让HTTP服务器工作的
带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：
 */
var http = require("http");
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
////////////////////////////////////////////////////////
var http = require("http");
function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}
http.createServer(onRequest).listen(8888);