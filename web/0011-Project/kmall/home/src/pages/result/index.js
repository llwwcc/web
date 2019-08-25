/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-23 09:41:16
*/
require('pages/common/logo')

require('pages/common/footer')

require('./index.css')

var _util = require('util')

$(function(){
	console.log(window.location.search.substr(1))
	var type = _util.getParamFromUrl('type') || 'default'
    $('.'+type).show()
})