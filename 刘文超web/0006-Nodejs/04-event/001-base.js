const Emitter =require('events');
class custom extends Emitter{

}
const eventEmitter = new custom();
eventEmitter.on('test',function(){
	console.log('text......')
})
eventEmitter.emit('test');
