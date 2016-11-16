/**
 * Created by dupeng on 16-1-18.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/moocap/order.tpl',
  'text!src/tpl/moocap/order-list.tpl',
  'text!src/tpl/moocap/pagination.tpl',
  'moment',
  'src/util',
  'datepicker_locale'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl, moment) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'click .q-btn': 'startQuery',
      'click .export-btn': 'exportData',
      'click .refund-link': 'confirmRefund',
      'click .confirm-refund-btn': 'refund',
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
    exportData: function () {
      var formValues = $(".moocap-order-view .q-form").serialize();
      var exportLink = "/moocap/export_order" + "?" + formValues;
      window.open(exportLink);
    },
    startQuery: function () {
      this.pageInfo.page = 1;
      this.refreshList();
    },
    refreshList: function () {
      var view = this;
      var formValues = $(".moocap-order-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        url: '../static/js/src/data/order-list.json',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
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
    changePage: function (e) {
      this.pageInfo.recordsPerPage = e.currentTarget.value;
      this.refreshList();
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
    confirmRefund: function (e) {
      $("#refund-modal").find(".confirm-refund-btn").data("order-id", $(e.currentTarget).data("order-id"));
      $("#refund-modal").find(".order-number").html($(e.currentTarget).data("order-id"));
      $("#refund-modal").modal("show");
    },
    refund: function (e) {
      var view = this;
      var target = $(e.currentTarget);
      var orderId = target.data("order-id");
      $.ajax({
        loader: true,
        type: 'POST',
        url: '../static/js/src/data/order-list.json',
        data: {
          number: orderId
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode) {
            $("#refund-modal").modal("hide");
            view.startQuery();
          } else {
            $("#refund-modal").modal("hide");
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
      this.render();
      setTimeout(function () {
        //initiate date picker and make date constrain
        var startPicker = view.$el.find('.start-date').datepicker({
          language: 'zh-CN',
          format: 'yyyy/mm/dd',
          autoclose: 1,
          todayHighlight: 1
        }).on('changeDate', function (e) {
          endPicker.datepicker('setStartDate', e.date);
        });
        var endPicker = view.$el.find('.end-date').datepicker({
          language: 'zh-CN',
          format: 'yyyy/mm/dd',
          autoclose: 1,
          todayHighlight: 1
        }).on('changeDate', function (e) {
          startPicker.datepicker('setEndDate', e.date);
        });
        startPicker.datepicker("setDate", new Date());
        endPicker.datepicker("setDate", new Date());
      }, 500);
      this.startQuery();
    },
    render: function () {
      this.$el.html(this.template);
    },
    renderResults: function (data) {
      data.moment = moment;
      this.$el.find(".moocap-order-view .list-content").html(this.listTemplate(data));
      this.$el.find(".moocap-order-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});