/**
 * Created by dupeng on 15-9-6.
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'text!src/tpl/message/detail.tpl'
], function ($, _, Backbone, tpl) {
	'use strict';

	var view = Backbone.View.extend({
		el: '#message-detail',
		template: _.template(tpl),
		events: {
			'click .expand-icon': 'expandRecipient',
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
		expandRecipient: function(e){
			$(e.currentTarget).toggleClass("glyphicon-triangle-top glyphicon-triangle-bottom");
			this.$el.find(".recipient-list").toggleClass("expanded");
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