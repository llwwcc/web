(function($){

function Tab($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$tabItem=this.$elem.find('.tab-item');
	this.$tabpenls=this.$elem.find('.tab-panel');
	this.itemsLength = this.$tabItem.length;
	this.now = this._getCorrectIndex(this.options.activeIndex);
	this.timer = 0;
	
	//2.初始化
	this.init();
}
Tab.prototype = {
	constructor:Tab,
	init:function(){
		var _this=this;
		//1.选项卡默认选中
		this.$tabItem.eq(this.now).addClass('tab-item-active');
		this.$tabpenls.eq(this.now).show();
		//2.显示隐藏插件
		// console.log(this.$tabpenls);
		this.$tabpenls.showHide(this.options);
		this.$tabpenls.on('show',function(ev){
			_this.$elem.trigger('tab-show',[_this.$tabpenls.index(this),this]);
		})
		//3.监听事件判断类型
		var eventType ="";
		if(this.options.eventName=='click'){
			eventType="click";
		}else{
			eventType="mouseenter";
		}
		//4.监听事件用代理事件
		
		this.$elem.on(eventType,'.tab-item',function(){
			var index=_this.$tabItem.index(this);
			_this._toggle(index);
		})
		//5.是否自动轮播
		if(this.options.autoplay){
			this.autoplay();
			//6.鼠标移入容器停止轮播移出开始轮播
			this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
		}
	},
	_toggle:function(index){
		//index代表即将显示的下标
		//1.隐藏当前
		this.$tabItem.eq(this.now).removeClass('tab-item-active');
		this.$tabpenls.eq(this.now).showHide('hide');
		//2.显示将要显示的
		this.$tabItem.eq(index).addClass('tab-item-active');
		this.$tabpenls.eq(index).showHide('show');
		//3.更新索引
		this.now = index;
		
	},
	_getCorrectIndex:function(num){
		if(num >= this.itemsLength) return 0;
		if(num <0) return this.itemsLength -1;
		return num;
	},
	autoplay:function(){
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			this._toggle(this._getCorrectIndex(this.now+1));
		}.bind(this),this.options.autoplay)
	},
	paused:function(){
		clearInterval(this.timer);
	}
	
};

//当不传参数时的默认配置信息
Tab.DEFAULTS={
	activeIndex:0,
	js:false,
	mode:'fade',
	autoplay:1000,
	eventName:'click'
};

//封装dropdown插件
$.fn.extend({
	tab:function(options){
		//1.实现隐式迭代
		this.each(function(){//实现单例模式
			var $elem = $(this);
			var tab = $elem.data('tab');
			// console.log(Tab);
			if(!tab){
				options = $.extend({},Tab.DEFAULTS,options);
				tab = new Tab($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('tab',tab);
			}
			//第二次调用tab则是调用实例上的方法
			if(typeof tab[options] == 'function'){
				tab[options]();
			}
		})
	}
})


})(jQuery);