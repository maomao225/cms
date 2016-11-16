/**
 * Created by dupeng on 15-9-17.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/courseinfo/download.tpl',
  'text!src/tpl/courseinfo/download-list.tpl',
  'text!src/tpl/courseinfo/pagination.tpl',
  'src/util'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'click .type-link': 'exportModal',
      'click .q-btn': 'searchAction',

      //pagination events
      'change .records-select': 'changePage',
      'click .pagination .first-page': 'firstPage',
      'click .pagination .prev-page': 'prevPage',
      'click .pagination .next-page': 'nextPage',
      'click .pagination .last-page': 'lastPage'
    },
    exportModal: function (e) {
      var target = $(e.currentTarget);
      var courseId = target.data("course-id");
      var type = target.data("type-key");
      $.ajax({
        loader: true,
        url: '../static/js/src/data/download-school-list.json',
        // url: '/course/elective_college_list',
        data: {
          course_id: courseId,
          dtype: type
        },
        dataType: "json",
        success: function (data, status) {
          var $modal = $("#export-modal");
          if (data.statusCode > 0 && data.list.length > 0) {
            var tplStr = '';
            _.each(data.list, function(school, idx){
              tplStr += '<a class="download-link" href="' + school.url + '" title="' + school.update_time + '" target="_blank">' + school.org + '</a>';
            });
            $modal.find('.export-content').html(tplStr);
            $modal.modal("show");
          } else {
            $modal.find('.export-content').html('暂无可下载数据');
            $modal.modal("show");
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    pageInfo: {
      page: 1,
      totalPage: 0,
      recordsPerPage: 10,
      totalRecord: 0
    },
    searchFlag: {
      flag: 'todo'
    },
    initialize: function (opt) {
      var view = this;
      view.render()
      view.searchAction()
    },
    searchHandler: function () {
      var view = this;
      var formValues = $(".form-download").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page + "&flag=" + view.searchFlag.flag;
      var param = qStrToJson(formValues)
      $.ajax({
        loader: true,
        url: '../static/js/src/data/course-download.json',
        // url: '/course/elective_course',
        dataType: "json",
        data: param,
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
    searchAction: function (e) {
      var view = this;
      view.searchHandler()
    },
    changePage: function (e) {
      this.pageInfo.recordsPerPage = e.currentTarget.value;
      this.startQuery();
    },
    firstPage: function () {
      var view = this;
      if (view.pageInfo.page == 1) return;
      view.pageInfo.page = 1;
      view.searchAction();
    },
    prevPage: function () {
      var view = this;
      if (view.pageInfo.page != 1) {
        view.pageInfo.page--;
        view.searchAction();
      }
    },
    nextPage: function () {
      var view = this;
      if (view.pageInfo.page < view.pageInfo.totalPage) {
        view.pageInfo.page++;
        view.searchAction();
      }
    },
    lastPage: function () {
      var view = this;
      if (view.pageInfo.page == view.pageInfo.totalPage) return;
      view.pageInfo.page = view.pageInfo.totalPage;
      view.searchAction();
    },
    startQuery: function () {
      this.pageInfo.page = 1;
      this.searchFlag.flag = 'search';
      this.searchAction();
    },
    allQuery: function () {
      this.pageInfo.page = 1;
      this.searchFlag.flag = 'all';
      this.searchAction();
    },
    todoQuery: function () {
      this.pageInfo.page = 1;
      this.searchFlag.flag = 'todo';
      this.searchAction();
    },
    render: function (data) {
      this.$el.html(this.template(data));
    },
    renderResults: function (data) {
      // data.moment = Moment
      this.$el.find(".courseinfo-bycourse-download-view .list-content").html(this.listTemplate(data));
      this.$el.find(".courseinfo-bycourse-download-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});
