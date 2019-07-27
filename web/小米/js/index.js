handleCart();
function handleCart(){
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box');
	var oCartCentent = document.querySelector('.top .cart .cart-content');
	var oLaoding = document.querySelector('.top .cart .cart-content .laoding');
	var oEmpty = document.querySelector('.top .cart .cart-content .empty-content');
	//鼠标移入
	oCart.onmouseenter = function(){
		// oCartCentent.style.height="100px";
		oLaoding.style.display="block";
		animate(oCartCentent,{height:100},true,function(){
			oLaoding.style.display="none";
			oEmpty.style.display="block";
		});
	}
	//鼠标移出
	oCartCentent.onmouseleave = function(){
		// oCartCentent.style.height="0";
		animate(oCartCentent,{height:0},true,function(){
			oLaoding.style.display="none";
			oEmpty.style.display="none";
		});
	}
}

//2.导航栏处理
handletNav();
function handletNav(){
	//获取元素
	var aLi = document.querySelectorAll('.header .header-nav-item');
	var navContent=document.querySelector('.header .nav-content');
	var oContainer =navContent.querySelector('.container');
	var hidTime = null;
	var dateTime =null
	//循环遍历每一个li，绑定事件
	for(var i=0;i<aLi.length-2;i++){
		aLi[i].index =i;
		aLi[i].onmouseenter=function(){
			clearTimeout(hidTime);
			navContent.style.borderTop= "1px solid #ccc";
			oContainer.innerHTML='<div class="laoding"></div>';
			// navContent.style.overflow="visible"
			animate(navContent,{height:200},false,function(){
				navContent.style.overflow="visible"
				// navContent.style.display="none"
				// navContent.style.display="block"
			})
			//延迟加载数据
			var index=this.index;
			//加载数据
			//优化清除定时器
			clearTimeout(dateTime);
			dateTime=setTimeout(function(){
				ladDate(index);
			},1000)

		}
		aLi[i].onmouseleave=function(){
			// hidTime=setTimeout(function(){
			// 	navContent.style.overflow="hidden"
			// 	// navContent.style.borderTop= "1px solid #ccc";
			// 	animate(navContent,{height:0},false,function(){
			// 	navContent.style.borderTop= "none";
			// })
			// },300)
			hidVav();
		}
	}
	//鼠标移入显示内容
	navContent.onmouseenter=function(){
		clearTimeout(hidTime);
	}
	navContent.onmouseleave=function(){
		hidVav();
	}
	//加载数据函数
	function ladDate(index){
		console.log('1111',index);
		var date = navContentDate[index];
		console.log('222',date);
		var html=""
		html+='  <ul>';
		for(var i =0;i<date.length;i++){
			html+='		<li>';
			html+='			<a href="'+date[i].url+'">';
			html+='				<div class="img-box">';
			html+='					<img src="'+date[i].src+'" alt="">';
			html+='				</div>';
			html+='			<p class="nav-content-name">'+date[i].name+'</p>';
			html+='			<p class="nav-content-price">'+date[i].price+'元</p>';
			if(date[i].tag){
				html+='			<span class="tag">新品</span>';
			}
			html+='			</a>';
			html+='		</li>';
		}
		html+='	</ul>';

		oContainer.innerHTML=html;

	}


	function hidVav(){
		hidTime=setTimeout(function(){
				navContent.style.overflow="hidden"
				// navContent.style.borderTop= "1px solid #ccc";
				animate(navContent,{height:0},false,function(){
				navContent.style.borderTop= "none";
			})
			},300)
	}
}

