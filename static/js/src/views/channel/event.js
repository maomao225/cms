/**
 * Created by dupeng on 16-4-12.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/channel/event.tpl',
  'text!src/tpl/channel/event-list.tpl',
  'text!src/tpl/channel/pagination.tpl',
  'src/util'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'click .q-btn': 'startQuery',
      'click .new-btn': 'createEvent',
      'click .preview-image': 'previewImage',
      'click .preview-link': 'previewEvent',
      'click .publish-link': 'confirmPublish',
      'click .confirm-publish-btn': 'publishEvent',
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
      location.href = '#channel/event/create';
    },
    previewImage: function (e) {
      var target = $(e.currentTarget);
      var imageUrl = target.attr("data-image-url");
      var modal = $("#preview-modal");
      modal.find(".preview-content").html('<img style="width: 100%;" src="' + imageUrl + '" alt="Banner"/>');
      modal.modal("show");
    },
    previewEvent: function (e) {
      var target = $(e.currentTarget);
      var eventUrl = target.data("event-url");
      window.open(eventUrl + '?is_preview=1', 'previewwindow', 'location=no');
    },
    confirmPublish: function (e) {
      $("#publish-modal").find(".confirm-publish-btn").data("event-id", $(e.currentTarget).data("event-id"));
      $("#publish-modal").modal("show");
    },
    publishEvent: function (e) {
      var view = this;
      var target = $(e.currentTarget);
      var eventId = target.data("event-id");
      $.ajax({
        loader: true,
        type: 'PUT',
        //url: 'event/special/' + eventId,
        url: '../static/js/src/data/event-list.json?' + eventId,
        data: {
          status: 3
        },
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            $("#publish-modal").modal("hide");
            view.startQuery();
          } else {
            $("#publish-modal").modal("hide");
            alertModal(data.msg);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    confirmDelete: function (e) {
      $("#delete-modal").find(".confirm-delete-btn").data("event-id", $(e.currentTarget).data("event-id"));
      $("#delete-modal").modal("show");
    },
    deleteEvent: function (e) {
      var view = this;
      var target = $(e.currentTarget);
      var eventId = target.data("event-id");
      $.ajax({
        loader: true,
        type: 'DELETE',
        //url: 'event/special/' + eventId,
        url: '../static/js/src/data/event-list.json?' + eventId,
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
      var formValues = $(".channel-event-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        //url: 'event/specials/',
        url: '../static/js/src/data/event-list.json',
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
      //fetch query list
      var view = this;
      var qform = view.$el.find(".q-form");
      $.ajax({
        //url: 'event/special_status/',
        url: '../static/js/src/data/event-q-list.json',
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var optStr = "";
            _.each(data.status_list, function (item, idx) {
              optStr += '<option value="' + item.id + '">' + item.name + '</option>';
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
      this.$el.find(".channel-event-view .list-content").html(this.listTemplate(data));
      this.$el.find(".channel-event-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});