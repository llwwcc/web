(function($){
	//顶部导航开始
	var $Content = $('.top-right .down');
	var isLoad =false;
	$Content.dropdown({
		js:true,
		mode:'fade',
		// eventName:'click'
	});
	 $Content.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
	 	if(ev.type =='dropdown-show'){
	 		// console.log('will get data');
	 		var $elem=$(this);
	 		var $layer=$elem.find('.down-cotent');
	 		var url =$elem.data('load')
	 		//如果没有数据则无需加载
	 		if(!url) return;
	 		// 判断是否被数据加载
	 		if(!isLoad){
		 			$.getJSON(url,function(data){
		 			console.log(data);
		 			var html ="";
		 			for(var i=0;i<data.length;i++){
		 				html+="<li>"+data[i].name+"</li>"
		 			}
		 			//插入到html
		 			setTimeout(function(){
		 				$layer.html(html);
		 				//加载过
		 				isLoad=true;
		 			},1000)
		 			
		 		})
	 		}
	 		
	 	}
	 })
	//顶部导航结束
	//搜索区开始
	var $search=$('.search');
	// console.log($srach);
	$search.search({});

	//搜索区结束



//轮播图懒加载
	function courselLazyLoad($elem){
		var item = {};//0:loaded 1:loaded
		var totalNum = $elem.find('.carousel-img').length - 1;
		var totalLoadedNum = 0;
		var loadFn = null;
		//1.开始加载
		$elem.on('coursel-show',loadFn = function(ev,index,elem){
			//判断图片有没有被加载
			if(!item[index]){
				$elem.trigger('coursel-load',[index,elem]);
			}
		})
		//2.执行加载
		// $elem.on('coursel-load',function(ev,index,elem){
		// 	// console.log('will load img',index);
		// 	var $elem = $(elem);
		// 	var $imgs = $elem.find('.carousel-img');
		// 	$imgs.each(function(){
		// 		var $img = $(this);
		// 		var imgUrl = $img.data('src');
		// 		loadImage(imgUrl,function(){
		// 			$img.attr('src',imgUrl);
		// 		},function(){
		// 			$img.attr('src','images/focus-carousel/placeholder.png');
		// 		});
		// 	})
		// 	//图片已经被加载
		// 	item[index] = 'isLoaded';
		// 	totalLoadedNum++;
		// 	//所有图片都被加载则移除事件
		// 	if(totalLoadedNum > totalNum){
		// 		$elem.trigger('coursel-loaded');
		// 	}
		// })
		//3.加载完毕
		$elem.on('coursel-loaded',function(){
			$elem.off('coursel-show',loadFn);
		})
	}


	var $coursel = $('.carousel .carousel-wrap');
	courselLazyLoad($coursel);

	$coursel.coursel({});
	/*轮播图逻辑结束*/

	/*今日热销逻辑开始*/
	var $todaysCoursel = $('.todays .carousel-wrap');
	courselLazyLoad($todaysCoursel);

	$todaysCoursel.coursel({});
	/*今日热销逻辑结束*/


	// 楼层开始
	var $floor =$('.floor');
	$floor.on('tab-show',function(ev,index,elem){
		console.log(index,elem);
	})
	$floor.tab({});
	
	// 楼层结束
	// 楼层电梯开始
		var $win = $(window);
		var $doc = $(document);
		var $elevator = $('.elevator');
		var $elevatorItem = $('.elevator-item');
		function getNum(){
			var num = -1;
			if(elem.offset().top>$win.height() + $win.scrollTop()){
				num = index-1;
			}
			return num;
		}
		function getnum(){
			var num = getNum();
			
		}
	// 楼层电梯结束
})(jQuery)