/**
 * Created by dupeng on 15-8-21.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/about/recruitment.tpl',
	'text!src/tpl/about/recruitment-list.tpl',
	'text!src/tpl/about/pagination.tpl',
	'text!src/tpl/about/recruitment-detail.tpl',
	'text!src/tpl/about/preview-recruitment.tpl',
	'src/util',
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
			'click .delete-link': 'confirmDelete',
			'click .confirm-delete-btn': 'deleteRecruitment',
			'click .preview-btn': 'previewModule',
			'click .confirm-publish-btn': 'confirmPublish',
			'click .publish-btn': 'publishModule',
			'click .toggle-status-link': 'toggleHide',
			'click .edit-link': 'editRecruitment',
			'click .save-edit-btn': 'saveEdit',
			'click .new-btn': 'addRecruitment',
			'click .save-create-btn': 'saveAdd',
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
				url: '../static/js/src/data/recruitment-list.json',
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
					id: $(this).data("recruitment-id"),
					order: $(this).val()
				});
			});
			orderArr = JSON.stringify(orderArr);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/recruitment-list.json',
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
		toggleHide: function(e){
			var target = $(e.currentTarget);
			var hideStatus = target.data("active-status") == 1;
			var recruitmentId = target.data("recruitment-id");
			var statusNode = $("tr[data-recruitment-id="+ recruitmentId +"] .hide-status");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/recruitment-list.json',
				data: {
					recruitmentId: recruitmentId,
					activeStatus: hideStatus ? 0 : 1
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						target.data("active-status", hideStatus ? 0 : 1)
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
		confirmDelete: function(e){
			$("#delete-modal").find(".confirm-delete-btn").data("recruitment-id", $(e.currentTarget).data("recruitment-id"));
			$("#delete-modal").modal("show");
		},
		deleteRecruitment: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var recruitmentId = target.data("recruitment-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/recruitment-list.json',
				data: {
					id: recruitmentId
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
				url: '../static/js/src/data/preview-recruitment.json',
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
				url: '../static/js/src/data/preview-recruitment.json',
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
		addRecruitment: function(){
			var modal = $("#create-modal");
			var view = this;
			modal.find(".create-content").html(view.detailTemplate({}));
			modal.modal("show");
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
				url: '../static/js/src/data/recruitment-list.json',
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
		editRecruitment: function(e){
			var recruitmentId = $(e.currentTarget).data("recruitment-id");
			var modal = $("#edit-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/recruitment-detail.json',
				data: {
					id: recruitmentId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						modal.find(".edit-content").html(view.detailTemplate(data));
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
				url: '../static/js/src/data/recruitment-list.json',
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
			var recruitmentname = form.find("input[name='name']").val();
			var recruitmentintro = form.find("input[name='introduction']").val();
			if(recruitmentname == ""){
				hint.text("职位名称不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(recruitmentintro == ""){
				hint.text("职位介绍不能为空！");
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
			this.$el.find(".about-recruitment-view .list-content").html(this.listTemplate(data));
			this.$el.find(".about-recruitment-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});