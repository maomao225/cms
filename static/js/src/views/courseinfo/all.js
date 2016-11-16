/**
 * Created by dupeng on 15-9-14.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/courseinfo/all.tpl',
	'text!src/tpl/courseinfo/all-list.tpl',
	'text!src/tpl/courseinfo/pagination.tpl',
	'bootstrap'
], function ($, Backbone, _, tpl, listTpl, pageTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		pageTemplate: _.template(pageTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .scroll-link': 'scrollToLink',
			'click .export-btn': 'exportData',
			'click .detail-link': 'showDetail',
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
			$.ajax({
				loader: true,
				url: '../static/js/src/data/course-all-list.json',
				data: {
					recordsPerPage: view.pageInfo.recordsPerPage,
					page: view.pageInfo.page
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
		showDetail: function (e) {
			var target = $(e.currentTarget);
			var desc = target.data("desc");
			var descStr = "";
			_.each(desc, function(teacher, idx){
				descStr += "<div class='form-group'><div class='col-xs-2'>老师姓名：</div><div class='col-xs-4'>" + teacher.name + "</div></div>";
				descStr += "<div class='form-group'><div class='col-xs-2'>职称：</div><div class='col-xs-4'>" + teacher.position + "</div></div>";
				descStr += "<div class='form-group'><div class='col-xs-2'>所属大学：</div><div class='col-xs-4'>" + teacher.college + "</div></div>";
			});
			var modal = $("#detail-modal");
			modal.find(".detail-content").html(descStr);
			modal.modal("show");
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
			view.startQuery();
		},
		render: function () {
			this.$el.html(this.template);
		},
		renderResults: function (data) {
			this.$el.find(".courseinfo-all-view .list-content").html(this.listTemplate(data));
			this.$el.find(".courseinfo-all-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});