/**
 * Created by dupeng on 15-8-24.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/mobile/banner.tpl',
	'text!src/tpl/mobile/banner-list.tpl',
	'text!src/tpl/mobile/banner-detail.tpl',
	'text!src/tpl/mobile/preview-banner.tpl',
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
			'change .belong-select': 'startQuery',
			'click .order-btn': 'refreshOrder',
			'click .preview-link': 'previewImage',
			'click .preview-btn': 'previewModule',
			'click .confirm-publish-btn': 'confirmPublish',
			'click .publish-btn': 'publishModule',
			'click .delete-link': 'confirmDelete',
			'click .confirm-delete-btn': 'deleteBanner',
			'click .toggle-status-link': 'toggleHide',
			'click .new-btn': 'createBanner',
			'click .save-create-btn': 'saveCreate',
			'click .edit-link': 'editBanner',
			'click .save-edit-btn': 'saveEdit'
		},
		startQuery: function() {
			var view = this;
			var formValues = $(".m-banner-view .q-form").serialize();
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/m-banner-list.json',
				data: param,
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
			this.$el.find("input.order-input").each(function(idx){
				var val = $(this).val();
				if(val == "" || !isInteger(val)){
					flag = false;
				}
			});
			return flag;
		},
		refreshOrder: function(){
			var hint = this.$el.find(".q-form .hint-block");
			if(!this.validateOrder()){
				hint.text("Banner顺序不能为空且必须为数字！");
				setTimeout(function(){
					hint.text("");
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
					id: $(this).data("banner-id"),
					order: $(this).val()
				});
			});
			orderArr = JSON.stringify(orderArr);
			$.ajax({
				loader: true,
                type: "post",
				url: '../static/js/src/data/m-banner-list.json',
				data: {
					orderArr: orderArr
				},
				dataType: "json",
				success: function (data, status) {
					if (!data.statusCode) {
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
			modal.find(".preview-content").html('<img src="'+imageUrl+'" alt="Banner预览"/>');
			modal.modal("show");
		},
		confirmDelete: function(e){
			$("#delete-modal").find(".confirm-delete-btn").data("banner-id", $(e.currentTarget).data("banner-id"));
			$("#delete-modal").modal("show");
		},
		deleteBanner: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var bannerId = target.data("banner-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/m-banner-list.json',
				data: {
					id: bannerId
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
		toggleHide: function(e){
			var target = $(e.currentTarget);
			var hideStatus = target.data("active-status") == 1;
			var bannerId = target.data("banner-id");
			var statusNode = $("tr[data-banner-id="+ bannerId +"] .hide-status");
			var hint = this.$el.find(".q-form .hint-block");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/m-banner-list.json',
				data: {
					id: bannerId,
					is_active: hideStatus ? 0 : 1
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						target.data("active-status", hideStatus ? 0 : 1)
						target.text(hideStatus ? "显示" : "隐藏");
						statusNode.text(hideStatus ? "否" : "是");
					}else{
						hint.text("操作失败，请稍后重试！");
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
		previewModule: function(){
			var currentPlat = this.$el.find('select[name="belong"]').val();
			var hint = this.$el.find(".q-form .hint-block");
			if(currentPlat == null || currentPlat ==""){
				hint.text("请先选择一个所属终端再进行预览");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return;
			}
			var panel = this.$el.find(".preview-panel");
			var tpl = this.previewTemplate;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/preview-m-banner.json',
				data: {
					belong: currentPlat
				},
				dataType: "json",
				success: function (data, status) {
					if(currentPlat == "tv"){
						_.each(data.list, function(banner, idx){
							banner.image = banner.image_big;
						});
					}
					if (data.statusCode) {
						panel.html(tpl(data));
						panel.find(".carousel").carousel({'animate': 'move'});
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		confirmPublish: function(){
			var currentPlat = this.$el.find('select[name="belong"]').val();
			var hint = this.$el.find(".q-form .hint-block");
			if(currentPlat == null || currentPlat ==""){
				hint.text("请先选择一个所属终端再进行发布");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return;
			}
			var modal = $("#publish-modal");
			modal.find(".belong").text(this.$el.find('select[name="belong"] option:selected').html());
			modal.modal("show");
		},
		publishModule: function(){
			var currentPlat = this.$el.find('select[name="belong"]').val();
			var hint = this.$el.find(".q-form .hint-block");
			$.ajax({
				loader: true,
				data: {
					belong: currentPlat
				},
				url: '../static/js/src/data/preview-m-banner.json',
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
					$("#publish-modal").modal("hide");
				}
			});
		},
		createBanner: function(){
			var modal = $("#create-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/banner-q-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						modal.find(".create-content").html(view.detailTemplate(data));
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
									var picurl = (/^(https:|http:)/i).test(data.result.pic_url) ? data.result.pic_url : "http://"+data.result.pic_url;
									$(this).parents(".form-group").find('input.fileinput').val(picurl);
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
                type: "post",
				url: '../static/js/src/data/m-banner-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
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
			var bannerId = $(e.currentTarget).data("banner-id");
			var modal = $("#edit-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/m-banner-detail.json',
				data: {
					bannerId: bannerId
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
			var view = this;
			$.ajax({
				loader: true,
                type: "post",
				url: '../static/js/src/data/m-banner-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
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
			var bannername = form.find("input[name='name']").val();
			var introduction = form.find("input[name='introduction']").val();
			var bannerimage = form.find("input[name='image']").val();
			var bannerurl = form.find("input[name='loca']").val();
			if(bannername == ""){
				hint.text("Banner名称不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(introduction == ""){
				hint.text("Banner介绍不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(bannerimage == ""){
				hint.text("Banner图片不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(bannerurl == ""){
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
			var view = this;
			$.ajax({
				url: '../static/js/src/data/banner-q-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var optStr1 = "",
							optStr2 = "",
							optStr3 = "";
						_.each(data.btype_list, function(item, idx){
							optStr1 += '<option value="' + item.id + '">' + item.name + '</option>';
						});
						_.each(data.belong_list, function(item, idx){
							optStr2 += '<option value="' + item.id + '">' + item.name + '</option>';
						});
						_.each(data.channel_list, function(item, idx){
							optStr3 += '<option value="' + item.id + '">' + item.name + '</option>';
						});
						view.$el.find('select[name="btype"]').append(optStr1);
						view.$el.find('select[name="belong"]').append(optStr2);
						view.$el.find('select[name="channel"]').append(optStr3);
						view.startQuery();
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		render: function() {
			this.$el.html(this.template);
		},
		renderResults: function(data) {
			this.$el.find(".m-banner-view .list-content").html(this.listTemplate(data));
		}
	});
	return view;
});