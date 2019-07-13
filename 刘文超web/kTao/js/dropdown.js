(function($){

	function Dropdown($elem,options){
		//1.罗列属性
		this.$elem=$elem;
		this.options=options;
		this.$layer =this.$elem.find('.down-cotent');
		this.tiemr=0;
		// this.activeClass = this.$elem.data('meau-active') + "-meau-active";
		//2.初始化
		this.init();
	}
	Dropdown.prototype={
		constructor:Dropdown,
		init:function(){
			//1.初始化
			this.$layer.showHide(this.options);
			//2.监听事件
			this.$layer.on('show shown hide hidden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type)
			}.bind(this))
			//3.绑定的事件
			if(this.options.eventName =='click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show();
				}.bind(this))
				// 点击别的的地方隐藏
				$(document).on('click',function(){
					this.hide();
				}.bind(this));
			}else{
				this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this))
			}
			
		},
		show:function(){
			//处理快速划过
			if(this.options.delay){
				this.timer=setTimeout(function(){
					this.$layer.showHide('show');
					//显示是添加class
					this.$elem.addClass(this.activeClass);
					
				}.bind(this),this.options.delay)
			}else{
				this.$layer.showHide('show');
				//显示是添加class
				this.$elem.addClass(this.activeClass);
			}
			
			
			
		},
		hide:function(){
			clearTimeout(this.timer)
			this.$layer.showHide('hide');
			//移出时去掉class
			this.$elem.removeClass(this.activeClass)
		}
	}

	//当不传参数时默认
	Dropdown.DEFAULTS={
		js:true,
		mode:'fade',
		delay:300,
		eventName:''
	}

	//封装dropdown插件
	$.fn.extend({
		dropdown:function(options){
			//1.实现隐式迭代
			this.each(function(){
				var $elem =$(this);
				options=$.extend({},Dropdown.DEFAULTS,options)
				new Dropdown($elem,options)
			})
			
		}
	})

})(jQuery)