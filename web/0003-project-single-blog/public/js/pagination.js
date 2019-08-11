/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-05 15:18:56
*/
;(function($){
	$.fn.extend({
        pagination:function(options){
            var $elem =this;
           
            $elem.on('click','a',function(){
                var $this = $(this)
               //获取当前页码,根据当页码计算请求页码
               //1获取当前页码
               var currentPage=$elem.find('.active a').html()
               //2.根据当页码计算请求页码
               var labletxt = $this.attr('aria-label')
               var page =1
               if(labletxt =='Previous'){
                    page=currentPage-1
               }else if(labletxt == 'Next'){
                    page=currentPage*1+1
               }else{
                page =$this.html()
               }
              //如果点击当前页面阻止请求
              if(page == currentPage){
                    return false
              }
              $.ajax({
                url:options.url+"?page="+page,
                dataType:'json'
              })
              .done(function(result){
                if(result.status ==0){
                    $elem.trigger('get-data',result.data)
                }else{
                    alert('请求失败,请稍后再试试')
                }
              })
              .fail(function(err){
                alert('请求失败,请稍后再试试')
              })
            })
        }
    })
})(jQuery);