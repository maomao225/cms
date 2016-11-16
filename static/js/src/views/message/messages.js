/**
 * Created by dupeng on 15-9-1.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'bootstrap',
	'text!src/tpl/message/messages.tpl',
	'text!src/tpl/message/messages-list.tpl',
	'text!src/tpl/message/pagination.tpl',
	'src/util',
	'datepicker_locale'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl, datepicker) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		listTemplate: _.template(listTpl),
		pageTemplate: _.template(pageTpl),
		events: {
			'click .q-btn': 'startQuery',
			'click .c-btn': 'createLetter',
			'click .detail-link': 'checkDetail',
			'click .preview-link': 'previewModule',
			'click .task-status-link': 'confirmPublish',
			'click .publish-btn': 'publishModule',
			'click .withdraw-status-link': 'confirmWithdraw',
			'click .withdraw-btn': 'withdrawModule',
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
			var formValues = $(".messages-view .q-form").serialize() + "&recordsPerPage=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				url: '../static/js/src/data/messages-list.json',
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
		startQuery: function(){
			var title = this.$el.find("input[name='title']").val();
			if(title != "" && !checkStr(title)){
				$(".hint-block").text("标题不可输入特殊字符！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			this.pageInfo.page = 1;
			this.refreshList();
		},
		createLetter: function(){
			location.href = "#message/create";
		},
		checkDetail: function(e){
			$("#message-detail").show();
			var target = $(e.currentTarget);
			var msgId = target.data("message-id");
			require(['src/views/message/detail'], function(view){
				new view({msgId:msgId});
			});
		},
		previewModule: function(e){
			$("#message-preview").show();
			var target = $(e.currentTarget);
			var msgId = target.data("message-id");
			require(['src/views/message/preview'], function(view){
				new view({msgId:msgId});
			});
		},
		confirmPublish: function(e){
			$("#publish-modal").find(".publish-btn").data("message-id", $(e.currentTarget).data("message-id"));
			$("#publish-modal").modal("show");
		},
		publishModule: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var messageId = target.data("message-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/messages-list.json',
				data: {
					id: messageId
				},
				dataType: "json",
				success: function (data, status) {
					$("#publish-modal").modal("hide");
					if (data.statusCode > 0) {
						view.refreshList();
					}else {
						alertModal(data.msg);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
					$("#publish-modal").modal("hide");
				}
			});
		},
		confirmWithdraw: function(e){
			$("#withdraw-modal").find(".withdraw-btn").data("message-id", $(e.currentTarget).data("message-id"));
			$("#withdraw-modal").modal("show");
		},
		withdrawModule: function(e){
			var view = this;
			var target = $(e.currentTarget);
			var messageId = target.data("message-id");
			$.ajax({
				loader: true,
				url: '../static/js/src/data/messages-list.json',
				data: {
					id: messageId
				},
				dataType: "json",
				success: function (data, status) {
					$("#withdraw-modal").modal("hide");
					if (data.statusCode > 0) {
						view.refreshList();
					}else {
						alertModal(data.msg);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
					$("#withdraw-modal").modal("hide");
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
			var qform = view.$el.find(".q-form");
			//initiate date picker and make date constrain
			var startPicker = qform.find('.start-date').datepicker({
				language:  'zh-CN',
				format: 'yyyy/mm/dd',
				autoclose: 1,
				todayHighlight: 1
			}).on('changeDate',function(e){
					endPicker.datepicker('setStartDate', e.date);
				});
			var endPicker = qform.find('.end-date').datepicker({
				language:  'zh-CN',
				format: 'yyyy/mm/dd',
				autoclose: 1,
				todayHighlight: 1
			}).on('changeDate',function(e){
					startPicker.datepicker('setEndDate', e.date);
				});
			//fetch query list
			$.ajax({
				url: '../static/js/src/data/messages-q-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var optStr1 = "",
							optStr2 = "";
						_.each(data.task_status_list, function(item, idx){
							optStr1 += '<option value="' + item.id + '">' + item.name + '</option>';
						});
						_.each(data.release_status_list, function(item, idx){
							optStr2 += '<option value="' + item.id + '">' + item.name + '</option>';
						});
						qform.find('select[name="task_status"]').append(optStr1);
						qform.find('select[name="release_status"]').append(optStr2);
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
			this.$el.find(".messages-view .list-content").html(this.listTemplate(data));
			this.$el.find(".messages-view .page-content").html(this.pageTemplate(data));
		}
	});
	return view;
});