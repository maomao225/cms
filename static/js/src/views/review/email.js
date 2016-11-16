/**
 * Created by dupeng on 16-3-29.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'text!src/tpl/review/email.tpl',
  'text!src/tpl/review/email-list.tpl',
  'text!src/tpl/review/pagination.tpl',
  'moment',
  'src/util'
], function ($, Backbone, _, tpl, listTpl, pageTpl, moment) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'click .q-btn': 'startQuery',
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
      var formValues = $(".review-email-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        //url: 'audit/courseemail/',
        url: '../static/js/src/data/email-list.json',
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
      //fetch query list
      var view = this;
      var qform = view.$el.find(".q-form");
      $.ajax({
        //url: 'audit/email_status/',
        url: '../static/js/src/data/email-q-list.json',
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var optStr = "";
            _.each(data.status_list, function (item, idx) {
              optStr += '<option value="' + item.id + '"' + (item.id == 2 ? 'selected' : '') + '>' + item.name + '</option>';
            });
            qform.find('select[name="status"]').append(optStr);
            view.startQuery();
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    render: function () {
      this.$el.html(this.template);
    },
    renderResults: function (data) {
      this.$el.find(".review-email-view .list-content").html(this.listTemplate(data));
      this.$el.find(".review-email-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});