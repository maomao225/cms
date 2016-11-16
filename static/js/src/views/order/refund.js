/**
 * Created by dupeng on 16-5-20.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/order/refund.tpl',
  'text!src/tpl/order/refund-list.tpl',
  'text!src/tpl/order/pagination.tpl',
  'moment',
  'src/util'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl, moment) {
  'use strict';

  var view = Backbone.View.extend({
    el: '#main',
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'click .export-btn': 'exportData',
      'click .q-btn': 'startQuery',
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
      var view = this;
      var formValues = view.$el.find('.q-form').serialize() + '&is_export=1&page=1&psize=100000';
      var downloadlink = 'credential/refund?';
      window.open(downloadlink + formValues);
    },
    confirmRefund: function (e) {
      $('#refund-modal').find('.confirm-refund-btn').data('order-id', $(e.currentTarget).data('order-id'));
      $('#refund-modal').find('.order-number').html($(e.currentTarget).data('order-id'));
      $('#refund-modal').modal('show');
    },
    refund: function (e) {
      var view = this;
      var target = $(e.currentTarget);
      var orderId = target.data('order-id');
      $.ajax({
        loader: true,
        type: 'POST',
        //url: 'credential/op_refund/' + orderId,
        url: '../static/js/src/data/refund-list.json?' + orderId,
        dataType: 'json',
        success: function (data, status) {
          if (xhr.status >= 200 && xhr.status < 400 && data.statusCode > 0) {
            $('#refund-modal').modal('hide');
            view.startQuery();
          } else {
            $('#refund-modal').modal('hide');
            alertModal(data.msg);
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
      var formValues = $('.refund-order-view .q-form').serialize() + '&psize=' + view.pageInfo.recordsPerPage + '&page=' + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        //url: 'credential/refund',
        url: '../static/js/src/data/refund-list.json',
        data: param,
        dataType: 'json',
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
    initialize: function (opt) {
      this.render();
      this.startQuery();
    },
    render: function () {
      this.$el.html(this.template);
    },
    renderResults: function (data) {
      data.moment = moment;
      this.$el.find('.refund-order-view .list-content').html(this.listTemplate(data));
      this.$el.find('.refund-order-view .page-content').html(this.pageTemplate(data));
    }
  });
  return view;
});