const {Stream} =require('stream');
class coustomWrite extends Stream{
	write(chunk,encoding,callback){
		console.log('chunk....',chunk);
		console.log('encoding....',encoding);
		callback&&callback()
	}
}
const stream2 = new coustomWrite();
stream2.write('test')