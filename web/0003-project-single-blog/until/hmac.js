
const crypto =require('crypto')
module.exports= (str)=>{
	const hmac =crypto.createHmac('sha512','sdfsfjdslk12321')
	hmac.update(str)
	return hmac.digest('hex')
}