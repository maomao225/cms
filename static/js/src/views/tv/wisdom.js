/**
 * Created by dupeng on 15-8-25.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/tv/wisdom.tpl',
	'text!src/tpl/tv/wisdom-list.tpl',
	'text!src/tpl/tv/pagination.tpl',
	'text!src/tpl/tv/wisdom-detail.tpl',
	'src/util',
	'datepicker_locale'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl, detailTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		pageTemplate: _.template(pageTpl),
		detailTemplate: _.template(detailTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .order-btn': 'refreshOrder',
			'click .preview-link': 'previewWisdom',
			'click .delete-link': 'confirmDelete',
			'click .confirm-delete-btn': 'deleteWisdom',
			'click .toggle-status-link': 'toggleHide',
			'click .edit-link': 'editWisdom',
			'click .save-edit-btn': 'saveEdit',
			'click .new-btn': 'addWisdom',
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
			this.pageInfo.page = 1;
			this.refreshList();
		},
		refreshList: function(){
			var view = this;
			var formValues = $(".tv-wisdom-view .q-form").serialize() + "&recordsPerPage=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/wisdom-list.json',
				data: param,
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
					id: $(this).data("wisdom-id"),
					order: $(this).val()
				});
			});
			orderArr = JSON.stringify(orderArr);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/wisdom-list.json',
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
		previewWisdom: function(e){
			var target = $(e.currentTarget);
			var content = target.data("image-url");
			var modal = $("#preview-modal");
			modal.find(".preview-content").html(content);
			modal.modal("show");
		},
		confirmDelete: function(e){
			$("#delete-modal").find(".confirm-delete-btn").data("wisdom-id", $(e.currentTarget).data("wisdom-id"));
			$("#delete-modal").modal("show");
		},
		deleteWisdom: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var wisdomId = target.data("wisdom-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/wisdom-list.json',
				data: {
					id: wisdomId
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
			var wisdomId = target.data("wisdom-id");
			var statusNode = $("tr[data-wisdom-id="+ wisdomId +"] .hide-status");
			var hint = this.$el.find(".q-form .hint-block");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/wisdom-list.json',
				data: {
					id: wisdomId,
					enabled: hideStatus ? 0 : 1
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
		addWisdom: function(){
			var modal = $("#create-modal");
			var view = this;
			modal.find(".create-content").html(view.detailTemplate({}));
			setTimeout(function(){
				//initiate date picker and make date constrain
				var startPicker = modal.find('.start-date').datepicker({
					language:  'zh-CN',
					format: 'yyyy/mm/dd',
					autoclose: 1,
					todayHighlight: 1
				}).on('changeDate',function(e){
						endPicker.datepicker('setStartDate', e.date);
					});
				var endPicker = modal.find('.end-date').datepicker({
					language:  'zh-CN',
					format: 'yyyy/mm/dd',
					autoclose: 1,
					todayHighlight: 1
				}).on('changeDate',function(e){
						startPicker.datepicker('setEndDate', e.date);
					});
			}, 500);
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
				url: '../static/js/src/data/wisdom-list.json',
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
		editWisdom: function(e){
			var wisdomId = $(e.currentTarget).data("wisdom-id");
			var modal = $("#edit-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/wisdom-detail.json',
				data: {
					id: wisdomId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						modal.find(".edit-content").html(view.detailTemplate(data));
						setTimeout(function(){
							//initiate date picker and make date constrain
							var startPicker = modal.find('.start-date').datepicker({
								language:  'zh-CN',
								format: 'yyyy/mm/dd',
								autoclose: 1,
								todayHighlight: 1
							}).on('changeDate',function(e){
									endPicker.datepicker('setStartDate', e.date);
								});
							var endPicker = modal.find('.end-date').datepicker({
								language:  'zh-CN',
								format: 'yyyy/mm/dd',
								autoclose: 1,
								todayHighlight: 1
							}).on('changeDate',function(e){
									startPicker.datepicker('setEndDate', e.date);
								});
						}, 500);
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
				url: '../static/js/src/data/wisdom-list.json',
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
			var wisdomcotent = form.find("input[name='content']").val();
			var startdate = form.find("input[name='date_start']").val();
			var enddate = form.find("input[name='date_end']").val();
			if(wisdomcotent == ""){
				hint.text("名人名言不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(startdate == ""){
				hint.text("开始轮播时间不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				flag = false;
				return flag;
			}
			if(enddate == ""){
				hint.text("结束轮播时间不能为空不能为空！");
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
			view.refreshList();
		},
		prevPage: function(){
			var view = this;
			if(view.pageInfo.page != 1){
				view.pageInfo.page --;
				view.refreshList();
			}
		},
		nextPage: function(){
			var view = this;
			if(view.pageInfo.page < view.pageInfo.totalPage){
				view.pageInfo.page ++;
				view.refreshList();
			}
		},
		lastPage: function(){
			var view = this;
			if(view.pageInfo.page == view.pageInfo.totalPage)return;
			view.pageInfo.page = view.pageInfo.totalPage;
			view.refreshList();
		},
		initialize: function (opt) {
			var view = this;
			view.render();
			setTimeout(function(){
				//initiate date picker and make date constrain
				var startPicker = view.$el.find('.start-date').datepicker({
					language:  'zh-CN',
					format: 'yyyy/mm/dd',
					autoclose: 1,
					todayHighlight: 1
				}).on('changeDate',function(e){
						endPicker.datepicker('setStartDate', e.date);
					});
				var endPicker = view.$el.find('.end-date').datepicker({
					language:  'zh-CN',
					format: 'yyyy/mm/dd',
					autoclose: 1,
					todayHighlight: 1
				}).on('changeDate',function(e){
						startPicker.datepicker('setEndDate', e.date);
					});
				view.startQuery();
			}, 100);
		},
		render: function() {
			this.$el.html(this.template);
		},
		renderResults: function(data) {
			this.$el.find(".tv-wisdom-view .list-content").html(this.listTemplate(data));
			this.$el.find(".tv-wisdom-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});