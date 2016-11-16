/**
 * Created by dupeng on 15-7-29.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/system/edit-role.tpl',
	'src/util'
], function ($, Backbone, _, tpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		events: {
			'click .cancel-btn': 'cancelEdit',
			'click .confirm-btn': 'validateRole'
		},
		validateRole: function(){
			var rolename = this.$el.find("input[name='name']").val();
			var resourcelist = this.$el.find("input[name='resource_id']:checked");
			if(rolename == ""){
				$(".hint-block").text("请输入角色名称！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(resourcelist.length <= 0){
				$(".hint-block").text("请至少选择一项资源！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			this.saveRole();
		},
		cancelEdit: function(){
			location.href = "#role";
		},
		saveRole: function(){
			var view = this;
			var formValues = $(".edit-role .edit-form").serialize();
			formValues = decodeURIComponent(formValues);
			var param = qStrToJson(formValues);
			param.resource_id = [].concat([], param.resource_id);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/edit-role.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						location.href = "#role";
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
				url: '../static/js/src/data/allresource-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var obj = {
							editFlag: false,
							role: {
								resource_list: data.list
							}
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