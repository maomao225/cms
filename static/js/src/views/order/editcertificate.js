/**
 * Created by dupeng on 16-5-26.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!src/tpl/order/certificate-detail.tpl',
  'moment',
  'src/util'
], function ($, _, Backbone, bootstrap, tpl, moment) {
  'use strict';

  var view = Backbone.View.extend({
    el: '#main',
    template: _.template(tpl),
    events: {
      'click .back-btn': 'cancelEdit',
      'click .save-btn': 'saveEdit'
    },
    cancelEdit: function () {
      location.href = "#order/certificate";
    },
    validateContent: function () {
      var receiver = this.$el.find("input[name='receiver']").val();
      var mobile = this.$el.find("[name='mobile']").val();
      var address = this.$el.find("[name='address']").val();
      var hint = this.$el.find(".hint-block");
      if (receiver == "") {
        hint.text("请输入收件人");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (mobile == "") {
        hint.text("请输入移动电话");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (!/^(13\d|14[57]|15[^4,\D]|17[678]|18\d)(\d{8})$|^170[059]\d{7}$/.test(mobile)) {
        hint.text("移动电话格式错误,请输入11位数字");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (address == "") {
        hint.text("请输入收货地址");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      return true;
    },
    saveEdit: function () {
      if (!this.validateContent()) {
        return;
      }
      var form = this.$el.find(".content-form");
      var hint = form.find('.hint-block');
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        type: 'PUT',
        //url: 'credential/address_update /' + param.address_ids,
        url: '../static/js/src/data/cert-order-detail.json?' + param.address_id,
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400 && data.statusCode > 0) {
            alertModal('保存成功');
            location.href = "#order/certificate";
          } else {
            alertModal(data.msg);
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
        loader: true,
        //url: 'credential/order_detail/'+ opt.oId,
        url: '../static/js/src/data/cert-order-detail.json?' + opt.oId,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            view.render(data);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    render: function (data) {
      data.moment = moment;
      this.$el.html(this.template(data));
    }
  });
  return view;
});