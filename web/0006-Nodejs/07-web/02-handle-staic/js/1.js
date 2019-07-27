(function($){
	var $input =$('input');
	var $wrap =$('li')
	var $ul =$('ul');
	// console.log($ul)
	$input.on('keydown',function(ev){
		if(ev.keyCode==13){
			
		}
		//发送ajax
		$.ajax({
			url:'add',
			type:'post',
			data:{
				task:$input.val()
			},
			success:function(result){
				console.log(result)
				if(result.code ==0){
					var data =result.data;
					var $dom =$(`<li data-id="${data.id}">${data.task}</li>`);
					$wrap.append($dom)
					$input.val('')
				}
			}
		})
	})
	//点击删除
	// 由于动态添加用事件代理
	$ul.on('click','li',function(){
		console.log(this)
		var $this= $(this)
		$.ajax({
			url:'/del',
			dataType:'json',
			data:{
				id:$this.data('id')
			},
			success:function(result){
				if(result.code==0){
					$this.remove()
				}else{
					alert(result.message)
				}
			}
		})
	})
	
})(jQuery);