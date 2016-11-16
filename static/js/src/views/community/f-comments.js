/**
 * Created by dupeng on 15-8-25.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/community/f-comments.tpl',
	'text!src/tpl/community/f-comments-list.tpl',
	'text!src/tpl/community/pagination.tpl',
	'src/util',
	'datepicker_locale'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		pageTemplate: _.template(pageTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .delete-link': 'confirmDelete',
			'click .confirm-delete-btn': 'deleteComment',
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
			var formValues = $(".f-comments-view .q-form").serialize() + "&recordsPerPage=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/f-comments-list.json',
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
			var postId = this.$el.find("input[name='topic_id']").val();
			var commentId = this.$el.find("input[name='comment_id']").val();
			var keyWords = this.$el.find("input[name='keyword']").val();
			var hint = this.$el.find(".q-form .hint-block");
			if(postId != "" && !isInteger(postId)){
				hint.text("请输入正确的帖子ID！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			if(commentId != "" && !isInteger(commentId)){
				hint.text("请输入正确的评论ID！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			if(keyWords != "" && !checkStr(keyWords)){
				hint.text("关键字只能输入空格或字符！");
				setTimeout(function(){
					hint.text("");
				}, 2000);
				return false;
			}
			this.pageInfo.page = 1;
			this.refreshList();
		},
		confirmDelete: function(e){
			$("#delete-modal").find(".confirm-delete-btn").data("comment-id", $(e.currentTarget).data("comment-id"));
			$("#delete-modal").modal("show");
		},
		deleteComment: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var commentId = target.data("comment-id");
			var hint = this.$el.find(".q-form .hint-block");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/f-comments-list.json',
				data: {
					id: commentId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						$("#delete-modal").modal("hide");
						view.startQuery();
					}else{
						$("#delete-modal").modal("hide");
						hint.text("删除失败，请稍后重试！");
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
		changePage: function(e){
			this.pageInfo.recordsPerPage = e.currentTarget.value;
			this.refreshList();
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
				url: '../static/js/src/data/plate-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var optStr = "";
						_.each(data.plate_list, function(item, idx){
							optStr += '<option value="' + item.id + '">' + item.name + '</option>';
						});
						view.$el.find('select[name="plate_id"]').append(optStr);
						view.startQuery();
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
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
			}, 500);
		},
		render: function() {
			this.$el.html(this.template);
		},
		renderResults: function(data) {
			this.$el.find(".f-comments-view .list-content").html(this.listTemplate(data));
			this.$el.find(".f-comments-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});