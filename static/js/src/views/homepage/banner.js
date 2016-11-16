/**
 * Created by dupeng on 15-7-3.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/homepage/banner.tpl',
	'text!src/tpl/homepage/banner-list.tpl',
	'text!src/tpl/homepage/banner-detail.tpl',
	'text!src/tpl/homepage/preview-banner.tpl',
	'src/util',
	'carousel',
	'fileupload'
], function ($, Backbone, _, bootstrap, tpl, listTpl, detailTpl, previewTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		detailTemplate: _.template(detailTpl),
		previewTemplate: _.template(previewTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .order-btn': 'saveOrder',
			'click .preview-link': 'previewImage',
			'click .preview-btn': 'previewModule',
			'click .publish-btn': 'publishModule',
			'click .toggle-status-link': 'toggleHide',
			'click .new-btn': 'createBanner',
			'click .save-create-btn': 'saveCreate',
			'click .edit-link': 'editBanner',
			'click .save-edit-btn': 'saveEdit'
		},
		startQuery: function() {
			var view = this;
			var formValues = $(".h-banner-view .q-form").serialize();
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/banner-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (!data.statusCode) {
						view.renderResults(data);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		validateOrder: function(){
			var flag = true;
			this.$el.find("input.order-input").each(function(idx){
				var val = $(this).val();
				if(val == "" || !isInteger(val)){
					flag = false;
				}
			});
			return flag;
		},
		saveOrder: function(){
			if(!this.validateOrder()){
				$(".hint-block").text("Banner顺序不能为空且必须为数字！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return;
			}
			if(this.$el.find("input.order-input").length == 0){
				return;
			}
			var view = this;
			var orderArr = [];
			this.$el.find("input.order-input").each(function(idx){
				orderArr.push({
					bannerId: $(this).attr("bannerId"),
					bannerOrder: $(this).val()
				});
			});
			orderArr = JSON.stringify(orderArr);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/banner-list.json',
				data: {
					orderArr: orderArr
				},
				dataType: "json",
				success: function (data, status) {
					if (!data.statusCode) {
						view.startQuery();
					}else{
						$(".hint-block").text("保存失败，请稍后重试！");
						setTimeout(function(){
							$(".hint-block").text("");
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
			var imageUrl = target.attr("data-image-url");
			var modal = $("#preview-modal");
			modal.find(".preview-content").html('<img src="'+imageUrl+'" alt="Banner预览"/>');
			modal.modal("show");
		},
		toggleHide: function(e){
			var target = $(e.currentTarget);
			var hideStatus = target.attr("data-active-status") == 1;
			var bannerId = target.attr("data-banner-id");
			var statusNode = $("tr[data-banner-id="+ bannerId +"] .hide-status");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/banner-list.json',
				data: {
					bannerId: bannerId,
					activeStatus: hideStatus ? 0 : 1
				},
				dataType: "json",
				success: function (data, status) {
					if (!data.statusCode) {
						target.attr("data-active-status", hideStatus ? 0 : 1)
						target.text(hideStatus ? "显示" : "隐藏");
						statusNode.text(hideStatus ? "否" : "是");
					}else{
						$(".hint-block").text("操作失败，请稍后重试！");
						setTimeout(function(){
							$(".hint-block").text("");
						}, 2000);
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
				url: '../static/js/src/data/preview-banner.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						panel.html(tpl(data));
						panel.find(".carousel").carousel();
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		publishModule: function(){
			var hint = this.$el.find(".hint-block");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/preview-banner.json',
				dataType: "json",
				success: function (data, status) {
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
		createBanner: function(){
			var modal = $("#create-modal");
			modal.find(".create-content").html(this.detailTemplate({}));
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
						$(this).parents(".form-group").find('input.fileinput').val(data.result.pic_url);
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
				url: '../static/js/src/data/banner-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (!data.statusCode) {
						$("#create-modal").modal("hide");
						view.startQuery();
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		editBanner: function(e){
			var bannerId = $(e.currentTarget).attr("data-banner-id");
			var modal = $("#edit-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/banner-detail.json',
				data: {
					bannerId: bannerId
				},
				dataType: "json",
				success: function (data, status) {
					if (!data.statusCode) {
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
									$(this).parents(".form-group").find('input.fileinput').val(data.result.pic_url);
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
				url: '../static/js/src/data/banner-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (!data.statusCode) {
						$("#edit-modal").modal("hide");
						view.startQuery();
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
			var original = form.find("input[name='original']").val();
			var page_url = form.find("input[name='page_url']").val();
			if(original == ""){
				hint.text("Banner大图URL不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(page_url == ""){
				hint.text("链接地址不能为空！");
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
		},
		render: function() {
			this.$el.html(this.template);
		},
		renderResults: function(data) {
			this.$el.find(".h-banner-view .list-content").html(this.listTemplate(data));
		}
	});
	return view;
});