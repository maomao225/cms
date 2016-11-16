/**
 * Created by dupeng on 15-5-25.
 */
require(['jquery', 'cookie'], function($){
	$(function(){
		$("#username").focus();
		//email check
		function isEmail(str){
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
			return reg.test(str);
		}
		//auto fill form
		if ($.cookie("keep-login") == "true") {
			$("#keep-login").prop("checked", true);
			$("#username").val($.cookie("username"));
			$("#password").val($.cookie("password"));
		}
		//login form validation
		$("#login-form").on("submit", function(e){
			var str_username = $("#username").val();
			var str_password = $("#password").val();
			if(str_username == ""){
				$(".hint-block").text("请输入用户名！");
				return false;
			}else if(!isEmail(str_username)){
				$(".hint-block").text("请输入正确的邮箱地址！");
				return false;
			}
			if(str_password == ""){
				$(".hint-block").text("请输入密码！");
				return false;
			}
			$.ajax({
				type: 'post',
				url: '',
				data: {user_email: str_username, user_pwd: str_password},
				dataType: "json",
				success: function(data, status){
					if(data.statusCode){
						if ($("#keep-login").prop("checked")) {
							$.cookie("keep-login", "true", { expires: 7 });
							$.cookie("username", str_username, { expires: 7 });
							$.cookie("password", str_password, { expires: 7 });
						} else {
							$.cookie("keep-login", "false", { expire: -1 });
							$.cookie("username", "", { expires: -1 });
							$.cookie("password", "", { expires: -1 });
						}
						location.href = "main.html";
					}else{
						$(".hint-block").text("用户名/密码错误！！");
					}
				},
				error: function(xhr, errorType, error){
					console.log(error);
				}
			});
			return false;
		});
	});
});