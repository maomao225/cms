/**
 * Created by dupeng on 15-5-25.
 */
require([
	'jquery',
	'backbone',
	'src/router/cms-router'
], function($, Backbone, router){
	//show loader when any ajax request start
	$(document).ajaxSend(function(event, xhr, settings){
		if (settings.loader){
			$(".loading").show();
		}
	});
	//redirect to login page if ajax request session time out
	$(document).ajaxComplete(function(event, xhr, settings){
		if(xhr.status == 302){
			location.href = "/login";
		}
	});
	//hide loader when all ajax request have compeleted
	$(document).ajaxStop(function(){
		$(".loading").fadeOut("fast");
	});
	//initiate router
	new router();
	Backbone.history.start();
});