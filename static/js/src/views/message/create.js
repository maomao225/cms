/**
 * Created by dupeng on 15-9-6.
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'text!src/tpl/message/edit.tpl',
	'src/util',
	'umeditor',
	'umeditor_locale',
	'fileupload'
], function ($, _, Backbone, tpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: '#main',
		template: _.template(tpl),
		events: {
			'input .need-count': 'countChars',
			'click .send-btn': 'validateLetter',
			'click .cancel-btn': 'cancelSend'
		},
		countChars: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var maxLen, curLen, remainLen, curNode, remainNode;
			if(target.hasClass("edui-body-container")){
				maxLen = view.um.options.maximumWords;
				curLen = view.um.getContentLength(true);
				remainLen = maxLen - curLen;
				curNode = $(".editor-desc").find(".current-chars");
				remainNode = $(".editor-desc").find(".remain-chars");
				curNode.text(curLen);
				remainNode.text(remainLen);
			}else{
				maxLen = target.attr("maxlength");
				curLen = $(target).val().length;
				remainLen = maxLen - curLen;
				curNode = target.parents(".form-group").find(".current-chars");
				remainNode = target.parents(".form-group").find(".remain-chars");
				curNode.text(curLen);
				remainNode.text(remainLen);
			}
		},
		initEditor: function(){
			window.um = this.um = UM.getEditor("message-editor", {
				UMEDITOR_HOME_URL: "/cms/static/js/plugins/umeditor/",
				toolbar: ['forecolor | bold italic underline | justifyleft justifycenter justifyright |'],
				maximumWords: 1000,
				wordCount:true
			});
		},
		initUpload: function(){
			var view = this;
			var hint = view.$el.find(".hint-block");
			$('#fileupload').fileupload({
				url: "../static/js/src/data/message-edit.json",
				dataType: 'json',
				add: function(e, data){
					var goUpload = true;
					var uploadFile = data.files[0];
					//file type validation
					if (!(/(\.|\/)(xlsx?)$/i).test(uploadFile.name)) {
						hint.text("仅支持excel格式文件，请重新选择");
						setTimeout(function(){
							hint.text("");
						}, 2000);
						goUpload = false;
					}
					if(goUpload == true){
						data.submit();
					}
				},
				done: function (e, data) {
					var list = data.result.user_ids;
					view.$el.find("input[name='user_ids']").val(list.join(";"));
				}
			}).prop('disabled', !$.support.fileInput);
		},
		validateLetter: function(){
			var user_ids = this.$el.find("input[name='user_ids']").val();
			var course_id = this.$el.find("input[name='course_id']").val();
			var channel = this.$el.find("input[name='channel']:checked");
			var title = this.$el.find("input[name='title']").val();
			var content = this.$el.find("textarea[name='content']").val();
			var hint = this.$el.find(".hint-block");
			//if(user_ids == "" && course_id == ""){
			//	hint.text("收信人ID与课程ID不能同时为空，请至少输入一项");
			//	setTimeout(function(){
			//		hint.text("");
			//	}, 2000);
			//	return false;
			//}
			if(user_ids != "" && !isValidId(user_ids)){
				hint.text("收信人ID格式不正确，请输入正确的收信人ID。");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			if(channel.length <= 0){
				hint.text("请至少选择一种站内信类型");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			if(title == ""){
				hint.text("标题不能为空，请输入标题。");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			if(content == ""){
				hint.text("正文不能为空，请输入正文。");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			if(content.replace(/<\/?[^>]*>/g, "").length >= 1000){
				hint.text("正文长度过长，请修改后再做保存");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			this.sendLetter();
		},
		sendLetter: function(){
			var form = this.$el.find(".content-form");
			var formValues = form.serialize();
			var param = qStrToJson(formValues);
			//channel参数转换为复选框类型
			param.channel = [].concat([], param.channel);
			//link参数判断是否添加了http开头，如未添加则补全
			param.link = (param.link.length == 0 || (/^(https:|http:)?\/\//i).test(param.link)) ? param.link : '//'+param.link;
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/message-edit.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
						location.href = "#message/messages";
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		cancelSend: function(){
			location.href = "#message/messages";
		},
		initialize: function (opt) {
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/messages-type-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
						view.render(data);
					}
					view.initEditor();
					view.initUpload();
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		render: function(data) {
			this.$el.html(this.template(data));
		}
	});
	return view;
});