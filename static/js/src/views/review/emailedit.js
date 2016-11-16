/**
 * Created by dupeng on 16-3-30.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!src/tpl/review/edit.tpl',
  'src/util',
  'tinymce'
], function ($, _, Backbone, bootstrap, tpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: '#main',
    template: _.template(tpl),
    events: {
      'click .preview-email-btn': 'previewEmail',
      'click .save-email-btn': 'saveEmail',
      'click .save-review-btn': 'saveReview',
      'click .cancel-btn': 'cancelEdit'
    },
    previewEmail: function () {
      var form = this.$el.find('.content-form');
      var hint = form.find('.hint-block');
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      _.extend(param, {content: tinyMCE.activeEditor.getContent()});
      $.ajax({
        type: 'POST',
        loader: true,
        //url: 'audit/email_preview/',
        url: '../static/js/src/data/message-edit.json?' + param.id,
        data: {
          course_id: param.course_id,
          title: param.title,
          content: param.content
        },
        dataType: 'json',
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            if (data.statusCode > 0) {
              var content = data.html_content;
              var innerFrame = $("#preview-modal").find('iframe')[0].contentDocument;
              $(innerFrame).find('html').empty().html(content);
              $("#preview-modal").modal();
            } else {
              alertModal(data.msg);
            }
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    saveEmail: function () {
      var form = this.$el.find('.content-form');
      var hint = form.find('.hint-block');
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      _.extend(param, {content: tinyMCE.activeEditor.getContent()});
      $.ajax({
        loader: true,
        type: 'PUT',
        //url: 'audit/courseemail/'+ param.id + '/',
        url: '../static/js/src/data/message-edit.json?' + param.id,
        data: _.omit(param, 'id', 'status', 'review_opinion'),
        dataType: 'json',
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            alertModal('保存成功');
          } else {
            alertModal(data.msg);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    saveReview: function () {
      var form = this.$el.find('.content-form');
      var hint = form.find('.hint-block');
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      _.extend(param, {content: tinyMCE.activeEditor.getContent()});
      if (param.status == 3 && param.review_opinion == '') {
        hint.html('请填写审核意见');
        setTimeout(function () {
          hint.html('');
        }, 2000);
        return;
      }
      $.ajax({
        loader: true,
        type: 'PUT',
        //url: 'audit/courseemail/'+ param.id + '/',
        url: '../static/js/src/data/message-edit.json?' + param.id,
        data: _.omit(param, 'id'),
        dataType: 'json',
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            location.href = '#review/email';
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    cancelEdit: function () {
      location.href = '#review/email';
    },
    initialize: function (opt) {
      var view = this;
      $.ajax({
        loader: true,
        //url: 'audit/courseemail/'+ opt.eId + '/',
        url: '../static/js/src/data/email-edit.json?' + opt.eId,
        dataType: 'json',
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            view.render(_.extend(data, opt));
            view.initEditor(opt);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    render: function (data) {
      this.$el.html(this.template(data));
    },
    initEditor: function (opt) {
      tinymce.init({
        selector: '#email-editor',
        height: 300,
        plugins: ['link image textcolor'],
        toolbar: 'bold forecolor link image',
        textcolor_map: [
          "000000", "黑色",
          "8040ff", "学堂紫",
          "ff7d00", "学堂橙"
        ],
        readonly: !!(typeof opt.isRead != 'undefined' && opt.isRead),
        menubar: false,
        language_url: '//storage.xuetangx.com/public_assets/xuetangx/tinymce/langs/zh_CN.js'
      });
    }
  });
  return view;
});