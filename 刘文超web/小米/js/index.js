handleCart();
function handleCart(){
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box');
	var oCartCentent = document.querySelector('.top .cart .cart-content');
	oCart.onmouseenter = function(){
		// oCartCentent.style.height="100px";
		animate(oCartCentent,{height:100},false);
	}
	oCartCentent.onmouseleave = function(){
		// oCartCentent.style.height="0";
		animate(oCartCentent,{height:0},false);
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

 }

 //5.倒计时
 handleTime();
 function handleTime(){
 	var oTime = document.querySelectorAll('.flash .time-num');
 	var endTime =new Date('2019-06-03 23:59:59');
 	var timecha =parseInt((endTime.getTime()-Date.now())/1000);
 	function handletime(){
 		var hours =parseInt(timecha/3600);
	 	var minute =parseInt(timecha%3600/60);
	 	var second =parseInt(timecha/3600%60%60);
	 	oTime[0].innerHTML=hours;
	 	oTime[1].innerHTML=minute;
	 	oTime[2].innerHTML=second;
	 	function str(num){
		return num<10 ? "0" +num : ""+num;
		}
		str(num);
 	}
 	setInterval(handletime,1000);
 	handletime();
 	function str(num){
		return num<10 ? "0" +num : ""+num;
	}
	str(num);
 }