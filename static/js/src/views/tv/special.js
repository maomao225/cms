/**
 * Created by dupeng on 15-8-25.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/tv/special.tpl',
	'text!src/tpl/tv/special-list.tpl',
	'text!src/tpl/tv/special-detail.tpl',
	'src/util',
	'fileupload'
], function ($, Backbone, _, bootstrap, tpl, listTpl, detailTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		detailTemplate: _.template(detailTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .order-btn': 'refreshOrder',
			'click .preview-link': 'previewImage',
			'click .delete-link': 'confirmDelete',
			'click .confirm-delete-btn': 'deleteSpecial',
			'click .new-btn': 'addSpecial',
			'click .save-create-btn': 'saveAdd',
			'click .edit-link': 'editSpecial',
			'click .save-edit-btn': 'saveEdit'
		},
		startQuery: function(){
			var view = this;
			var formValues = $(".tv-special-view .q-form").serialize();
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/tv-special-list.json',
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
					id: $(this).data("special-id"),
					order: $(this).val()
				});
			});
			orderArr = JSON.stringify(orderArr);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/tv-tv-special-list.json',
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
			$("#delete-modal").find(".confirm-delete-btn").data("special-id", $(e.currentTarget).data("special-id"));
			$("#delete-modal").modal("show");
		},
		deleteSpecial: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var specialId = target.data("special-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/tv-special-list.json',
				data: {
					id: specialId
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
		addSpecial: function(){
			var modal = $("#create-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/tv-group-list.json',
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
		saveAdd: function(){
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
				url: '../static/js/src/data/tv-special-list.json',
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
		editSpecial: function(e){
			var specialId = $(e.currentTarget).data("special-id");
			var modal = $("#edit-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/tv-special-detail.json',
				data: {
					id: specialId
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
				url: '../static/js/src/data/tv-special-list.json',
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
			var specialname = form.find("input[name='name']").val();
			var specialslug = form.find("input[name='slug']").val();
			var picurl = form.find("input[name='cover_image']").val();
			if(specialname == ""){
				hint.text("专题名称不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(specialslug == ""){
				hint.text("专题介绍不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(picurl == ""){
				hint.text("专题图片不能为空！");
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
				url: '../static/js/src/data/tv-group-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var optStr = "";
						_.each(data.group_list, function(item, idx){
							optStr += '<option value="' + item.id + '">' + item.slug + '</option>';
						});
						view.$el.find('.q-form select[name="group_id"]').append(optStr);
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
			this.$el.find(".tv-special-view .list-content").html(this.listTemplate(data));
		}
	});
	return view;
});