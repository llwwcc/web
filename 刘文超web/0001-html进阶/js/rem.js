(function(wid,doc){
	var root=doc.getElementsByTagName('html')[0];
	// console.log(root)
	
	function refrash(){
		var width =doc.body.clientWidth || doc.docementElement.clientWidth;
		var fontSize=width/26+'px';
		root.style.fontSize=fontSize;
	}
	wid.addEventListener('DOMContentLoaded',refrash,false)
	wid.addEventListener('size',refrash,false)
})(window,document)