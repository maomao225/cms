/**
 * Created by dupeng on 16-4-26.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!src/tpl/ecourse/editplan.tpl',
  'src/util',
  'datepicker_locale',
  'fileupload'
], function ($, _, Backbone, bootstrap, tpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: '#main',
    template: _.template(tpl),
    events: {
      'click .cancel-btn': 'cancelEdit',
      'click .save-btn': 'savePlan'
    },
    initUpload: function () {
      var view = this;
      var hint = view.$el.find(".hint-block");
      view.$el.find('.fileupload').fileupload({
        //url: 'course/upload_course_info',
        url: "../static/js/src/data/plan-edit.json",
        dataType: 'json',
        add: function (e, data) {
          var goUpload = true;
          var uploadFile = data.files[0];
          //file type validation
          if (!(/(\.|\/)(docx?)$/i).test(uploadFile.name)) {
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
            $(this).parents(".form-group").find('input.fileinput').val(data.result.introduction);
          }
        }
      }).prop('disabled', !$.support.fileInput);
    },
    initDatePicker: function () {
      //initiate date picker and make date constrain
      var startPicker = this.$el.find('.start-date').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: 1,
        todayHighlight: 1
      }).on('changeDate', function (e) {
        endPicker.datepicker('setStartDate', e.date);
      });
      var endPicker = this.$el.find('.end-date').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: 1,
        todayHighlight: 1
      }).on('changeDate', function (e) {
        startPicker.datepicker('setEndDate', e.date);
      });
    },
    cancelEdit: function () {
      location.href = "#ecourse/plan";
    },
    validateContent: function () {
      var name = this.$el.find("input[name='name']").val();
      var course_list = this.$el.find("[name='course_list']").val();
      var data_start = this.$el.find("[name='data_start']").val();
      var data_end = this.$el.find("[name='data_end']").val();
      var hint = this.$el.find(".hint-block");
      if (name == "") {
        hint.text("请输入计划名称");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (data_start == "") {
        hint.text("请输入开始时间");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (data_end == "") {
        hint.text("请输入结束时间");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (course_list.trim() == "") {
        hint.text("请选择课程");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      return true;
    },
    savePlan: function () {
      if (!this.validateContent()) {
        return;
      }
      var form = this.$el.find(".content-form");
      var hint = form.find('.hint-block');
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      param.course_list = param.course_list.split('\r\n');
      var is_edit = param.id != '';
      $.ajax({
        loader: true,
        type: is_edit ? 'PUT' : 'POST',
        //url: is_edit ? 'course/elective_plan_detail/' + param.id : 'course/elective_plan',
        url: '../static/js/src/data/plan-edit.json?' + param.id,
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400 && data.statusCode > 0) {
            alertModal('保存成功');
            location.href = "#ecourse/plan";
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
          //url: 'course/elective_plan_detail/'+ opt.eId,
          url: '../static/js/src/data/plan-edit.json?' + opt.eId,
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
      }
    },
    render: function (data) {
      this.$el.html(this.template(data));
      this.initUpload();
      this.initDatePicker();
    }
  });
  return view;
});