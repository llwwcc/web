(function($){
	//1.登录页面的切换
	var $register =$('#register')
	var $login =$('#login')
	$('#go-register').on('click',function(){
		$register.show()
		$login.hide()
	})
	$('#go-login').on('click',function(){
		$register.hide()
		$login.show()
	})
	//2 注册
	//用户名以字母开头包字母下划线3-10字符
	var usernameReg =/^[a-z][a-z0-9]{2,9}$/i
	// 密码3-6任意字符
	var passwordreg =/^\w{3,6}$/
	var $err=$register.find('.err');
	$('#sub-register').on('click',function(){
		//2.1. 获取内容
		var username =$register.find('[name=username]').val();
		var password =$register.find('[name=password]').val();
		var repassword =$register.find('[name=repassword]').val();

		// 2.2.验证
		var errmag='';
		if(!usernameReg.test(username)){
			errmag='用户名以字母开头包字母下划线3-10字符'
		}else if(!passwordreg.test(password)){
			errmag='密码3-6任意字符'
		}else if(password !=repassword){
			errmag='两次密码不一致'
		}
		if(errmag){
			$err.html(errmag);
			return
		}else{
			// 2.3.发送ajax请求
			$err.html()
			$.ajax({
				url:'/user/register',
				type:'POST',
				dateType:'json',
				data:{
					username:username,
					password:password,
				}
			})
			.done(function(result){
				if(result.status == 0){
					$('#go-login').trigger('click')
				}else{
					$err.html(result.message)
				}
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试')
			})
		}
	})
	// 3.登录
	$('#sub-login').on('click',function(){
		//3.1. 获取内容
		var username =$login.find('[name=username]').val();
		var password =$login.find('[name=password]').val();
		// 3.2.验证
		var $err=$login.find('.err');
		var errmag='';
		if(!usernameReg.test(username)){
			errmag='用户名以字母开头包字母下划线3-10字符'
		}else if(!passwordreg.test(password)){
			errmag='密码3-6任意字符'
		}
		if(errmag){
			$err.html(errmag);
			return
		}else{
			// 2.3.发送ajax请求
			$err.html()
			$.ajax({
				url:'/user/login',
				type:'POST',
				dateType:'json',
				data:{
					username:username,
					password:password,
				}
			})
			.done(function(result){
				/*
				$login.hide()
				$('#user-info span').html(result.data.username)
				$('#user-info').show()

				// console.log(result)
				*/
				window.location.reload()
			})
			.fail(function(err){
				$err.html('请求失败,请稍后再试')
			})
		}
	})
	//4.退出
	$('#logout').on('click',function(){
		$.ajax({
			url:'user/logout'
		})
		.done(function(result){
			window.location.href='/'
		})
		.fail(function(err){
			$('#user-info .err').html('请求失败,请稍后再试')
		})
	})
	//5.处理文章列表功能
	var $articlePage = $('#article-page')
    function buildArticleHtml(articles){
        var html = ''
        articles.forEach(function(article){
            var createdTime = moment(article.createdAt).format('YYYY-MM-DD HH:mm:ss')
            html += `
              <div class="panel panel-default content-item">
                <div class="panel-heading">
                  <h3 class="panel-title">
                    <a href="/detail/${article._id.toString()}" class="link" target="_blank">${article.title}</a>
                  </h3>
                </div>
                <div class="panel-body">
                  ${ article.intro }
                </div>
                <div class="panel-footer">
                  <span class="glyphicon glyphicon-user"></span>
                  <span class="panel-footer-text text-muted">${ article.user.username }</span>
                  <span class="glyphicon glyphicon-th-list"></span>
                  <span class="panel-footer-text text-muted">${ article.category.name }</span>
                  <span class="glyphicon glyphicon-time"></span>
                  <span class="panel-footer-text text-muted">${ createdTime }</span>
                  <span class="glyphicon glyphicon-eye-open"></span>
                  <span class="panel-footer-text text-muted"><em>${ article.click }</em>已阅读</span>
                </div>
              </div>
            `
        })    
        return html;
    }
    function buildPaginationHtml(page,pages,list){
        var html = ''
        if(page == 1){
            html += '<li class="disabled">'
        }else{
            html += '<li>'
        }
        html += `
                <a href="javascript:;" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`
        list.forEach(function(i){
            if(i == page){
                html += '<li class="active">'
            }else{
                html += '<li>'
            }
            html += '<a href="javascript:;">'+i+'</a></li>'
        })   

        if(page == pages){
            html += '<li class="disabled">'
        }else{
            html += '<li>'
        }
        html += `<a href="javascript:;" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>`
        return html
    }
    function buildCommentHtml(comments){
        var html = ''
        comments.forEach(function(comment){
            var createdTime = moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')
            html += `<div class="panel panel-default">
                        <div class="panel-heading">${ comment.user.username } 发表于 ${ createdTime } </div>
                        <div class="panel-body">
                          ${ comment.content }
                        </div>
                      </div>`
        })

        return html
    }
    $articlePage.on('get-data',function(ev,data){
        //构建文章html
        $('#article-wrap').html(buildArticleHtml(data.docs))
        //构建分页器html
        $pagination = $articlePage.find('.pagination')
        if(data.pages > 1){
            $pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
        }else{
            $pagination.html('')
        }
    })
    $articlePage.pagination({
        url:'/articles'    
    })
    //6.处理评论列表的分页功能
    var $commentPage = $('#comment-page')
    $commentPage.on('get-data',function(ev,data){
        //构建评论html
        $('#comment-wrap').html(buildCommentHtml(data.docs))
        //构建分页器html
        $pagination = $commentPage.find('.pagination')
        if(data.pages > 1){
            $pagination.html(buildPaginationHtml(data.page,data.pages,data.list))
        }else{
            $pagination.html('')
        }
    })    
    $commentPage.pagination({
        url:'/comment/list'    
    })

})(jQuery);