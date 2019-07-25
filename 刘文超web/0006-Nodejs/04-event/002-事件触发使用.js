
const Emitter =require('events');
class custom extends Emitter{

}
const eventEmitter = new custom();
//1.用on
eventEmitter.on('test',function(){
	console.log('text......1')
})
//2.用addListener
eventEmitter.addListener('test',function(){
	console.log('text......2')
})
//3.用once once只能触发一次事件
eventEmitter.once('test',function(){
	console.log('text......3')
})
eventEmitter.emit('test');
eventEmitter.emit('test');
eventEmitter.emit('test');

