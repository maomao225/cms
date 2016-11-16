/**
 * Created by dupeng on 15-8-12.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/homepage/partner.tpl',
	'text!src/tpl/homepage/partner-list.tpl',
	'text!src/tpl/homepage/partner-detail.tpl',
	'text!src/tpl/homepage/preview-partner.tpl',
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
			'click .order-btn': 'refreshOrder',
			'click .preview-link': 'previewImage',
			'click .edit-link': 'editPartner',
			'click .delete-link': 'confirmDelete',
			'click .confirm-delete-btn': 'deletePartner',
			'click .preview-btn': 'previewModule',
			'click .confirm-publish-btn': 'confirmPublish',
			'click .publish-btn': 'publishModule',
			'click .new-btn': 'createPartner',
			'click .save-create-btn': 'saveCreate',
			'click .save-edit-btn': 'saveEdit'
		},
		startQuery: function(){
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/partner-list.json',
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
			if(this.$el.find("table input.order-input").length == 0){
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
					id: $(this).data("partner-id"),
					order: $(this).val()
				});
			});
			orderArr = JSON.stringify(orderArr);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/partner-list.json',
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
			$("#delete-modal").find(".confirm-delete-btn").data("partner-id", $(e.currentTarget).data("partner-id"));
			$("#delete-modal").modal("show");
		},
		deletePartner: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var partnerId = target.data("partner-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/partner-list.json',
				data: {
					id: partnerId
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
				url: '../static/js/src/data/preview-partner.json',
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
				url: '../static/js/src/data/preview-partner.json',
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
		createPartner: function(){
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
			//url参数判断是否添加了http开头，如未添加则补全
			param.url = (/^[http]/i).test(param.url) ? param.url : '//'+param.url;
			var view = this;
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/partner-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
						$("#create-modal").modal("hide");
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
		editPartner: function(e){
			var partnerId = $(e.currentTarget).data("partner-id");
			var modal = $("#edit-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/partner-detail.json',
				data: {
					id: partnerId
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
			//url参数判断是否添加了http开头，如未添加则补全
			param.url = (/^[http]/i).test(param.url) ? param.url : '//'+param.url;
			var view = this;
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/partner-list.json',
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
			var partnername = form.find("input[name='name']").val();
			var partnerurl = form.find("input[name='url']").val();
			var picurl = form.find("input[name='pic_url']").val();
			if(partnername == ""){
				hint.text("合作伙伴名称不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(picurl == ""){
				hint.text("合作伙伴图片不能为空！");
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
			this.$el.find(".h-partner-view .list-content").html(this.listTemplate(data));
		}
	});
	return view;
});