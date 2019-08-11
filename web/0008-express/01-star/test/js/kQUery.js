(function(w){
	function kQUery(selector){
		return new kQUery.prototype.init(selector);
		// console.log(111);
	}
	kQUery.prototype={
		constructor:kQUery,
		init:function(selector){
			if(!selector){
				return this;
			}
		}
	}
	
	w.kQUery=w.$=kQUery;
})(window);