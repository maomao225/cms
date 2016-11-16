/**
 * Created by dupeng on 15-5-28.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/system/admin.tpl',
	'text!src/tpl/system/admin-list.tpl',
	'text!src/tpl/system/pagination.tpl',
	'src/util'
], function ($, Backbone, _, tpl, listTpl, pageTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		pageTemplate: _.template(pageTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .new-btn': 'newUser',
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
			var formValues = $(".admin-view .q-form").serialize() + "&recordsPerPage=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/admin-list.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (!data.statusCode) {
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
			var email = this.$el.find("input[name='email']").val();
			var mobile = this.$el.find("input[name='phone']").val();
			if(email != "" && !isMobile(email)){
				$(".hint-block").text("请输入正确的邮箱地址！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(mobile != "" && !isMobile(mobile)){
				$(".hint-block").text("请输入正确的手机号码！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			this.refreshList();
		},
		newUser: function(){
			location.href = "#admin/newuser";
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
				url: '../static/js/src/data/role-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var optStr = "";
						_.each(data.list, function(role, idx){
							optStr += '<option value="' + role.id + '">' + role.name + '</option>';
						});
						view.$el.find('select[name="role"]').append(optStr);
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
			this.$el.find(".admin-view .list-content").html(this.listTemplate(data));
			this.$el.find(".admin-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});