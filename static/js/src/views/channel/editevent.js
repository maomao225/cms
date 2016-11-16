/**
 * Created by dupeng on 15-9-6.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!src/tpl/channel/editevent.tpl',
  'text!src/tpl/channel/recommend-block.tpl',
  'src/util',
  'fileupload'
], function ($, _, Backbone, bootstrap, tpl, recTpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: '#main',
    template: _.template(tpl),
    recTemplate: _.template(recTpl),
    events: {
      'change [name="stype"]': 'typeChange',
      'click .add-course-btn, .add-post-btn': 'addRecommend',
      'click .remove-rec-link': 'removeRecommend',
      'click .cancel-btn': 'cancelEdit',
      'click .save-btn': 'saveEvent',
      'click .publish-btn': 'publishEvent'
    },
    typeChange: function (e) {
      var val = e.currentTarget.value;
      $('.rec-list').removeClass('hidden').toggleClass('course', val == 1).toggleClass('post', val == 2);
    },
    addRecommend: function (e) {
      var parent = this.$el.find('.rec-list .btn-row');
      parent.before(this.recTemplate);
    },
    removeRecommend: function (e) {
      var $target = $(e.currentTarget);
      $target.parents('.rec-item').remove();
    },
    initUpload: function () {
      var view = this;
      var hint = view.$el.find(".hint-block");
      view.$el.find('.fileupload').fileupload({
        //url: 'banner/upload',
        url: "../static/js/src/data/upload.json",
        dataType: 'json',
        add: function (e, data) {
          var goUpload = true;
          var uploadFile = data.files[0];
          //file type validation
          if (!(/(\.|\/)(jpeg|jpg|gif|png)$/i).test(uploadFile.name)) {
            hint.text("仅支持图片格式文件，请重新选择");
            setTimeout(function () {
              hint.text("");
            }, 2000);
            goUpload = false;
          }
          if (goUpload == true) {
            data.submit();
          }
        },
        done: function (e, data) {
          if (data.result) {
            $(this).parents(".form-group").find('input.fileinput').val(data.result.pic_url);
          }
        }
      }).prop('disabled', !$.support.fileInput);
    },
    cancelEdit: function () {
      location.href = "#channel/event";
    },
    validateContent: function () {
      var name = this.$el.find("input[name='name']").val();
      var title = this.$el.find("input[name='title']").val();
      var banner = this.$el.find("input[name='banner']").val();
      var introduction = this.$el.find("[name='introduction']").val();
      var share_copy = this.$el.find("[name='share_copy']").val();
      var stype = this.$el.find("[name='stype']").val();
      var hint = this.$el.find(".hint-block");
      if (name == "") {
        hint.text("请输入专题页url");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (title == "") {
        hint.text("请输入专题页标题");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (banner == "") {
        hint.text("请输入或选择Banner图片");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (introduction == "") {
        hint.text("请输入专题说明");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (share_copy == "") {
        hint.text("请输入分享文案");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (stype == "") {
        hint.text("请选择专题类型");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if ($('.rec-list .rec-item').length == 0) {
        hint.text("请至少添加一个推荐内容");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      } else {
        var recList = JSON.parse(this.parseRecList());
        var flag = _.some(recList, function (item, idx) {
          return item.recommend == "" || (item.course_id == "" && item.post_url == "");
        });
        if (flag) {
          hint.html("请输入课程id/帖子url及推荐理由");
          setTimeout(function () {
            hint.html("");
          }, 2000);
          return false;
        }
      }
      return true;
    },
    parseRecList: function () {
      var listData = [];
      $('.rec-list .rec-item').each(function () {
        var item = $(this);
        listData.push({
          course_id: item.find('.course-id').val(),
          post_url: item.find('.post-url').val(),
          recommend: item.find('.recommend').val()
        });
      });
      return JSON.stringify(listData);
    },
    saveEvent: function () {
      if (!this.validateContent()) {
        return;
      }
      var form = this.$el.find(".content-form");
      var hint = form.find('.hint-block');
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      _.extend(param, {recommend_list: this.parseRecList()});
      var is_edit = param.id == '' ? false : true;
      $.ajax({
        loader: true,
        type: is_edit ? 'PUT' : 'POST',
        //url: is_edit ? 'event/special/' + param.id + '/' : 'event/special_create/',
        url: '../static/js/src/data/event-edit.json?' + param.id,
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400 && data.statusCode > 0) {
            alertModal('保存成功');
            location.href = "#channel/event";
          } else {
            alertModal(data.msg);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    publishEvent: function () {
      if (!this.validateContent()) {
        return;
      }
      var form = this.$el.find(".content-form");
      var hint = form.find('.hint-block');
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      _.extend(param, {status: 3, recommend_list: this.parseRecList()});
      $.ajax({
        loader: true,
        type: "PUT",
        //url: 'event/special/'+ param.id + '/',
        url: '../static/js/src/data/event-edit.json?' + param.id,
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            location.href = "#channel/event";
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
      if (!!opt) {
        $.ajax({
          loader: true,
          //url: 'event/special/'+ opt.eId + '/',
          url: '../static/js/src/data/event-edit.json?' + opt.eId,
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
      } else {
        view.render({});
        $.ajax({
          //url: 'event/special_status/',
          url: '../static/js/src/data/event-q-list.json',
          dataType: "json",
          success: function (data, status, xhr) {
            if (xhr.status >= 200 && xhr.status < 400) {
              var optStr = "";
              _.each(data.stype_list, function (item, idx) {
                optStr += '<option value="' + item.id + '">' + item.name + '</option>';
              });
              view.$el.find('select[name="stype"]').append(optStr);
            }
          },
          error: function (xhr, errorType, error) {
            console.log(error);
          }
        });
      }
    },
    render: function (data) {
      this.$el.html(this.template(data));
      this.initUpload();
    }
  });
  return view;
});