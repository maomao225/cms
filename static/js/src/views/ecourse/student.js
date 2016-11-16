/**
 * Created by dupeng on 16-5-6.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/ecourse/student.tpl',
  'text!src/tpl/ecourse/student-list.tpl',
  'text!src/tpl/ecourse/pagination.tpl',
  'text!src/tpl/ecourse/student-detail.tpl',
  'src/util',
  'fileupload'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl, detailTpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    detailTemplate: _.template(detailTpl),
    events: {
      'click .download-btn': 'downloadList',
      'click .import-btn': 'importList',
      'click .q-btn': 'startQuery',
      'click .new-btn': 'createStudent',
      'click .save-create-btn': 'saveCreate',
      'click .edit-link': 'editStudent',
      'click .save-edit-btn': 'saveEdit',
      'click .delete-link': 'confirmDelete',
      'click .confirm-delete-btn': 'deleteStudent',
      //pagination events
      'change .records-select': 'changePage',
      'click .pagination .first-page': 'firstPage',
      'click .pagination .prev-page': 'prevPage',
      'click .pagination .next-page': 'nextPage',
      'click .pagination .last-page': 'lastPage'
    },
    pageInfo: {
      page: 1,
      totalPage: 0,
      recordsPerPage: 10,
      totalRecord: 0
    },
    initParam: {},
    downloadList: function () {
      var downllink = 'course/export_approve_student?';
      var param = this.initParam;
      window.open(downllink + 'org_id=' + encodeURIComponent(param.org_id) + '&plan_id=' + encodeURIComponent(param.plan_id) + '&course_id=' + encodeURIComponent(param.course_id));
    },
    initUpload: function () {
      var view = this;
      var param = view.initParam;
      var hint = view.$el.find(".q-form .hint-block");
      view.$el.find('.q-form .fileupload').fileupload({
        //url: 'course/import_approve_student',
        url: "../static/js/src/data/approve-upload.json",
        formData: {
          org_id: param.org_id,
          plan_id: param.plan_id,
          course_id: param.course_id
        },
        dataType: 'json',
        add: function (e, data) {
          var goUpload = true;
          var uploadFile = data.files[0];
          //file type validation
          if (!(/(\.|\/)(csv)$/i).test(uploadFile.name)) {
            hint.text("仅支持csv格式文件，请重新选择");
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
            location.reload();
          }
        }
      }).prop('disabled', !$.support.fileInput);
    },
    changePage: function (e) {
      this.pageInfo.recordsPerPage = e.currentTarget.value;
      this.startQuery();
    },
    firstPage: function () {
      var view = this;
      if (view.pageInfo.page == 1)return;
      view.pageInfo.page = 1;
      view.refreshList();
    },
    prevPage: function () {
      var view = this;
      if (view.pageInfo.page != 1) {
        view.pageInfo.page--;
        view.refreshList();
      }
    },
    nextPage: function () {
      var view = this;
      if (view.pageInfo.page < view.pageInfo.totalPage) {
        view.pageInfo.page++;
        view.refreshList();
      }
    },
    lastPage: function () {
      var view = this;
      if (view.pageInfo.page == view.pageInfo.totalPage)return;
      view.pageInfo.page = view.pageInfo.totalPage;
      view.refreshList();
    },
    validateContent: function (form) {
      var unique_code = form.find("[name='unique_code']").val();
      var org_number = form.find("[name='org_number']").val();
      var hint = form.find(".hint-block");
      if (unique_code == "") {
        hint.text("请输入学堂号");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      if (org_number == "") {
        hint.text("请输入学号");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        return false;
      }
      return true;
    },
    createStudent: function () {
      var modal = $("#create-modal");
      modal.find(".create-content").html(this.detailTemplate(this.initParam));
      modal.modal("show");
    },
    saveCreate: function () {
      var form = $("#create-modal").find(".detail-form");
      if (!this.validateContent(form)) {
        return;
      }
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      var view = this;
      $.ajax({
        loader: true,
        type: "POST",
        //url: 'course/elective_student',
        url: '../static/js/src/data/student-detail.json',
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            if (data.statusCode > 0) {
              $("#create-modal").modal("hide");
              view.startQuery();
            } else if (data.statusCode == 0) {
              form.find(".hint-block").text(data.msg);
              setTimeout(function () {
                form.find(".hint-block").text("");
              }, 2000);
            }
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    editStudent: function (e) {
      var studentId = $(e.currentTarget).data("student-id");
      var modal = $("#edit-modal");
      var view = this;
      $.ajax({
        loader: true,
        //url: 'course/elective_student_detail/' + studentId,
        url: '../static/js/src/data/student-detail.json?' + studentId,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            modal.find(".edit-content").html(view.detailTemplate(_.extend(data, {id: studentId})));
            modal.modal("show");
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    saveEdit: function () {
      var form = $("#edit-modal").find(".detail-form");
      if (!this.validateContent(form)) {
        return;
      }
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      var studentId = form.data('student-id');
      var view = this;
      $.ajax({
        loader: true,
        type: "PUT",
        //url: 'course/elective_student_detail/' + studentId,
        url: '../static/js/src/data/student-detail.json?' + studentId,
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            if (data.statusCode > 0) {
              $("#edit-modal").modal("hide");
              view.startQuery();
            } else if (data.statusCode == 0) {
              form.find(".hint-block").text(data.msg);
              setTimeout(function () {
                form.find(".hint-block").text("");
              }, 2000);
            }
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    confirmDelete: function (e) {
      $("#delete-modal").find(".confirm-delete-btn").data("student-id", $(e.currentTarget).data("student-id"));
      $("#delete-modal").modal("show");
    },
    deleteStudent: function (e) {
      var view = this;
      var target = $(e.currentTarget);
      var studentId = target.data("student-id");
      $.ajax({
        loader: true,
        type: 'DELETE',
        //url: 'course/elective_student_detail/' + studentId,
        url: '../static/js/src/data/student-list.json?' + studentId,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            if (data.statusCode > 0) {
              $("#delete-modal").modal("hide");
              view.startQuery();
            } else {
              $("#delete-modal").modal("hide");
              alertModal(data.msg);
            }
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    startQuery: function () {
      this.pageInfo.page = 1;
      this.refreshList();
    },
    refreshList: function () {
      var view = this;
      var formValues = $(".ecourse-student-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        //url: 'course/elective_student',
        url: '../static/js/src/data/student-list.json',
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            view.pageInfo.totalPage = data.pages.totalPage;
            view.pageInfo.totalRecord = data.pages.totalRecord;
            view.renderResults(data);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    renderResults: function (data) {
      this.$el.find(".ecourse-student-view .list-content").html(this.listTemplate(data));
      this.$el.find(".ecourse-student-view .page-content").html(this.pageTemplate(data));
    },
    initialize: function (opt) {
      this.initParam = this.getParam();
      this.render(this.initParam);
      //fetch query list
      var view = this;
      var qform = view.$el.find(".q-form");
      $.ajax({
        //url: 'course/select_elective_student',
        url: '../static/js/src/data/student-q-list.json',
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var optStr = '',
              optStr2 = '';
            _.each(data.status_list, function (item) {
              optStr += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            qform.find('select[name="status"]').append(optStr);
            _.each(data.reason_list, function (item) {
              optStr2 += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            qform.find('select[name="invalid_reason"]').append(optStr2);
            view.startQuery();
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    getParam: function () {
      var storage = sessionStorage.getItem('approveInfo');
      return JSON.parse(storage);
    },
    render: function (data) {
      this.$el.html(this.template(data));
      this.initUpload();
    }
  });
  return view;
});