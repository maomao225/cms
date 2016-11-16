/**
 * Created by dupeng on 16-5-6.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'bootstrap',
  'text!src/tpl/ecourse/approve.tpl',
  'text!src/tpl/ecourse/approve-list.tpl',
  'text!src/tpl/ecourse/approve-detail.tpl',
  'text!src/tpl/ecourse/check-detail.tpl',
  'text!src/tpl/ecourse/pagination.tpl',
  'moment',
  'src/util',
  'fileupload'
], function ($, Backbone, _, bootstrap, tpl, listTpl, detailTpl, checkTpl, pageTpl, moment) {
  'use strict';

  var view = Backbone.View.extend({
    el: "#main",
    template: _.template(tpl),
    listTemplate: _.template(listTpl),
    detailTemplate: _.template(detailTpl),
    checkTemplate: _.template(checkTpl),
    pageTemplate: _.template(pageTpl),
    events: {
      'click .q-btn': 'startQuery',
      'change .modal [name="plan_id"]': 'modalPlanChange',
      'click .check-btn': 'initCheck',
      'click .new-btn': 'createApprove',
      'click .save-create-btn': 'saveCreate',
      'click .view-link': 'viewStudent',
      'click .download-link': 'downloadList',
      'click .edit-link': 'editApprove',
      'click .save-edit-btn': 'saveEdit',
      'click .delete-link': 'confirmDelete',
      'click .confirm-delete-btn': 'deleteApprove',
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
    modalPlanChange: function (e) {
      var modal = $(e.currentTarget).parents('.modal');
      $.ajax({
        //url: 'course/select_plan_course',
        url: '../static/js/src/data/approve-detail.json',
        data: {
          plan_id: $(e.currentTarget).val()
        },
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var optStr = '';
            _.each(data.course_list, function (item) {
              optStr += '<option value="' + item.course_id + '">' + item.course_name + '</option>';
            });
            modal.find('select[name="course_id"]').html(optStr);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    initCheck: function () {
      var modal = $("#check-modal");
      modal.find(".check-content").html(this.checkTemplate);
      var hint = modal.find(".hint-block");
      //init upload button
      modal.find('.fileupload').fileupload({
        //url: 'course/check_student_number',
        url: "../static/js/src/data/approve-upload.json",
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
            var form = $(this).parents("form");
            data.formData = {
              org_id: form.find('[name="org_id"]').val(),
              plan_id: form.find('[name="plan_id"]').val(),
              course_id: form.find('[name="course_id"]').val()
            };
            data.submit();
          }
        },
        done: function (e, data) {
          if (data.result) {
            var form = $(this).parents("form");
            form.find('.hint-block').html('请在10分钟内下载该链接');
            var downloadlink = 'course/check_student_number?';
            form.find('.demo-link').html('下载校验学号csv').attr('href', downloadlink + 'mem_key=' + encodeURIComponent(data.result.mem_key) + '&course_name=' + encodeURIComponent(form.find('select[name="course_id"] option:selected').text()));
          }
        }
      }).prop('disabled', !$.support.fileInput);
      modal.modal("show");
      $.ajax({
        loader: true,
        //url: 'course/org_list',
        url: '../static/js/src/data/approve-detail.json',
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var optStr = '';
            _.each(data.org_list, function (item) {
              optStr += '<option value="' + item.org_id + '">' + item.name + '</option>';
            });
            modal.find('select[name="org_id"]').html(optStr);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
      $.ajax({
        //url: 'course/select_plan_course',
        url: '../static/js/src/data/approve-detail.json',
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var optStr = '';
            _.each(data.plan_list, function (item) {
              optStr += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            modal.find('select[name="plan_id"]').html(optStr).trigger('change');
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    createApprove: function () {
      var modal = $("#create-modal");
      modal.find(".create-content").html(this.detailTemplate({demo_file: this.$el.find('.q-form').data('demo-file')}));
      var hint = modal.find(".hint-block");
      //init upload button
      modal.find('.fileupload').fileupload({
        //url: 'course/import_approve_student',
        url: "../static/js/src/data/approve-upload.json",
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
            var form = $(this).parents("form");
            data.formData = {
              org_id: form.find('[name="org_id"]').val(),
              plan_id: form.find('[name="plan_id"]').val(),
              course_id: form.find('[name="course_id"]').val()
            };
            data.submit();
          }
        },
        done: function (e, data) {
          if (data.result) {
            $(this).parents(".form-group").find('[name="student_list"]').val(JSON.stringify(data.result.student_list));
          }
        }
      }).prop('disabled', !$.support.fileInput);
      modal.modal("show");
      $.ajax({
        loader: true,
        //url: 'course/org_list',
        url: '../static/js/src/data/approve-detail.json',
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var optStr = '';
            _.each(data.org_list, function (item) {
              optStr += '<option value="' + item.org_id + '">' + item.name + '</option>';
            });
            modal.find('select[name="org_id"]').html(optStr);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
      $.ajax({
        //url: 'course/select_plan_course',
        url: '../static/js/src/data/approve-detail.json',
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var optStr = '';
            _.each(data.plan_list, function (item) {
              optStr += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            modal.find('select[name="plan_id"]').html(optStr).trigger('change');
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    saveCreate: function () {
      var modal = $("#create-modal");
      var form = modal.find(".detail-form");
      var hint = modal.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      var view = this;
      $.ajax({
        loader: true,
        type: "POST",
        //url: 'course/approve',
        url: '../static/js/src/data/approve-detail.json',
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            if (data.statusCode > 0) {
              modal.modal("hide");
              view.startQuery();
            } else if (data.statusCode == 0) {
              hint.text(data.msg);
              setTimeout(function () {
                hint.text("");
              }, 2000);
            }
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    viewStudent: function (e) {
      var $target = $(e.currentTarget);
      var approveInfo = {
        org_id: $target.data('org-id'),
        plan_id: $target.data('plan-id'),
        course_id: $target.data('course-id'),
        org_name: $target.data('org-name'),
        plan_name: $target.data('plan-name'),
        course_name: $target.data('course-name')
      };
      //set student storage
      sessionStorage.setItem('approveInfo', JSON.stringify(approveInfo));
      //navigate to student view
      location.hash = '#ecourse/student';
    },
    downloadList: function (e) {
      var downllink = 'course/export_approve_student?';
      var $target = $(e.currentTarget);
      var param = {
        org_id: $target.data('org-id'),
        plan_id: $target.data('plan-id'),
        course_id: $target.data('course-id')
      };
      window.open(downllink + 'org_id=' + encodeURIComponent(param.org_id) + '&plan_id=' + encodeURIComponent(param.plan_id) + '&course_id=' + encodeURIComponent(param.course_id));
    },
    editApprove: function (e) {
      var approveId = $(e.currentTarget).data("approve-id");
      var courseId = $(e.currentTarget).data("course-id");
      var modal = $("#edit-modal");
      var view = this;
      $.ajax({
        loader: true,
        //url: 'course/approve_detail/' + approveId,
        url: '../static/js/src/data/approve-detail.json?' + approveId,
        data: {
          course_id: courseId
        },
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            modal.find(".edit-content").html(view.detailTemplate(_.extend(data, {
              id: approveId,
              isEdit: true,
              demo_file: view.$el.find('.q-form').data('demo-file')
            })));
            var hint = modal.find(".hint-block");
            //init upload button
            modal.find('.fileupload').fileupload({
              //url: 'course/import_approve_student',
              url: "../static/js/src/data/approve-upload.json",
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
                  var form = $(this).parents("form");
                  data.formData = {
                    org_id: form.find('[name="org_id"]').val(),
                    plan_id: form.find('[name="plan_id"]').val(),
                    course_id: form.find('[name="course_id"]').val()
                  };
                  data.submit();
                }
              },
              done: function (e, data) {
                if (data.result) {
                  $(this).parents(".form-group").find('[name="student_list"]').val(JSON.stringify(data.result.student_list));
                }
              }
            }).prop('disabled', !$.support.fileInput);
            modal.modal("show");
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    saveEdit: function () {
      var modal = $("#edit-modal");
      var form = modal.find(".detail-form");
      var hint = modal.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      var approveId = form.data('approve-id');
      var view = this;
      $.ajax({
        loader: true,
        type: "PUT",
        //url: 'course/approve/' + approveId,
        url: '../static/js/src/data/approve-detail.json?' + approveId,
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            if (data.statusCode > 0) {
              modal.modal("hide");
              view.startQuery();
            } else if (data.statusCode == 0) {
              hint.text(data.msg);
              setTimeout(function () {
                hint.text("");
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
      var $target = $(e.currentTarget),
        approve_id = $target.data('approve-id'),
        org_id = $target.data('org-id'),
        plan_id = $target.data('plan-id'),
        course_id = $target.data('course-id'),
        modal = $("#delete-modal");
      modal.find(".confirm-delete-btn").data("approve-id", approve_id).data("org-id", org_id).data("plan-id", plan_id).data("course-id", course_id);
      modal.modal("show");
    },
    deleteApprove: function (e) {
      var view = this;
      var $target = $(e.currentTarget),
        approve_id = $target.data('approve-id'),
        org_id = $target.data('org-id'),
        plan_id = $target.data('plan-id'),
        course_id = $target.data('course-id');
      $.ajax({
        loader: true,
        type: 'DELETE',
        //url: 'course/approve_detail/' + approve_id,
        url: '../static/js/src/data/approve-list.json?' + approve_id,
        data: {
          org_id: org_id,
          plan_id: plan_id,
          course_id: course_id
        },
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
      var formValues = $(".ecourse-approve-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        //url: 'course/approve',
        url: '../static/js/src/data/approve-list.json',
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            view.pageInfo.totalPage = data.pages.totalPage;
            view.pageInfo.totalRecord = data.pages.totalRecord;
            view.renderResults(_.extend(data, {moment: moment}));
            view.$el.find('.q-form').data('demo-file', data.demo_file);
            view.asyncList();
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    asyncList: function () {
      var view = this;
      var formValues = $(".ecourse-approve-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
      var param = qStrToJson(formValues);
      $.ajax({
        //url: 'course/approve_count',
        url: '../static/js/src/data/approve-list.json',
        data: param,
        dataType: "json",
        success: function (data, status, xhr) {
          if (xhr.status >= 200 && xhr.status < 400) {
            var list = data.results;
            var container = view.$el.find('.list-content');
            _.each(list, function(item, idx){
              var tr = container.find('tr[data-approve-id="' + item.id + '"]');
              tr.find('.student-count').text(item.student_count);
              tr.find('.invalid-count').text(item.invalid_count);
            });
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
      //reset student storage
      sessionStorage.removeItem('approveInfo');
    },
    render: function () {
      this.$el.html(this.template);
    },
    renderResults: function (data) {
      this.$el.find(".ecourse-approve-view .list-content").html(this.listTemplate(data));
      this.$el.find(".ecourse-approve-view .page-content").html(this.pageTemplate(data));
    }
  });
  return view;
});