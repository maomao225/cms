/**
 * Created by dupeng on 15-7-29.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/system/role.tpl',
	'text!src/tpl/system/role-list.tpl',
	'text!src/tpl/system/pagination.tpl',
	'src/util'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		pageTemplate: _.template(pageTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .new-btn': 'newRole',
			'click .delete-link': 'confirmDelete',
			'click .confirm-btn': 'deleteRole',
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
		refreshList: function() {
			var view = this;
			var formValues = $(".role-view .q-form").serialize() + "&recordsPerPage=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
			formValues = decodeURIComponent(formValues);
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/role-lists.json',
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
		startQuery: function(){
			this.pageInfo.page = 1;
			this.refreshList();
		},
		newRole: function(){
			location.href = "#role/newrole";
		},
		confirmDelete: function(e){
			$("#delete-modal").find(".confirm-btn").attr("data-role-id", $(e.currentTarget).attr("data-role-id"));
			$("#delete-modal").modal("show");
		},
		deleteRole: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var roleId = target.attr("data-role-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/role-list.json',
				data: {
					id: roleId
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
			this.render();
			this.startQuery();
		},
		render: function() {
			this.$el.html(this.template);
		},
		renderResults: function(data) {
			this.$el.find(".role-view .list-content").html(this.listTemplate(data));
			this.$el.find(".role-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});