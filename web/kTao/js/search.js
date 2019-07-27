(function($){

	function Search($elem,options){
		//1.罗列属性
		this.$elem=$elem;
		this.options=options;
		this.$searchInput=this.$elem.find('.text1')
		this.$searchBtn=this.$elem.find('.btn')
		this.$searchLayer=this.$elem.find('.down-list')
		this.$searchForm=this.$elem.find('.search-list')
		//2.初始化
		this.init();
		//3.判断是否有下拉层
		// if(this.options.autocomplete){
			this.autocomplete();
		// }
	}
	Search.prototype={
		constructor:Search,
		init:function(){
			//监听提交按钮事件
			this.$searchBtn.on('click',$.proxy(this.submit,this));
		},
		submit:function(){
			if(!this.getInputVal()){
				// 如果没有数据则不提交
				return false;
			}
			this.$searchForm.trigger('submit');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());
		},
		autocomplete:function(){
			//1.显示下拉层
			// this.$searchLayer.show()
			//监听输入框事件获取json数据
			this.$searchInput.on('input',$.proxy(this.getData,this));
			//2.点击别的地方下拉层隐藏
			$(document).on('click',function(){
				this.hidlayer();
			}.bind(this))
			//3.再次点击获取焦点出现下拉层
			this.$searchInput.on('focus',function(){
				//如果没有内容不显示下拉框
				if(this.getInputVal()){
					this.showlayer();
				}
				
			}.bind(this));
			//4.阻止事件冒泡
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			})

		},
		getData:function(){
			if(this.getInputVal() == ''){
				return;
			}
			$.ajax({
				url:this.options.url + this.getInputVal(),
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				//1.生成html
				var html ="";
				for(var i=0;i<data.result.length;i++){
					html+='<li>'+data.result[i][0]+'</li>'
				}
				//2.插入到下拉层
				// this.$searchLayer.html(html);
				this.appedHtml(html);
				//3.显示下拉层
				// this.$searchLayer.showHide('show');
				if(html == ''){
					this.hidlayer();
				}else{
					this.showlayer();
				}
				
			}.bind(this))
			.fail(function(err){
				console.log(err);
			})
		},
		appedHtml:function(html){
			this.$searchLayer.html(html);
		},
		showlayer:function(){
			this.$searchLayer.showHide('show');
		},
		hidlayer:function(){
			this.$searchLayer.showHide('hide');
		}
		
		
	}
	
	//当不传参数时默认 
	Search.DEFAULTS={
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?q=',
		js:true,
		mode:'slide'
	}

	//封装dropdown插件
$.fn.extend({
	search:function(options){
		//1.实现隐式迭代
		this.each(function(){//实现单例模式
			var $elem = $(this);
			var search = $elem.data('search');
			if(!search){
				options = $.extend({},Search.DEFAULTS,options);
				search = new Search($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('search',search);
			}
			//第二次调用search则是调用实例上的方法
			if(typeof search[options] == 'function'){
				search[options]();
			}
		})
	}
})

})(jQuery)