/**
 * Created by dupeng on 16-3-23.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/coursecontent/survey.tpl',
  'text!src/tpl/coursecontent/survey-list.tpl',
  'text!src/tpl/coursecontent/survey-detail.tpl',
  'text!src/tpl/coursecontent/pagination.tpl',
  'src/util'
], function ($, Backbone, _, bootstrap, tpl, listTpl, detailTpl, pageTpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    detailTemplate: _.template(detailTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'click .q-btn': 'startQuery',
      'click .edit-link': 'editSurvey',
      'click .delete-link': 'confirmDelete',
      'click .confirm-delete-btn': 'deleteSurvey',
      'click .new-btn': 'createSurvey',
      'click .save-create-btn': 'saveCreate',
      'click .save-edit-btn': 'saveEdit',
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
    startQuery: function () {
      this.pageInfo.page = 1;
      this.refreshList();
    },
    refreshList: function () {
      var view = this;
      var formValues = $(".course-survey-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        //url: 'course/surveys',
        url: '../static/js/src/data/survey-list.json',
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
    confirmDelete: function (e) {
      $("#delete-modal").find(".confirm-delete-btn").data("survey-id", $(e.currentTarget).data("survey-id"));
      $("#delete-modal").modal("show");
    },
    deleteSurvey: function (e) {
      var view = this;
      var target = $(e.currentTarget);
      var surveyId = target.data("survey-id");
      $.ajax({
        loader: true,
        type: 'DELETE',
        //url: 'course/survey/' + surveyId,
        url: '../static/js/src/data/survey-list.json?' + surveyId,
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
    createSurvey: function () {
      var modal = $("#create-modal");
      var view = this;
      modal.find(".create-content").html(view.detailTemplate({}));
      modal.modal("show");
    },
    saveCreate: function () {
      var form = $("#create-modal").find(".detail-form");
      if (!this.validateDetail(form)) {
        return false;
      }
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      var view = this;
      $.ajax({
        loader: true,
        type: "POST",
        //url: 'course/surveys',
        url: '../static/js/src/data/survey-detail.json',
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
    editSurvey: function (e) {
      var surveyId = $(e.currentTarget).data("survey-id");
      var modal = $("#edit-modal");
      var view = this;
      $.ajax({
        loader: true,
        //url: 'course/survey/' + surveyId,
        url: '../static/js/src/data/survey-detail.json?' + surveyId,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            modal.find(".edit-content").html(view.detailTemplate(data));
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
      if (!this.validateDetail(form)) {
        return false;
      }
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      var view = this;
      $.ajax({
        loader: true,
        type: "POST",
        //url: 'course/survey/',
        url: '../static/js/src/data/survey-list.json',
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
    validateDetail: function (form) {
      var flag = true;
      var hint = form.find(".hint-block");
      var title = form.find("input[name='title']").val();
      var preface = form.find("input[name='preface']").val();
      var submitText = form.find("input[name='submit_text']").val();
      var content = form.find("textarea[name='content']").val();
      if (title == "") {
        hint.text("问卷名称不能为空！");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        flag = false;
        return flag;
      }
      //if (preface == "") {
      //  hint.text("问卷前言不能为空！");
      //  setTimeout(function () {
      //    hint.text("");
      //  }, 2000);
      //  flag = false;
      //  return flag;
      //}
      if (submitText == "") {
        hint.text("提交按钮文案不能为空！");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        flag = false;
        return flag;
      }
      //if (content == "") {
      //  hint.text("问卷内容不能为空！");
      //  setTimeout(function () {
      //    hint.text("");
      //  }, 2000);
      //  flag = false;
      //  return flag;
      //}
      return flag;
    },
    initialize: function (opt) {
      this.render();
      this.startQuery();
    },
    render: function () {
      this.$el.html(this.template);
    },
    renderResults: function (data) {
      this.$el.find(".course-survey-view .list-content").html(this.listTemplate(data));
      this.$el.find(".course-survey-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});