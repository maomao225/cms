/**
 * Created by dupeng on 16-4-26.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/ecourse/plan.tpl',
  'text!src/tpl/ecourse/plan-list.tpl',
  'text!src/tpl/ecourse/pagination.tpl',
  'moment',
  'src/util'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl, moment) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'click .q-btn': 'startQuery',
      'click .new-btn': 'createEvent',
      'click .delete-link': 'confirmDelete',
      'click .confirm-delete-btn': 'deleteEvent',
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
    createEvent: function () {
      location.href = '#ecourse/plan/create';
    },
    confirmDelete: function (e) {
      $("#delete-modal").find(".confirm-delete-btn").data("plan-id", $(e.currentTarget).data("plan-id"));
      $("#delete-modal").modal("show");
    },
    deleteEvent: function (e) {
      var view = this;
      var target = $(e.currentTarget);
      var planId = target.data("plan-id");
      $.ajax({
        loader: true,
        type: 'DELETE',
        //url: 'course/elective_plan_detail/' + planId,
        url: '../static/js/src/data/plan-list.json?' + planId,
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
      var formValues = $(".ecourse-plan-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        //url: 'course/elective_plan',
        url: '../static/js/src/data/plan-list.json',
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            view.pageInfo.totalPage = data.pages.totalPage;
            view.pageInfo.totalRecord = data.pages.totalRecord;
            view.renderResults(_.extend(data, {moment: moment}));
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    initialize: function (opt) {
      this.render();
      this.startQuery();
    },
    render: function () {
      this.$el.html(this.template);
    },
    renderResults: function (data) {
      this.$el.find(".ecourse-plan-view .list-content").html(this.listTemplate(data));
      this.$el.find(".ecourse-plan-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});