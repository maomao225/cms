/**
 * Created by dupeng on 15-9-6.
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'text!src/tpl/message/preview.tpl'
], function ($, _, Backbone, tpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: '#message-preview',
		template: _.template(tpl),
		events: {
			'click .back-btn': 'closeDetail'
		},
		initialize: function (opt) {
			var view = this;
			$.ajax({
				loader: true,
				url: '../static/js/src/data/message-detail.json',
				data: {
					id: opt.msgId
				},
				dataType: "json",
				success: function(data, status){
					if(data.statusCode > 0){
						view.render(data);
					}
				},
				error: function(xhr, errorType, error){
					console.log(error);
				}
			});
		},
		closeDetail: function(){
			this.$el.off().hide().html("");
		},
		render: function(data) {
			this.$el.html(this.template(data));
		}
	});
	return view;
});