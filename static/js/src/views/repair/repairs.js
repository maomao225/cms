/**
 * Created by dupeng on 15-9-16.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'moment',
  'text!src/tpl/repair/repair.tpl',
  'text!src/tpl/repair/repair-list.tpl',
  'text!src/tpl/repair/pagination.tpl',
  'text!src/tpl/repair/detail.tpl',
  'text!src/tpl/repair/editTag.tpl',
  'src/util',
  'datepicker_locale'
], function ($, Backbone, _, bootstrap, Moment, tpl, listTpl, pageTpl, detailTpl, editTag) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    pageTemplate: _.template(pageTpl),
    detailTemplate: _.template(detailTpl),
    editTagTemplate: _.template(editTag),
    events: {
      'click .q-btn': 'startQuery',
      'click .all-btn': 'allQuery',
      'click .todo-btn': 'todoQuery',
      'click .edit_tag': 'editTag',
      'click .repair-detail-link': 'repairDetail',
      'click .repair-close-link': 'confirmClose',
      'click .confirm-close-btn': 'closeRepair',
      'click .save-edit-btn': 'saveTag',
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
    searchFlag: {
      flag: 'todo'
    },
    startQuery: function () {
      this.pageInfo.page = 1;
      this.searchFlag.flag = 'search';
      this.refreshList();
    },
    allQuery: function () {
      this.pageInfo.page = 1;
      this.searchFlag.flag = 'all';
      this.refreshList();
    },
    todoQuery: function () {
      this.pageInfo.page = 1;
      this.searchFlag.flag = 'todo';
      this.refreshList();
    },
    repairDetail: function (e) {
      $("#repair-detail").show();
      var target = $(e.currentTarget);
      var repairId = target.data("repair-id");
      var isedit = target.data("repair-isedit");
      require(['src/views/repair/detail'], function (view) {
        new view({repairId: repairId, isedit: isedit});
      });
    },
    confirmClose: function(e){
      $("#close-modal").find(".confirm-close-btn").data("repair-id", $(e.currentTarget).data("repair-id"));
      $("#close-modal").modal("show");
    },
    closeRepair: function(e){
      var view = this;
      var target = $(e.currentTarget);
      var repairId = target.data("repair-id");
      $.ajax({
        loader: true,
        type: "POST",
        url: '../static/js/src/data/save-repair-tag.json',
        data: {
          id: repairId
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            $("#close-modal").modal("hide");
            view.startQuery();
          }else{
            $("#close-modal").modal("hide");
            alertModal(data.msg);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    saveTag: function () {

      var form = $("#edit-modal").find(".tag-form");
      if (!this.validateDetail(form)) {
        return false;
      }
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      var view = this;
      $.ajax({
        loader: true,
        type: "post",
        url: '../static/js/src/data/save-repair-tag.json',
        // url:'/repair/save_tag',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            $("#edit-modal").modal("hide");
            view.startQuery();
          } else if (data.statusCode == 0) {
            form.find(".hint-block").text(data.msg);
            setTimeout(function () {
              form.find(".hint-block").text("");
            }, 2000);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    editTag: function (e) {
      var repairid = $(e.target).data('repair-id')
      var modal = $("#edit-modal");
      var view = this;
      $.ajax({
        loader: true,
        // url: '/repair/get_repair_tag',
        url: '../static/js/src/data/get-repair-tag.json',
        data: {
          repair_id: repairid
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode) {
            modal.find(".edit-content").html(view.editTagTemplate(data));
            modal.modal("show");
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
      var tagname = form.find("input[name='name']").val();
      if (tagname == "") {
        hint.text("标签名称不能为空！");
        setTimeout(function () {
          hint.text("");
        }, 2000);
        flag = false;
        return flag;
      }
      return flag;
    },
    refreshList: function () {
      var view = this;
      var formValues = $(".repair-repairs-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page + "&flag=" + view.searchFlag.flag;

      var param = qStrToJson(formValues);
      $.ajax({
        type: "get",
        loader: true,
        // url: '/repair/repair_list',
        url: '../static/js/src/data/repair-list.json',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            view.pageInfo.totalPage = data.pages.totalPage;
            view.pageInfo.totalRecord = data.pages.totalRecord;
            view.renderResults(data);
            view.substringFn("repairQA", 20)
            view.substringFn("repairTitle", 10)
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    substringFn: function (ele, len) {
      var eleList = $('.' + ele)
      $.each(eleList, function (i, item) {
        var $item = $(item)
        var content = $item.html()
        if (content.length > len) {
          $item.empty().html(content.substring(0, len) + "...")
        }
      })
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
    initialize: function (opt) {
      var view = this;
      view.render();
      var qform = view.$el.find(".q-form");
      setTimeout(function () {
        //initiate date picker and make date constrain
        var startPicker = view.$el.find('.start-date').datepicker({
          language: 'zh-CN',
          format: 'yyyy-mm-dd',
          autoclose: 1,
          todayHighlight: 1
        }).on('changeDate', function (e) {
          endPicker.datepicker('setStartDate', e.date);
        });
        var endPicker = view.$el.find('.end-date').datepicker({
          language: 'zh-CN',
          format: 'yyyy-mm-dd',
          autoclose: 1,
          todayHighlight: 1
        }).on('changeDate', function (e) {
          startPicker.datepicker('setEndDate', e.date);
        });
      }, 100);
      $.ajax({
        // url: '/repair/get_select_data',
        url: '../static/js/src/data/get-select-data.json',
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode) {
            var optStr_source = "",
                optStr_user = "",
                optStr_rtype = "",
                optStr_status = "",
                optStr_tag = "";
            _.each(data.source_type_list, function (item, idx) {
              optStr_source += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            _.each(data.user_type_list, function (item, idx) {
              optStr_user += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            _.each(data.rtype_list, function (item, idx) {
              optStr_rtype += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            _.each(data.status_list, function (item, idx) {
              optStr_status += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            _.each(data.tag_list, function (item, idx) {
              optStr_tag += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            qform.find('select[name="source_type"]').append(optStr_source);
            qform.find('select[name="user_type"]').append(optStr_user);
            qform.find('select[name="rtype"]').append(optStr_rtype);
            qform.find('select[name="status"]').append(optStr_status);
            qform.find('select[name="tag"]').append(optStr_tag);
            view.todoQuery();
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
      data.moment = Moment
      this.$el.find(".repair-repairs-view .list-content").html(this.listTemplate(data));
      this.$el.find(".repair-repairs-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});
