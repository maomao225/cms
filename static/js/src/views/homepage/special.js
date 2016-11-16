/**
 * Created by dupeng on 15-8-10.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/homepage/special.tpl',
	'text!src/tpl/homepage/special-list.tpl',
	'text!src/tpl/homepage/special-detail.tpl',
	'text!src/tpl/homepage/preview-special.tpl',
	'src/util',
	'fileupload',
	'css!//www.xuetangx.com/static/css/index.css'
], function ($, Backbone, _, bootstrap, tpl, listTpl, detailTpl, previewTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		detailTemplate: _.template(detailTpl),
		previewTemplate: _.template(previewTpl),
		events: {
			'input .need-count': 'countChars',
			'click .save-special-btn': 'saveSpecial',
			'click .order-btn': 'refreshOrder',
			'click .preview-link': 'previewImage',
			'click .edit-link': 'editCourse',
			'click .delete-link': 'confirmDelete',
			'click .confirm-delete-btn': 'deleteCourse',
			'click .preview-btn': 'previewModule',
			'click .confirm-publish-btn': 'confirmPublish',
			'click .publish-btn': 'publishModule',
			'click .new-btn': 'createCourse',
			'click .save-create-btn': 'saveCreate',
			'click .save-edit-btn': 'saveEdit'
		},
		startQuery: function(){
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/special-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						view.renderResults(data);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		countChars: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var maxLen = $(target).attr("maxlength");
			if(maxLen){
				var curLen = $(target).val().length;
				var labelNode = target.siblings().find(".count-label");
				labelNode.text(curLen);
			}else{
				//do nothing
			}
		},
		saveSpecial: function(){
			var form = this.$el.find(".special-form");
			var hint = form.find(".special-hint-block");
			var title = form.find("input[name='title']").val();
			var description = form.find("input[name='description']").val();
			if(title == ""){
				hint.text("微专题名称不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			if(description == ""){
				hint.text("微专题介绍不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			var view = this;
			var formValues = $(".h-special-view .special-form").serialize();
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				type: 'post',
				url: '../static/js/src/data/special-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						//保存成功，不提示
					} else {
						hint.text("保存失败，请稍后重试");
						setTimeout(function(){
							hint.text("");
						}, 2000);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		validateOrder: function(){
			var flag = true;
			this.$el.find("table input.order-input").each(function(idx){
				var val = $(this).val();
				if(val == "" || !isInteger(val)){
					flag = false;
				}
			});
			return flag;
		},
		refreshOrder: function(){
			//return if no content present
			if(this.$el.find("table .order-input").length == 0){
				return;
			}
			//validation
			var hint = this.$el.find(".list-hint-block");
			if(!this.validateOrder()){
				hint.text("顺序不能为空且必须为数字！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return;
			}
			var view = this;
			var orderArr = [];
			this.$el.find("table input.order-input").each(function(idx){
				orderArr.push({
					id: $(this).data("course-id"),
					order: $(this).val()
				});
			});
			orderArr = JSON.stringify(orderArr);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/special-list.json',
				data: {
					orderArr: orderArr
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						view.startQuery();
					}else{
						hint.text("保存失败，请稍后重试！");
						setTimeout(function(){
							hint.text("");
						}, 2000);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		previewImage: function(e){
			var target = $(e.currentTarget);
			var imageUrl = target.data("image-url");
			var modal = $("#preview-modal");
			modal.find(".preview-content").html('<img src="'+imageUrl+'" alt="图片预览"/>');
			modal.modal("show");
		},
		confirmDelete: function(e){
			$("#delete-modal").find(".confirm-delete-btn").data("course-id", $(e.currentTarget).data("course-id"));
			$("#delete-modal").modal("show");
		},
		deleteCourse: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var courseId = target.data("course-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/special-list.json',
				data: {
					id: courseId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						$("#delete-modal").modal("hide");
						view.startQuery();
					}else{
						$("#delete-modal").modal("hide");
						alertModal(data.msg);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		previewModule: function(){
			var panel = this.$el.find(".preview-panel");
			var tpl = this.previewTemplate;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/preview-special.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						panel.html(tpl(data));
					} else {
						panel.html("哎呀，预览出错了，请稍后重试");
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		confirmPublish: function(){
			$("#publish-modal").modal("show");
		},
		publishModule: function(){
			$.ajax({
				loader: true,
				url: '../static/js/src/data/preview-special.json',
				dataType: "json",
				success: function (data, status) {
					$("#publish-modal").modal("hide");
					if (data.statusCode) {
						alertModal("发布成功");
					}else {
						alertModal("发布失败，请稍后重试");
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		createCourse: function(){
			var modal = $("#create-modal");
			var view = this;
			modal.find(".create-content").html(view.detailTemplate({}));
			//init upload button
			modal.find('.fileupload-input').fileupload({
				url: "../static/js/src/data/upload.json",
				dataType: 'json',
				add: function (e, data) {
					var goUpload = true;
					var uploadFile = data.files[0];
					//file type validation
					if (!(/(\.|\/)(jpeg|jpg|gif|png)$/i).test(uploadFile.name)) {
						modal.find(".hint-block").text("仅支持图片格式文件，请重新选择");
						setTimeout(function () {
							modal.find(".hint-block").text("");
						}, 2000);
						goUpload = false;
					}
					if (goUpload == true) {
						data.submit();
					}
				},
				done: function (e, data) {
					if(data.result){
						modal.find("input[name='pic_url']").val(data.result.pic_url);
					}
				},
				fail: function (e, data) {
					modal.find(".hint-block").html("上传失败，请稍后重试");
				}
			}).prop('disabled', !$.support.fileInput);
			modal.modal("show");
		},
		saveCreate: function(){
			var form = $("#create-modal").find(".detail-form");
			if(!this.validateDetail(form)){
				return false;
			}
			var formValues = form.serialize();
			var param = qStrToJson(formValues);
			var view = this;
			$.ajax({
				loader: true,
				type: 'post',
				url: '../static/js/src/data/special-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
						$("#edit-modal").modal("hide");
						view.startQuery();
					} else if(data.statusCode == 0) {
						form.find(".hint-block").text(data.msg);
						setTimeout(function () {
							form.find(".hint-block").text("");
						}, 2000);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		editCourse: function(e){
			var courseId = $(e.currentTarget).data("course-id");
			var modal = $("#edit-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/special-detail.json',
				data: {
					id: courseId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						modal.find(".edit-content").html(view.detailTemplate(data));
						//init upload button
						modal.find('.fileupload-input').fileupload({
							url: "../static/js/src/data/upload.json",
							dataType: 'json',
							add: function (e, data) {
								var goUpload = true;
								var uploadFile = data.files[0];
								//file type validation
								if (!(/(\.|\/)(jpeg|jpg|gif|png)$/i).test(uploadFile.name)) {
									modal.find(".hint-block").text("仅支持图片格式文件，请重新选择");
									setTimeout(function () {
										modal.find(".hint-block").text("");
									}, 2000);
									goUpload = false;
								}
								if (goUpload == true) {
									data.submit();
								}
							},
							done: function (e, data) {
								if(data.result){
									modal.find("[name='pic_url']").val(data.result.pic_url);
								}
							},
							fail: function (e, data) {
								modal.find(".hint-block").html("上传失败，请稍后重试");
							}
						}).prop('disabled', !$.support.fileInput);
						modal.modal("show");
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		saveEdit: function(){
			var form = $("#edit-modal").find(".detail-form");
			if(!this.validateDetail(form)){
				return false;
			}
			var formValues = form.serialize();
			var param = qStrToJson(formValues);
			var view = this;
			$.ajax({
				loader: true,
				type: 'post',
				url: '../static/js/src/data/special-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
						$("#edit-modal").modal("hide");
						view.startQuery();
					} else if(data.statusCode == 0) {
						form.find(".hint-block").text(data.msg);
						setTimeout(function () {
							form.find(".hint-block").text("");
						}, 2000);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		validateDetail: function(form){
			var flag = true;
			var hint = form.find(".hint-block");
			var courseid = form.find("input[name='cid']").val();
			var title = form.find("input[name='title']").val();
			var picurl = form.find("input[name='pic_url']").val();
			if(courseid == ""){
				hint.text("课程id不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(title == ""){
				hint.text("课程名称不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(picurl == ""){
				hint.text("课程图片不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			return flag;
		},
		initialize: function (opt) {
			this.render();
			this.startQuery();
		},
		render: function() {
			this.$el.html(this.template);
		},
		renderResults: function(data) {
			this.$el.find(".h-special-view .special-content").html(this.listTemplate(data));
		}
	});
	return view;
});