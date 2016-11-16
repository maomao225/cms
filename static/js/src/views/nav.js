/**
 * Created by dupeng on 15-5-28.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/leftnav.tpl',
	'text!src/tpl/topnav.tpl'
], function ($, Backbone, _, navTpl, topnavTpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: '#leftnav',
		template: _.template(navTpl),
		topNavTemplate: _.template(topnavTpl),
		events: {
			'click .cms-nav .toggle-nav': 'toggleNav',
			'click .cms-nav a': 'activeLink'
		},
		toggleNav: function(e) {
			var target = $(e.currentTarget);
			var icon = target.find(".toggle-icon");
			var collapse = target.siblings(".secondmenu");
			icon.toggleClass("glyphicon-triangle-right glyphicon-triangle-bottom");
			collapse.toggleClass("in");
			return false;
		},
		activeLink: function(e){
			var target = $(e.currentTarget);
			$(".cms-nav li>a").removeClass("active");
			target.addClass("active");
		},
		sysChange: function(e){
			if(e.currentTarget.value != ""){
				location.href = e.currentTarget.value;
			}
		},
		initialize: function (opt) {
			var view = this;
			$("body").on("change", ".sys-select", this.sysChange);
			$.ajax({
				type: 'post',
				url: '../static/js/src/data/newnav.json',
				dataType: "json",
				success: function(data, status){
					if(data.statusCode){
						var filteredData = view.filterData(data);
						view.render(filteredData);
					}
				},
				error: function(xhr, errorType, error){
					console.log(error);
				}
			});
		},
		filterData: function(data){
			var filterStr = "";
			_.forEach(data.sys_list, function(sys){
				if(sys.is_checked == 1){
					filterStr = sys.skey;
				}
			});
			var returnData = data;
			_.forEach(data.navs, function(nav){
				if(nav.mkey.toLowerCase() == filterStr.toLowerCase()){
					returnData = _.extend(returnData, {navs: nav.child});
				}
			});
			return returnData;
		},
		render: function(data) {
			this.$el.html(this.template(data));
			$('header .container').append(this.topNavTemplate(data));
		}
	});
	return view;
});