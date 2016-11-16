/**
 * Created by dupeng on 15-9-6.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'moment',
  'text!src/tpl/repair/detail.tpl',
  'text!src/tpl/repair/showimg.tpl',
  'fileupload'
], function ($, _, Backbone, Moment, tpl, imgtpl) {
  'use strict';

  var view = Backbone.View.extend({
    el: '#repair-detail',
    template: _.template(tpl),
    showImgTemplate: _.template(imgtpl),
    events: {
      'click .back-btn': 'closeDetail',
      'click .answer_user': 'answerUser',
      'click .back_list': 'backList',
      'click .showimg': 'showimg'
    },
    repairId: "",
    isedit: "",
    initialize: function (opt) {
      var view = this;
      view.repairId = opt.repairId;
      view.isedit = opt.isedit;
      $.ajax({
        loader: true,
        // url: 'repair/get_repair_detail',
        url: '../static/js/src/data/get-repair-detail.json',
        data: {
          repair_id: opt.repairId,
          is_edit: opt.isedit
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            view.render(data);
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error);
        }
      });
    },
    backList: function () {
      this.$el.off().hide().html('');
    },
    showimg: function (e) {
      var imgsrc = $(e.target).data('repair-img') || $(e.target).attr('src');
      var modal = $("#img-modal");
      var view = this;
      modal.find(".img-content").html(view.showImgTemplate({"imgsrc": imgsrc}));
      modal.modal("show");
    },
    validateDetail: function (ele) {
      var flag = true;
      var hint = $(".hint-block-textarea");
      var tagname = $(ele).val();
      if (tagname == "") {
        hint.css({display: "block", color: "#ff001e"}).text("回复内容不能为空！");
        setTimeout(function () {
          hint.css({display: "block"}).text("");
        }, 2000);
        flag = false;
        return flag;
      }
      return flag;
    },
    answerUser: function (e) {
      if (!this.validateDetail("#txtanswer")) {
        return false;
      }
      var picArr = [];
      $('.img-container .showimg').each(function(idx, ele){
        picArr.push($(ele).attr('src'));
      });
      var view = this;
      $.ajax({
        url: '/repair/answer',
        type: 'post',
        data: {
          "repair_id": view.repairId,
          "content": $('#txtanswer').val(),
          "pic_urls": picArr
        },
        dataType: "json",
        success: function (data, status) {
          if (data.statusCode > 0) {
            view.initialize({"repairId": view.repairId, "isedit": view.isedit})
          }
        },
        error: function (xhr, errorType, error) {
          console.log(error)
        }
      })
    },
    closeDetail: function () {
      this.$el.off().hide().html("");
    },
    render: function (data) {
      data.moment = Moment;
      this.$el.html(this.template(data));
      this.initUpload();
    },
    initUpload: function () {
      var view = this;
      var hint = $(".hint-block-textarea");
      this.$el.find(".upload_img").fileupload({
        // url: 'banner/upload',
        url: "../static/js/src/data/upload.json",
        dataType: 'json',
        add: function (e, data) {
          var goUpload = true;
          if (view.$el.find('.img-container .showimg').length >= 3) {
            hint.css({display: "block", color: "#ff001e"}).text("最多支持上传3张图片");
            goUpload = false;
            setTimeout(function () {
              hint.css({display: "block"}).text("");
            }, 2000);
          }
          var uploadFile = data.files[0];
          //file type validation
          if (!(/(\.|\/)(jpeg|jpg|gif|png)$/i).test(uploadFile.name)) {
            hint.css({display: "block", color: "#ff001e"}).text("仅支持图片格式文件，请重新选择");
            goUpload = false;
            setTimeout(function () {
              hint.css({display: "block"}).text("");
            }, 2000);
          }
          if (goUpload == true) {
            data.submit();
          }
        },
        done: function (e, data) {
          if (data.result) {
            $(this).parents('.repair-detail').find('.img-container').append('<img class="showimg" src="' + data.result.pic_url + '"/>');
          }
        },
        fail: function (e, data) {
          hint.css({display: "block", color: "#ff001e"}).text("上传失败，请稍后重试");
        }
      }).prop('disabled', !$.support.fileInput);
    }
  });
  return view;
});
