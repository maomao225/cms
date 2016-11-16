/**
 * Created by dupeng on 15-12-15.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!src/tpl/certificate/edit.tpl',
  'text!src/tpl/certificate/signer.tpl',
  'text!src/tpl/certificate/signer-list.tpl',
  'moment',
  'bootstrap',
  'suggest',
  'datepicker_locale',
  'src/util'
], function ($, _, Backbone, tpl, signerTpl, signerListTpl, moment) {
  'use strict';

  var view = Backbone.View.extend({
    el: '#main',
    template: _.template(tpl),
    signerTemplate: _.template(signerTpl),
    signerListTemplate: _.template(signerListTpl),
    events: {
      'click .nav-section a': 'scrollToSection',
      'click .sync-stu-list': 'checkSyncStatus',
      'click .import-sync-result': 'importResult',
      'click .recalculate-result': 'recalculateResult',
      'click .save-stu-list': 'saveStudentsList',
      'click .sync-cert-text': 'syncText',
      'click .save-cert-text': 'saveText',
      'click .open-cert-image-modal': 'openImageModal',
      'click .save-cert-image-modal': 'saveImageModal',
      'click .save-cert-image': 'saveImage',
      'click .save-cert-date': 'saveDate',
      'click .collapse-toggler': 'toggleSigner',
      'click .delete-signer-btn': 'confirmDeleteSigner',
      'click .confirm-delete-btn': 'deleteSigner',
      'click .open-signer-image-modal': 'openSignerImageModal',
      'click .save-signer-image-modal': 'saveSignerImageModal',
      'click .sync-cert-signer': 'syncSigner',
      'click .add-cert-signer': 'addSigner',
      'click .save-cert-signer': 'saveSigner',
      'click .preview-cert': 'previewCert',
      'click .confirm-send-message': 'sendMessage',
      'click .save-cert-status-modal': 'saveStatus'
    },
    scrollToSection: function (e) {
      var $target = $(e.currentTarget);
      var $targetNode = $("section." + $target.data("nav-target"));
      var offset = $targetNode.position().top;
      $("html, body").animate({scrollTop: offset}, 600);
    },
    checkSyncStatus: function (e) {
      var $target = $(e.currentTarget);
      var syncStatus = $target.data("sync-status");
      var syncDate = $target.data("sync-date");
      var modal = $("#stu-sync-status-modal");
      if (syncStatus == 1) {
        modal.find(".status-wrap").html("<div class=\"status-text\">正在计算中，请在同步成功后导入结果</div>" +
            "<div>" +
            "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>" +
            "</div>");
        this.recalculateResult(false);
      } else if (syncStatus == 2) {
        modal.find(".status-wrap").html("<div class=\"status-text\">您已经申请过计算学生成绩结果，上次申请的时间为：" + syncDate + "</div>" +
            "<div>" +
            "<button type=\"button\" class=\"btn btn-default import-sync-result\">导入结果</button>" +
            "<button type=\"button\" class=\"btn btn-default recalculate-result\">重新计算</button>" +
            "</div>");
      } else if (syncStatus == 3) {
        modal.find(".status-wrap").html("<div class=\"status-text\">上次同步失败</div>" +
            "<div>" +
            "<button type=\"button\" class=\"btn btn-default recalculate-result\">重新计算</button>" +
            "</div>");
      } else if (syncStatus == 4) {
        modal.find(".status-wrap").html("<div class=\"status-text\">正在计算中，请在同步成功后导入结果</div>" +
            "<div>" +
            "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>" +
            "</div>");
      }
      modal.modal("show");
    },
    importResult: function (e) {
      var modal = $("#stu-sync-status-modal");
      modal.modal("hide");
      var form = modal.parents("section").find("form");
      this.syncStudentsList(form);
    },
    recalculateResult: function (e) {
      var modal = $("#stu-sync-status-modal");
      var form = modal.parents("section").find("form");
      var syncLabel = modal.parents("section").find(".sync-label");
      var syncBtn = form.find(".sync-stu-list");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      $.ajax({
        url: '../static/js/src/data/calculate-result.json',
        data: {
          course_id: param.course_id,
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            syncLabel.text(data.syn_student_status_name);
            syncBtn.data({
              "sync-status": data.syn_student_status,
              "sync-date": moment(data.last_syn_date).format('YYYY-MM-DD hh:mm:ss')
            });
            modal.find(".status-wrap").html("<div class=\"status-text\">正在计算中，请在同步成功后导入结果</div>" +
                "<div>" +
                "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>" +
                "</div>");
          } else {
            syncBtn.data({
              "sync-status": 3
            });
            modal.find(".status-wrap").html("<div class=\"status-text\">上次同步失败</div>" +
                "<div>" +
                "<button type=\"button\" class=\"btn btn-default recalculate-result\">重新计算</button>" +
                "</div>");
          }
          if (e) {
            modal.modal("hide");
          }
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    syncStudentsList: function (form) {
      var hint = form.find(".hint-block");
      var syncLabel = form.find(".sync-label");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        url: '../static/js/src/data/sync-students.json',
        data: {
          course_id: param.course_id,
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            form.find("[name=\"excellence_students\"]").val(data.excellence_students.join("\n"));
            form.find("[name=\"eligible_students\"]").val(data.eligible_students.join("\n"));
            hint.html("同步成功");
          } else {
            hint.html("<span class='text-danger'>" + data.msg + "</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    saveStudentsList: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var hint = form.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      if (( !isEmpty(param.excellence_students) && !isInteger(param.excellence_students.trim().replace(/\s*\r\n\s*/g, "")) ) || ( !isEmpty(param.eligible_students) && !isInteger(param.eligible_students.trim().replace(/\s*\r\n\s*/g, "")) )) {
        hint.html("<span class='text-danger'>列表只支持输入数字,请重新输入</span>");
        setTimeout(function () {
          hint.html("");
        }, 2000);
        return false;
      }
      $.ajax({
        loader: true,
        type: "post",
        url: '../static/js/src/data/edit-certificate.json',
        data: {
          excellence_students: param.excellence_students.split("\r\n"),
          eligible_students: param.eligible_students.split("\r\n")
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            hint.html("保存成功");
          } else {
            hint.html("<span class='text-danger'>保存失败</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    syncText: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var hint = form.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        url: '../static/js/src/data/edit-certificate.json',
        data: {
          course_id: param.course_id
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            for (var i in data) {
              form.find("input[name=\"" + i + "\"]").val(data[i]);
            }
            hint.html("同步成功");
          } else if (data.statusCode == 0) {
            //hint.html("同步成功");
          } else {
            hint.html("<span class='text-danger'>同步失败,请稍后重试</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    saveText: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var hint = form.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        type: "post",
        url: '../static/js/src/data/edit-certificate.json',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            hint.html("保存成功");
          } else {
            hint.html("<span class='text-danger'>保存失败,请稍后重试</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    openImageModal: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var targetForm = this.$el.find(".modal-cert-image-form");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);

      var logoInput = targetForm.find("input[name=\"elec_logo_url\"]"),
          nameInput = targetForm.find("input[name=\"elec_logo\"]"),
          logoImg = logoInput.siblings("img");
      logoInput.val(param.elec_logo_url);
      nameInput.val(param.elec_logo);
      logoImg.attr("src", param.elec_logo_url);
      var logoInput2 = targetForm.find("input[name=\"paper_logo_url\"]"),
          nameInput2 = targetForm.find("input[name=\"paper_logo\"]"),
          logoImg2 = logoInput2.siblings("img");
      logoInput2.val(param.paper_logo_url);
      nameInput2.val(param.paper_logo);
      logoImg2.attr("src", param.paper_logo_url);

      targetForm.find("input.logo-suggest-input").val("");
      form.parents("section").find(">.modal").modal("show");
    },
    saveImageModal: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var modal = $target.parents(".modal");
      var targetForm = this.$el.find(".cert-image-form");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);

      var logoInput = targetForm.find("input[name=\"elec_logo_url\"]"),
          nameInput = targetForm.find("input[name=\"elec_logo\"]"),
          logoImg = logoInput.siblings("img");
      logoInput.val(param.elec_logo_url);
      nameInput.val(param.elec_logo);
      logoImg.attr("src", param.elec_logo_url);
      var logoInput2 = targetForm.find("input[name=\"paper_logo_url\"]"),
          nameInput2 = targetForm.find("input[name=\"paper_logo\"]"),
          logoImg2 = logoInput2.siblings("img");
      logoInput2.val(param.paper_logo_url);
      nameInput2.val(param.paper_logo);
      logoImg2.attr("src", param.paper_logo_url);

      modal.modal("hide");
    },
    saveImage: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var hint = form.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      param = _.omit(param, ["elec_logo_url", "paper_logo_url"]);
      $.ajax({
        loader: true,
        type: "post",
        url: '../static/js/src/data/edit-certificate.json',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            hint.html("保存成功");
          } else {
            hint.html("<span class='text-danger'>" + data.msg + "</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    saveDate: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var hint = form.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        type: "post",
        url: '../static/js/src/data/edit-certificate.json',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            hint.html("保存成功");
          } else {
            hint.html("<span class='text-danger'>保存失败,请稍后重试</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    toggleSigner: function (e) {
      var target = $(e.currentTarget).find(".glyphicon"),
          panel = target.parents(".content-form").find(".signer-content");
      if (target.hasClass("glyphicon-triangle-bottom")) {
        target.toggleClass("glyphicon-triangle-bottom glyphicon-triangle-right");
        panel.collapse("hide");
      } else {
        target.toggleClass("glyphicon-triangle-bottom glyphicon-triangle-right");
        panel.collapse("show");
      }
    },
    confirmDeleteSigner: function (e) {
      $("#delete-modal").find(".confirm-delete-btn").data("form-element", $(e.currentTarget).data("form-element"));
      $("#delete-modal").modal("show");
    },
    deleteSigner: function (e) {
      var view = this;
      var target = $(e.currentTarget);
      var formElement = target.data("form-element");
      $("." + formElement).remove();
      $("#delete-modal").modal("hide");
    },
    openSignerImageModal: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var targetForm = this.$el.find(".modal-signer-image-form");
      targetForm.find(".save-signer-image-modal").data("form-element", $target.data("form-element"));
      var formValues = form.serialize();
      var param = qStrToJson(formValues);

      targetForm.find("input[name=\"signiture_zh_cn\"]").val(param.signiture_zh_cn);
      targetForm.find("input[name=\"signiture_url\"]").val(param.signiture_url);
      targetForm.find("img.signer-img").attr("src", param.signiture_url);
      targetForm.find("input.signer-suggest-input").val("");

      $("#signer-image-modal").modal("show");
    },
    saveSignerImageModal: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var modal = $target.parents(".modal");
      var targetForm = $("." + $target.data("form-element"));
      var formValues = form.serialize();
      var param = qStrToJson(formValues);

      targetForm.find("input[name=\"signiture_zh_cn\"]").val(param.signiture_zh_cn);
      targetForm.find(".signer-img-name").html(param.signiture_zh_cn);
      targetForm.find("input[name=\"signiture_url\"]").val(param.signiture_url);
      targetForm.find("img.signer-img").attr("src", param.signiture_url);
      modal.modal("hide");
    },
    syncSigner: function (e) {
      var view = this;
      var $target = $(e.currentTarget);
      var parent = $target.parents(".content-section");
      var hint = parent.find(".btn-row .hint-block");
      $.ajax({
        loader: true,
        url: '../static/js/src/data/edit-certificate.json',
        data: {
          course_id: parent.find("input[name=\"course_id\"]").val()
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            if (data.professor_list && data.professor_list.length > 0) {
              parent.find(".signer-list").html(view.signerListTemplate(data));
              $(".signer-content").collapse();
              hint.html("同步成功");
            } else {
              hint.html("无同步数据");
            }
          } else {
            //hint.html("同步失败");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    addSigner: function (e) {
      var $target = $(e.currentTarget);
      var parent = $target.parents(".content-section").find(".signer-list");
      parent.append(this.signerTemplate({idx: parent.find(".content-form").length}));
      $(".signer-content").collapse();
      if (parent.find(".content-form").length >= 5) {
        $target.prop("disabled", true);
      }
    },
    saveSigner: function (e) {
      var $target = $(e.currentTarget);
      var parent = $target.parents(".content-section");
      var forms = parent.find(".signer-list form");
      var hint = parent.find(".btn-row .hint-block");
      var dataArray = [];
      _.each(forms, function (form) {
        var formValues = $(form).serialize();
        var param = qStrToJson(formValues);
        param = _.omit(param, "signiture_url");
        dataArray.push(param);
      });
      var cursorIndex = 0;
      var flag = _.some(dataArray, function (signer, idx) {
        signer.name_zh_cn == "" ? cursorIndex = idx + 1 : 0;
        return signer.name_zh_cn == "";
      });
      if (flag) {
        hint.html("<span class='text-danger'>证书签证人" + cursorIndex + "的中文姓名不能为空!</span>");
        setTimeout(function () {
          hint.html("");
        }, 2000);
        return;
      }
      var param = {
        course_id: parent.find("input[name=\"course_id\"]").val(),
        professor_list: JSON.stringify(dataArray)
      };
      $.ajax({
        loader: true,
        type: "post",
        url: '../static/js/src/data/edit-certificate.json',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            hint.html("保存成功");
          } else {
            hint.html("<span class='text-danger'>" + data.msg + "</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    previewCert: function (e) {
      var $target = $(e.currentTarget);
      var form = $target.parents(".content-form");
      var hint = form.find(".hint-block");
      var formValues = form.serialize();
      var previewUrl = "/credential/preview" + "?";
      window.open(previewUrl + formValues);
    },
    sendMessage: function (e) {
      var $target = $(e.currentTarget);
      var modal = $("#confirm-send-message-modal");
      var form = $target.parents(".content-form");
      var hint = form.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        type: 'POST',
        url: '../static/js/src/data/edit-certificate.json',
        ///url: '/credential/send_credential_msg',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            hint.html("发送成功!");
          } else {
            hint.html("<span class='text-danger'>发送失败,请稍后重试</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    saveStatus: function (e) {
      var $target = $(e.currentTarget);
      var modal = $("#cert-status-modal");
      var form = $target.parents(".content-form");
      var hint = form.find(".hint-block");
      var formValues = form.serialize();
      var param = qStrToJson(formValues);
      $.ajax({
        loader: true,
        type: "post",
        url: '../static/js/src/data/edit-certificate.json',
        data: param,
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            var statusText = form.find("[name=\"status\"]:checked").data("status-text");
            $target.parents("section.cert-status").find(".status-text").text(statusText);
            modal.modal("hide");
          } else {
            hint.html("<span class='text-danger'>保存失败,请稍后重试</span>");
          }
          setTimeout(function () {
            hint.html("");
          }, 2000);
        },
        error: function (xhr, errorType, error) {
          hint.html("<span class='text-danger'>网络错误,请稍后重试</span>");
          setTimeout(function () {
            hint.html("");
          }, 2000);
        }
      });
    },
    initialize: function (opt) {
      var view = this;
      $.ajax({
        loader: true,
        url: '../static/js/src/data/edit-certificate.json',
        data: {
          course_id: opt.cId
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            //日期格式化
            data.list_info.last_syn_date = moment(data.list_info.last_syn_date).format('YYYY-MM-DD hh:mm:ss');
            data.date_info.issue_date = moment(data.date_info.issue_date).format('YYYY-MM-DD');
            view.render(data);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    initWidgets: function () {
      //初始化日期组件
      this.$el.find(".date-input").datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        autoclose: 1,
        todayHighlight: 1
      });
      //初始化搜索提示框组件
      this.$el.find(".logo-suggest-input").bsSuggest({
        //url: "/credential/get_logo_data?name=",
        url: "../static/js/src/data/logo-suggest.json?name=",
        getDataMethod: "url",
        showBtn: false,
        allowNoKeyword: false,
        effectiveFields: ["show_name"],
        idField: "id",
        keyField: "paper_url"
      }).on('onSetSelectValue', function (e, keyword) {
        var $input = $(this);
        var dataList = $input.data("bsSuggest").options.data.list;
        var form = $input.parents(".content-form");
        var elecInput = form.find("input[name=\"elec_logo_url\"]"),
            paperInput = form.find("input[name=\"paper_logo_url\"]");
        _.each(dataList, function (item) {
          if (keyword.id == item.id) {
            elecInput.val(item.elec_url);
            form.find("input[name=\"elec_logo\"]").val(item.name);
            elecInput.siblings("img").attr("src", item.elec_url);
            paperInput.val(item.paper_url);
            form.find("input[name=\"paper_logo\"]").val(item.name);
            paperInput.siblings("img").attr("src", item.paper_url);
          }
        });
      });
      this.$el.find(".signer-suggest-input").bsSuggest({
        //url: "/credential/get_sign_data?name=",
        url: "../static/js/src/data/signature-suggest.json?name=",
        getDataMethod: "url",
        showBtn: false,
        allowNoKeyword: false,
        effectiveFields: ["show_name"],
        idField: "name",
        keyField: "url"
      }).on('onSetSelectValue', function (e, keyword) {
        var $input = $(this);
        var form = $input.parents(".content-form");
        form.find("img.signer-img").attr("src", keyword.key);
        form.find("input[name=\"signiture_url\"]").val(keyword.key);
        form.find("input[name=\"signiture_zh_cn\"]").val(keyword.id);
      });
      $(".signer-content").collapse();
    },
    render: function (data) {
      this.$el.html(this.template(data));
      this.initWidgets();
    }
  });
  return view;
});