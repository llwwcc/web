const Emitter =require('events');
class custom extends Emitter{

}
const eventEmitter = new custom();
//触发事件
eventEmitter.on('newListener',(even1,even2)=>{
	console.log('even1',even1)
	console.log('even2',even2)
});
eventEmitter.on('test',()=>{
	console.log('even1',even1)
})
eventEmitter.on('test',()=>{
	console.log('even2',even2)
})
eventEmitter.emit('test')