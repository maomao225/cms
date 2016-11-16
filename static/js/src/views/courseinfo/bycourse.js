/**
 * Created by dupeng on 15-9-16.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/courseinfo/bycourse.tpl',
	'text!src/tpl/courseinfo/bycourse-list.tpl',
	'text!src/tpl/courseinfo/pagination.tpl',
	'text!src/tpl/courseinfo/bycourse-detail.tpl',
	'src/util',
	'bootstrap',
	'datepicker_locale'
], function ($, Backbone, _, tpl, listTpl, pageTpl, detailTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		pageTemplate: _.template(pageTpl),
		detailTemplate: _.template(detailTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .scroll-link': 'scrollToLink',
			'click .export-btn': 'exportData',
			'click .edit-link': 'editRemark',
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
		startQuery: function () {
			this.pageInfo.page = 1;
			this.refreshList();
		},
		refreshList: function () {
			var view = this;
			var formValues = $(".courseinfo-bycourse-view .q-form").serialize() + "&recordsPerPage=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/course-bycourse-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
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
		scrollToLink: function (e) {
			var target = $(e.currentTarget);
			var container = this.$el.find(".fixed-container");
			var targetNode = container.find("[data-scroll-mark='" + target.data("scroll-target") + "']");
			var offset = container.scrollLeft() + targetNode.position().left;
			container.scrollLeft(offset);
			//highlight link
			target.siblings().removeClass("active");
			target.addClass("active");
		},
		exportData: function () {
			var exportLink = "//www.baidu.com";
			window.open(exportLink);
		},
		editRemark: function (e) {
			var courseId = $(e.currentTarget).data("course-id");
			var modal = $("#detail-modal");
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/course-bycourse-detail.json',
				data: {
					course_id: courseId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
						modal.find(".detail-content").html(view.detailTemplate(data));
						modal.modal("show");
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		saveEdit: function(){
			var form = $("#detail-modal").find(".detail-form");
			var hint = form.find(".hint-block");
			var remark = form.find("input[name='remark']").val();
			if(remark == ""){
				hint.text("备注内容不能为空！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return;
			}
			var formValues = form.serialize();
			var param = qStrToJson(formValues);
			var view = this;
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/course-bycourse-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
						$("#detail-modal").modal("hide");
						view.startQuery();
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		changePage: function (e) {
			this.pageInfo.recordsPerPage = e.currentTarget.value;
			this.startQuery();
		},
		firstPage: function () {
			var view = this;
			if (view.pageInfo.page == 1)return;
			view.pageInfo.page = 1;
			view.refreshList();
		},
		prevPage: function () {
			var view = this;
			if (view.pageInfo.page != 1) {
				view.pageInfo.page--;
				view.refreshList();
			}
		},
		nextPage: function () {
			var view = this;
			if (view.pageInfo.page < view.pageInfo.totalPage) {
				view.pageInfo.page++;
				view.refreshList();
			}
		},
		lastPage: function () {
			var view = this;
			if (view.pageInfo.page == view.pageInfo.totalPage)return;
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
		render: function () {
			this.$el.html(this.template);
		},
		renderResults: function (data) {
			this.$el.find(".courseinfo-bycourse-view .list-content").html(this.listTemplate(data));
			this.$el.find(".courseinfo-bycourse-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});