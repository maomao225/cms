/**
 * Created by dupeng on 16-4-20.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/message/pushemail.tpl',
  'src/util'
], function ($, Backbone, _, bootstrap, tpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    events: {
      'click .send-btn': 'sendEmail'
    },
    sendEmail: function () {
      var form = this.$el.find(".content-form");
      var hint = form.find('.hint-block');
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      if (param.toEmail == "") {
        hint.text("请输入邮件组地址");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (param.subject == "") {
        hint.text("请输入邮件名称");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (param.templateName == "") {
        hint.text("请输入模板名称");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      $.ajax({
        loader: true,
        type: "POST",
        //url: 'notification/send_email',
        url: '../static/js/src/data/event-edit.json',
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400 && data.statusCode > 0) {
            $('#success-modal').modal();
          } else {
            alertModal('发送失败,请稍后重试');
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    initialize: function (opt) {
      this.render();
    },
    render: function () {
      this.$el.html(this.template());
    }
  });
  return view;
});