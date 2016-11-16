/**
 * Created by dupeng on 15-8-20.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/school/schools.tpl',
	'text!src/tpl/school/schools-list.tpl',
	'text!src/tpl/school/pagination.tpl',
	'text!src/tpl/school/schools-detail.tpl',
	'text!src/tpl/school/preview-schools.tpl',
	'src/util',
	'fileupload',
	'css!//www.xuetangx.com/static/css/index.css'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl, detailTpl, previewTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		pageTemplate: _.template(pageTpl),
		detailTemplate: _.template(detailTpl),
		previewTemplate: _.template(previewTpl),
		events: {
			'click .order-btn': 'refreshOrder',
			'click .preview-link': 'previewImage',
			'click .edit-link': 'editSchools',
			'click .delete-link': 'confirmDelete',
			'click .confirm-delete-btn': 'deleteSchools',
			'click .preview-btn': 'previewModule',
			'click .confirm-publish-btn': 'confirmPublish',
			'click .publish-btn': 'publishModule',
			'click .new-btn': 'addSchools',
			'click .save-create-btn': 'saveAdd',
			'click .save-edit-btn': 'saveEdit',
			//pagination events
			'change .records-select': 'changePage',
			'click .pagination .first-page': 'firstPage',
			'click .pagination .prev-page': 'prevPage',
			'click .pagination .next-page': 'nextPage',
			'click .pagination .last-page': 'lastPage'
		},
		pageInfo: {
			page: 1,
			totalPage: 0,
			recordsPerPage: 10,
			totalRecord: 0
		},
		startQuery: function(){
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/schools-list.json',
				data: {
					page: view.pageInfo.page,
					recordsPerPage: view.pageInfo.recordsPerPage
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						view.pageInfo.totalPage = data.pages.totalPage;
						view.pageInfo.totalRecord = data.pages.totalRecord;
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
					id: $(this).data("school-id"),
					order: $(this).val()
				});
			});
			orderArr = JSON.stringify(orderArr);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/schools-list.json',
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
			$("#delete-modal").find(".confirm-delete-btn").data("schools-id", $(e.currentTarget).data("schools-id"));
			$("#delete-modal").modal("show");
		},
		deleteSchools: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var schoolsId = target.data("schools-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/schools-list.json',
				data: {
					id: schoolsId
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
				url: '../static/js/src/data/preview-schools.json',
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
				url: '../static/js/src/data/preview-schools.json',
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
		addSchools: function(){
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
		saveAdd: function(){
			var form = $("#create-modal").find(".detail-form");
			if(!this.validateDetail(form)){
				return false;
			}
			var formValues = form.serialize();
			var param = qStrToJson(formValues);
			//url参数判断是否添加了http开头，如未添加则补全
			param.link_url = (/^[http]/i).test(param.url) ? param.link_url : '//'+param.link_url;
			var view = this;
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/schools-list.json',
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
		editSchools: function(e){
			var schoolsId = $(e.currentTarget).data("schools-id");
			var modal = $("#edit-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/schools-detail.json',
				data: {
					id: schoolsId
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
			param.link_url = (/^[http]/i).test(param.url) ? param.link_url : '//'+param.link_url;
			var view = this;
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/schools-list.json',
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
			var schoolsname = form.find("input[name='name']").val();
			var picurl = form.find("input[name='cover_image']").val();
			var schoolsurl = form.find("input[name='link_url']").val();
			if(schoolsname == ""){
				hint.text("合作院校名称不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(picurl == ""){
				hint.text("院校图片不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(schoolsurl == ""){
				hint.text("院校链接不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			return flag;
		},
		changePage: function(e){
			this.pageInfo.recordsPerPage = e.currentTarget.value;
			this.startQuery();
		},
		firstPage: function(){
			var view = this;
			if(view.pageInfo.page == 1)return;
			view.pageInfo.page = 1;
			view.startQuery();
		},
		prevPage: function(){
			var view = this;
			if(view.pageInfo.page != 1){
				view.pageInfo.page --;
				view.startQuery();
			}
		},
		nextPage: function(){
			var view = this;
			if(view.pageInfo.page < view.pageInfo.totalPage){
				view.pageInfo.page ++;
				view.startQuery();
			}
		},
		lastPage: function(){
			var view = this;
			if(view.pageInfo.page == view.pageInfo.totalPage)return;
			view.pageInfo.page = view.pageInfo.totalPage;
			view.startQuery();
		},
		initialize: function (opt) {
			this.render();
			this.startQuery();
		},
		render: function() {
			this.$el.html(this.template);
		},
		renderResults: function(data) {
			this.$el.find(".partner-school-view .list-content").html(this.listTemplate(data));
			this.$el.find(".partner-school-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});