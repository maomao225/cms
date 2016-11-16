/**
 * Created by dupeng on 16-4-26.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/order/certificate.tpl',
  'text!src/tpl/order/certificate-list.tpl',
  'text!src/tpl/order/pagination.tpl',
  'src/util'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'change .toggle-all': 'toggleAll',
      'click .export-cert-btn': 'exportCert',
      'click .export-btn': 'exportOrder',
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
    toggleAll: function (e) {
      var checkbox = $(e.currentTarget);
      if (checkbox.is(":checked") == true) {
        this.$el.find('.list-content .toggler').prop('checked', true);
      } else {
        this.$el.find('.list-content .toggler').removeAttr('checked');
      }
    },
    exportCert: function () {
      var tList = this.$el.find('.list-content .toggler:checked');
      if (tList.length <= 0) {
        alertModal('请至少选择一条数据!');
      } else {
        var vArr = [];
        _.each(tList, function(checkbox, idx){
          vArr.push($(checkbox).val());
        });
        var downloadlink = 'credential/credential_download?';
        window.open(downloadlink + 'order_list=' + JSON.stringify(vArr));
      }
    },
    exportOrder: function () {
      var view = this;
      var formValues = view.$el.find('.q-form').serialize() + '&is_export=1&page=1&psize=100000';
      var exportlink = 'credential/order?';
      window.open(exportlink + formValues);
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
      var formValues = $(".cert-order-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        //url: 'credential/order',
        url: '../static/js/src/data/cert-order-list.json',
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
    initialize: function (opt) {
      this.render();
      this.startQuery();
    },
    render: function () {
      this.$el.html(this.template);
    },
    renderResults: function (data) {
      this.$el.find(".cert-order-view .list-content").html(this.listTemplate(data));
      this.$el.find(".cert-order-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});