/**
 * Created by dupeng on 15-7-29.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/system/edit-menu.tpl',
	'src/util'
], function ($, Backbone, _, tpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		events: {
			'click .cancel-btn': 'cancelEdit',
			'click .confirm-btn': 'validateMenu'
		},
		validateMenu: function(){
			var menuname = this.$el.find("input[name='name']").val();
			var mkey = this.$el.find("input[name='mkey']").val();
			var murl = this.$el.find("input[name='url']").val();
			var resourceid = this.$el.find("select[name='resource_id']").val();
			var parentid = this.$el.find("select[name='parent_id']").val();
			var order = this.$el.find("input[name='order']").val();
			if(menuname == ""){
				$(".hint-block").text("请输入菜单名称！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(mkey == ""){
				$(".hint-block").text("请输入菜单key！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(murl == ""){
				$(".hint-block").text("请输入菜单url！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(resourceid == "" || resourceid == null){
				$(".hint-block").text("请选择资源id！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(parentid == "" || parentid == null){
				$(".hint-block").text("请选择父菜单id！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			if(order == "" || !isInteger(order)){
				$(".hint-block").text("请输入正确的顺序格式，只接受数字类型！");
				setTimeout(function(){
					$(".hint-block").text("");
				}, 2000);
				return false;
			}
			this.saveMenu();
		},
		cancelEdit: function(){
			location.href = "#menu";
		},
		saveMenu: function(){
			var view = this;
			var formValues = $(".edit-menu .edit-form").serialize();
			formValues = decodeURIComponent(formValues);
			var param = qStrToJson(formValues);
			$.ajax({
				loader: true,
				type: "post",
				url: '../static/js/src/data/edit-menu.json',
				data: param,
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						location.href = "#menu";
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
				url: '../static/js/src/data/edit-menu.json',
				data: {
					id: opt.menuId
				},
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode) {
						var obj = {
							editFlag: true,
							menu: data.menu
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