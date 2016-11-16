/**
 * Created by dupeng on 15-9-17.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/courseinfo/byschool.tpl',
	'text!src/tpl/courseinfo/byschool-list.tpl',
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
			'click .export-btn': 'exportData',
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
				url: '../static/js/src/data/course-byschool-list.json',
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
		exportData: function () {
			var exportLink = "//www.baidu.com";
			window.open(exportLink);
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
			this.$el.find(".courseinfo-byschool-view .list-content").html(this.listTemplate(data));
			this.$el.find(".courseinfo-byschool-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});