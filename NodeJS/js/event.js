// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功！');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功！');
});

// 触发 connection 事件 
eventEmitter.emit('connection');
///////////////////////////////////////////////////////////////////
//Demo002
var eventEmitter = new events.EventEmitter(); 
eventEmitter.on('someEvent', function(arg1, arg2) { 
	console.log('listener1', arg1, arg2); 
}); 
eventEmitter.on('someEvent', function(arg1, arg2) { 
	console.log('listener2', arg1, arg2); 
}); 
eventEmitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 
///////////////////////////////////////////////////////////////////////
//Demo003
// 监听器 #001
var listener001 = function listener001() {
	console.log('监听器listener001执行！');
}
// 监听器 #002
var listener002 = function listener002() {
	console.log('监听器listener002执行！');
}
// 绑定connection事件，处理函数为listener001
eventEmitter.addListener('connection', listener001);
// 绑定connection事件，处理函数为listener002
eventEmitter.addListener('connection', listener002);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + '个监听器监听连接事件！');

// 处理connection事件
eventEmitter.emit('connection');

// 移除监听绑定的listener001函数
eventEmitter.removeListener('connection', listener001);
console.log('listerer001 事件监听移除');
// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + ' 个监听器监听连接事件');

/////////////////////////////////////////////////////////////////////////////////
//Demo003
eventEmitter.emit('error');

//end
////////////////////////////////////////////////////////////////////////////////
console.log("程序执行完毕！");