//3.轮播图
handleCousel();
function handleCousel(){
	new Coursel({
		id:"coursel",
		width:1280,
		height:460,
		img:["img/b1.jpg","img/b2.jpg","img/b3.jpg"],
		playtime:1000,
	})
}
 
 //4.产品展示
 handleCat();
 function handleCat(){
	 	var cateItem = document.querySelectorAll('.home .banner .cate .cate-list-item');
	 	var cartContent = document.querySelector('.home .banner .content');
	 	var cartContentBox = document.querySelector('.home .banner .cate-box');
	 	for(var i =0;i<cateItem.length;i++){
	 		cateItem[i].index =i;
	 		// ladDate(this.index);
	 		cateItem[i].onmouseenter=function(){
	 			for(var j=0;j<cateItem.length;j++){
	 				cateItem[j].className="cate-list-item";
	 			}
	 			cartContent.style.display="block";
	 			this.className="cate-list-item active"
	 			//加载数据
	 			ladDate(this.index);
	 		}
	 	}
	 	//鼠标移出大盒子消失
	 	cartContentBox.onmouseleave=function(){
	 		cartContent.style.display="none";
	 		for(var j=0;j<cateItem.length;j++){
	 			cateItem[j].className="cate-list-item";
	 			}
	 	}
	 	//模拟数据
	 	function ladDate(index){
	 		var date=cateItemDate[index];
	 		console.log(date);
	 		var html="";
	 		 	html+='		<ul>';
	 		 	for(var i=0;i<date.length;i++){
					html+='				<li>';
					html+='					<a href="'+date[i].url+'">';
					html+='						<img src="'+date[i].src+'" alt="">';
					html+='						<span>'+date[i].name+'</span>';
					html+='					</a>';
					html+='				</li>';
				}
				html+='			</ul>';
	 		cartContent.innerHTML=html;
	 	}
 }

 //5.倒计时.flash .time-num
 handleTime();
 function handleTime(){
	 	var oTime = document.querySelectorAll('.flash .time-num');
	 	var endTime =new Date("2019-06-07 11:30:59");
	 	var time =null;
	 	function timer(){
	 		var allSecond= parseInt((endTime.getTime()-Date.now())/1000);
	 		if(allSecond<=0){
	 			allSecond=0;
	 			clearInterval(time);
	 		}
		 	var hours =parseInt(allSecond/3600);
		 	var minutes =parseInt(allSecond%3600/60);
		 	var seconds =allSecond%3600%60%60;
		 	oTime[0].innerHTML=str(hours);
		 	oTime[1].innerHTML=str(minutes);
		 	oTime[2].innerHTML=str(seconds);
	 	}
	 	time=setInterval(timer,1000);
	 	timer();
	 	function str(num){
	 		return num>=10 ? ""+num : "0"+num;
	 	}
 }

//6.点击左右按钮滑动
handleMove();
function handleMove(){
	var leftBtn = document.querySelectorAll('.more .fal');
	var productList =document.querySelector('.flash .product-list')
	// console.log(productList);
	//点击右按钮左移
	leftBtn[1].onclick=function(){
		productList.style.marginLeft="-980px";
	}
	leftBtn[0].onclick=function(){
		productList.style.marginLeft="0";
	}
}



//7.处理家电
handleElec();
function handleElec(){
	var aTabitem = document.querySelectorAll('.elec .tab-item');
	var list =document.querySelector('.list');
	ladDate(3);
	for(var i=0;i<aTabitem.length;i++){
		aTabitem[i].index =i;
		aTabitem[i].onmouseenter=function(){
			for(var j=0;j<aTabitem.length;j++){
				aTabitem[j].className="tab-item";

			}
			this.className="tab-item tab-item-avtive";
			//加载数据
			ladDate(this.index);
		}
		
	}
	//加载数据
	function ladDate(index){
		var date = elecDate[index];
		console.log(index);
		var html ="";
		for(var i=0;i<date.length;i++){
			    html+='  <li class="product-item">';
				html+=' 	<a href="'+date[i].url+'">';
				html+=' 		<img src="'+date[i].src+'" alt="">';
				html+=' 		<p class="product-item-name">'+date[i].name+'</p>';
				html+=' 		<p class="product-item-dec">'+date[i].des+'</p>';
				html+=' 		<p class="product-item-price">';
				html+=' 			<strong>'+date[i].price+'</strong>';
				html+=' 			<del>'+date[i].del+'</del>';
				html+=' 		</p>	';
				html+=' 	</a>';
				if(date[i].flage){
					html+=' 	<span class="flage off-flage">'+date[i].flage.name+'</span>';
					html+=' 	<div class="views">';
					html+=' 			<p class="commen">'+date[i].views.commen+'</p>';
					html+=' 			<p class="author">'+date[i].views.author+'</p>';
					html+=' 	</div>';
				}
				html+=' </li>';
			}
		var lastDae = date[date.length-1];
				html+='   <li class="product-area">';
				html+='			<div class="product-area-top">';
				html+='				<p class="product-area-top-des">小米净水器真的很好用，你可以试试</p>';
				html+='				<strong>1799元</strong>';
				html+='				<img src="img/ca.png" alt="">';
				html+='			</div>';
				html+='			<div class="product-area-bottom">';
				html+='				<p class="product-area-bottom-name">浏览更多</p>';
				html+='				<p class="product-area-bottom-hot">热门</p>';
				html+='				<i class="fas fa-arrow-circle-right"></i>';
				html+='			</div>';
				html+='		</li> ';
		list.innerHTML=html;
	}
}








