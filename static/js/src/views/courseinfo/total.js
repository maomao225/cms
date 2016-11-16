/**
 * Created by dupeng on 15-9-17.
 */
define([
	'jquery',
	'backbone',
	'underscore',
	'text!src/tpl/courseinfo/total.tpl'
], function ($, Backbone, _, tpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: "#main",
		template: _.template(tpl),
		events: {
			'click .export-btn': 'exportData'
		},
		exportData: function () {
			var exportLink = "//www.baidu.com";
			window.open(exportLink);
		},
		initialize: function (opt) {
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/course-total-list.json',
				dataType: "json",
				success: function (data, status) {
					if (data.statusCode > 0) {
						view.render({course_data: data});
					}
				},
				error: function (xhr, errorType, error) {
					console.log(error);
				}
			});
		},
		render: function (data) {
			this.$el.html(this.template(data));
		}
	});
	return view;
});