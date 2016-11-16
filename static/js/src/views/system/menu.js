/**
 * Created by dupeng on 15-7-28.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/system/menu.tpl',
	'text!src/tpl/system/menu-list.tpl',
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
			'click .new-btn': 'newMenu',
			'click .delete-link': 'confirmDelete',
			'click .confirm-btn': 'deleteMenu',
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
			var formValues = $(".menu-view .q-form").serialize() + "&recordsPerPage=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/menu-list.json',
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
			this.refreshList();
		},
		newMenu: function(){
			location.href = "#menu/newmenu";
		},
		confirmDelete: function(e){
			$("#delete-modal").find(".confirm-btn").attr("data-menu-id", $(e.currentTarget).attr("data-menu-id"));
			$("#delete-modal").modal("show");
		},
		deleteMenu: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var menuId = target.attr("data-menu-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/menu-list.json',
				data: {
					id: menuId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						$("#delete-modal").modal("hide");
						view.startQuery();
					}else{
						$("#delete-modal").modal("hide");
						$(".hint-block").text(data.msg);
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
			var view = this;
			$.ajax({
				url: '../static/js/src/data/allmenu-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var optStr = "";
						_.each(data.list, function(item, idx){
							optStr += '<option value="' + item.id + '">' + item.name + '</option>';
						});
						view.$el.find('select[name="parent_id"]').append(optStr);
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
			this.$el.find(".menu-view .list-content").html(this.listTemplate(data));
			this.$el.find(".menu-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});