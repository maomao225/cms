/**
 * Created by dupeng on 15-7-29.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/system/edit-resource.tpl',
	'src/util'
], function ($, Backbone, _, tpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		events: {
			'click .cancel-btn': 'cancelEdit',
			'click .confirm-btn': 'validateResource'
		},
		validateResource: function(){
			var resourcename = this.$el.find("input[name='name']").val();
			var description = this.$el.find("input[name='description']").val();
			var extcontent = this.$el.find("textarea[name='ext_content']").val();
			var systemid = this.$el.find("select[name='system_id']").val();
			if(resourcename == ""){
				$(".hint-block").text("请输入资源名称！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(systemid == "" || systemid == null){
				$(".hint-block").text("请选择所属系统！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(extcontent == ""){
				$(".hint-block").text("请输入资源扩展信息！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(description == ""){
				$(".hint-block").text("请输入资源描述！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			this.saveResource();
		},
		cancelEdit: function(){
			location.href = "#resource";
		},
		saveResource: function(){
			var view = this;
			var formValues = $(".edit-resource .edit-form").serialize();
			formValues = decodeURIComponent(formValues);
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/edit-resource.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						location.href = "#resource";
					}else{
						$(".hint-block").text("保存失败，请稍后重试！");
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
		initialize: function (opt) {
			var view = this;
			$.ajax({
				url: '../static/js/src/data/edit-resource.json',
				data: {
					id: opt.resourceId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var obj = {
							editFlag: true,
							resource: data.resource
						};
						view.render(obj);
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		render: function(data) {
			this.$el.html(this.template(data));
		}
	});
	return view;
});