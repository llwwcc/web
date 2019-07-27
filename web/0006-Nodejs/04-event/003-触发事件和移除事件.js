const Emitter =require('events');
class custom extends Emitter{

}
const eventEmitter = new custom();
//触发事件
eventEmitter.on('test',(even1,even2)=>{
	console.log('even1',even1)
	console.log('even2',even2)
});
eventEmitter.emit('test',22,3)


//移除事件
const listen=()=>{
	console.log('text......1')
}
eventEmitter.on('test',listen);
eventEmitter.off('test',listen)

eventEmitter.emit('test')