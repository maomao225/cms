/**
 * Created by dupeng on 15-12-15.
 */
define([
    'jquery',
    'backbone',
    'underscore',
    'bootstrap',
    'text!src/tpl/certificate/logo.tpl',
    'text!src/tpl/certificate/logo-list.tpl',
    'text!src/tpl/certificate/pagination.tpl',
    'text!src/tpl/certificate/logo-detail.tpl',
    'moment',
    'src/util',
    'fileupload'
], function ($, Backbone, _, bootstrap, tpl, listTpl, pageTpl, detailTpl, moment) {
    'use strict';

    var view = Backbone.View.extend({
        el: "#main",
        template: _.template(tpl),
        listTemplate: _.template(listTpl),
        pageTemplate: _.template(pageTpl),
        detailTemplate: _.template(detailTpl),
        events: {
            'click .q-btn': 'startQuery',
            'click .preview-link': 'previewImage',
            'click .delete-link': 'confirmDelete',
            'click .confirm-delete-btn': 'deleteLogo',
            'click .new-btn': 'addLogo',
            'click .save-create-btn': 'saveAdd',
            'click .edit-link': 'editLogo',
            'click .save-edit-btn': 'saveEdit',
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
        refreshList: function () {
            var view = this;
            var formValues = $(".logo-view .q-form").serialize() + "&psize=" + view.pageInfo.recordsPerPage + "&page=" + view.pageInfo.page;
            var param = qStrToJson(formValues);
            $.ajax({
                loader: true,
                url: '../static/js/src/data/logo-list.json',
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
        startQuery: function () {
            var title = this.$el.find("input[name='course_key']").val();
            if (title != "" && !checkStr(title)) {
                $(".hint-block").text("关键字不可输入特殊字符！");
                setTimeout(function () {
                    $(".hint-block").text("");
                }, 2000);
                return false;
            }
            this.pageInfo.page = 1;
            this.refreshList();
        },
        changePage: function(e){
            this.pageInfo.recordsPerPage = e.currentTarget.value;
            this.refreshList();
        },
        firstPage: function(){
            var view = this;
            if(view.pageInfo.page == 1)return;
            view.pageInfo.page = 1;
            view.refreshList();
        },
        prevPage: function(){
            var view = this;
            if(view.pageInfo.page != 1){
                view.pageInfo.page --;
                view.refreshList();
            }
        },
        nextPage: function(){
            var view = this;
            if(view.pageInfo.page < view.pageInfo.totalPage){
                view.pageInfo.page ++;
                view.refreshList();
            }
        },
        lastPage: function(){
            var view = this;
            if(view.pageInfo.page == view.pageInfo.totalPage)return;
            view.pageInfo.page = view.pageInfo.totalPage;
            view.refreshList();
        },
        initMultiUpload: function () {
            var view = this;
            var uploadBtn = this.$el.find(".q-form .fileupload-input"),
                hint = this.$el.find(".q-form .hint-block");
            uploadBtn.fileupload({
                url: "../static/js/src/data/upload.json",
                singleFileUploads: false,
                maxNumberOfFiles: 20,
                formData: {ptype: "logo"},
                dataType: 'json',
                add: function (e, data) {
                    var goUpload = true;
                    //file count validation
                    if (data.files.length > 20) {
                        hint.text("文件数量过多，单次最多可上传20张图片，请重新选择");
                        setTimeout(function () {
                            hint.text("");
                        }, 2000);
                        goUpload = false;
                        return false;
                    }
                    //file type validation
                    _.each(data.files, function(file){
                        if (!(/(\.|\/)(jpeg|jpg|gif|png)$/i).test(file.name)) {
                            hint.text("仅支持图片格式文件，请重新选择");
                            setTimeout(function () {
                                hint.text("");
                            }, 2000);
                            goUpload = false;
                            return false;
                        }
                    });
                    if (goUpload == true) {
                        data.submit();
                    }
                },
                done: function (e, data) {
                    if (data.result.statusCode > 0) {
                        view.startQuery();
                    } else  {
                        hint.html(data.result.msg);
                        setTimeout(function () {
                            hint.text("");
                        }, 2000);
                    }
                },
                fail: function (e, data) {
                    hint.html("上传失败，请重新上传");
                }
            }).prop('disabled', !$.support.fileInput);
        },
        previewImage: function (e) {
            var target = $(e.currentTarget);
            var imageUrl = target.data("image-url");
            var modal = $("#preview-modal");
            modal.find(".preview-content").html('<img src="' + imageUrl + '" alt="Logo预览"/>');
            modal.modal("show");
        },
        confirmDelete: function (e) {
            $("#delete-modal").find(".confirm-delete-btn").data("logo-id", $(e.currentTarget).data("logo-id"));
            $("#delete-modal").modal("show");
        },
        deleteLogo: function (e) {
            var view = this;
            var target = $(e.currentTarget);
            var logoId = target.data("logo-id");
            $.ajax({
                loader: true,
                url: '../static/js/src/data/logo-list.json',
                data: {
                    id: logoId
                },
                dataType: "json",
                success: function (data, status) {
                    if (data.statusCode) {
                        $("#delete-modal").modal("hide");
                        view.startQuery();
                    } else {
                        $("#delete-modal").modal("hide");
                        alertModal(data.msg);
                    }
                },
                error: function (xhr, errorType, error) {
                    console.log(error);
                }
            });
        },
        addLogo: function(){
            var modal = $("#create-modal");
            var view = this;
            modal.find(".create-content").html(view.detailTemplate({}));
            var hint = modal.find(".hint-block");
            //init upload button
            modal.find('.fileupload-input').fileupload({
                url: "../static/js/src/data/upload.json",
                formData: {ptype: "logo"},
                dataType: 'json',
                add: function (e, data) {
                    var goUpload = true;
                    var uploadFile = data.files[0];
                    //file type validation
                    if (!(/(\.|\/)(jpeg|jpg|gif|png)$/i).test(uploadFile.name)) {
                        modal.find(".hint-block").text("仅支持图片格式文件，请重新选择");
                        setTimeout(function () {
                            modal.find(".hint-block").text("");
                        }, 2000);
                        goUpload = false;
                    }
                    if (goUpload == true) {
                        var previous = $(this).parents("form").find('input.previous-input').val();
                        data.formData = {ptype: "logo", previous: previous};
                        data.submit();
                    }
                },
                done: function (e, data) {
                    if (data.result.statusCode > 0) {
                        $(this).parents(".img-group").find('.logo-img').attr("src", data.result.pic_url);
                        $(this).parents(".img-group").find('input.fileinput').val(data.result.pic_url);
                        $(this).parents("form").find('input.previous-input').val(data.result.pic_url.substr(data.result.pic_url.lastIndexOf('/')+1));
                        $(this).parents(".form-group").find('input.suffixinput').val(data.result.suffix);
                    } else {
                        hint.html(data.result.msg);
                        setTimeout(function () {
                            hint.html("");
                        }, 2000);
                    }
                },
                fail: function (e, data) {
                    hint.html("上传失败，请稍后重试");
                    setTimeout(function () {
                        hint.html("");
                    }, 2000);
                }
            }).prop('disabled', !$.support.fileInput);
            modal.modal("show");
        },
        saveAdd: function(){
            var form = $("#create-modal").find(".detail-form");
            if(!this.validateDetail(form)){
                return false;
            }
            var formValues = form.serialize();
            var param = qStrToJson(formValues);
            var view = this;
            $.ajax({
                loader: true,
                type: "post",
                url: '../static/js/src/data/tv-special-list.json',
                data: param,
                dataType: "json",
                success: function (data, status) {
                    if (data.statusCode > 0) {
                        $("#create-modal").modal("hide");
                        view.startQuery();
                    } else {
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
        editLogo: function (e) {
            var logoId = $(e.currentTarget).data("logo-id");
            var modal = $("#edit-modal");
            var view = this;
            $.ajax({
                loader: true,
                url: '../static/js/src/data/edit-logo.json',
                data: {
                    id: logoId
                },
                dataType: "json",
                success: function (data, status) {
                    if (data.statusCode) {
                        modal.find(".edit-content").html(view.detailTemplate(data));
                        var hint = modal.find(".hint-block");
                        //init upload button
                        modal.find('.fileupload-input').fileupload({
                            url: "../static/js/src/data/upload.json",
                            formData: {ptype: "logo"},
                            dataType: 'json',
                            add: function (e, data) {
                                var goUpload = true;
                                var uploadFile = data.files[0];
                                //file type validation
                                if (!(/(\.|\/)(jpeg|jpg|gif|png)$/i).test(uploadFile.name)) {
                                    modal.find(".hint-block").text("仅支持图片格式文件，请重新选择");
                                    setTimeout(function () {
                                        modal.find(".hint-block").text("");
                                    }, 2000);
                                    goUpload = false;
                                }
                                if (goUpload == true) {
                                    var previous = $(this).parents("form").find('input.previous-input').val();
                                    data.formData = {ptype: "logo", previous: previous};
                                    data.submit();
                                }
                            },
                            done: function (e, data) {
                                if (data.result.statusCode > 0) {
                                    $(this).parents(".img-group").find('.logo-img').attr("src", data.result.pic_url);
                                    $(this).parents(".img-group").find('input.fileinput').val(data.result.pic_url);
                                    $(this).parents("form").find('input.previous-input').val(data.result.pic_url.substr(data.result.pic_url.lastIndexOf('/')+1));
                                    $(this).parents(".form-group").find('input.suffixinput').val(data.result.suffix);
                                } else {
                                    hint.html(data.result.msg);
                                    setTimeout(function () {
                                        hint.html("");
                                    }, 2000);
                                }
                            },
                            fail: function (e, data) {
                                hint.html("上传失败，请稍后重试");
                                setTimeout(function () {
                                    hint.html("");
                                }, 2000);
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
            var form = $("#edit-modal").find(".detail-form");
            if (!this.validateDetail(form)) {
                return false;
            }
            var formValues = form.serialize();
            var param = qStrToJson(formValues);
            var view = this;
            $.ajax({
                loader: true,
                type: "POST",
                url: '../static/js/src/data/logo-list.json',
                data: param,
                dataType: "json",
                success: function (data, status) {
                    if (data.statusCode > 0) {
                        $("#edit-modal").modal("hide");
                        view.startQuery();
                    } else {
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
        validateDetail: function (form) {
            var flag = true;
            var hint = form.find(".hint-block");
            var logoname = form.find("input[name='name']").val();
            var url_elec = form.find("input[name='url_elec']").val();
            var url_paper = form.find("input[name='url_paper']").val();
            if (logoname == "") {
                hint.text("Logo名称不能为空！");
                setTimeout(function () {
                    hint.text("");
                }, 2000);
                flag = false;
                return flag;
            }
            if (url_elec == "") {
                hint.text("请选择电子证书Logo图片");
                setTimeout(function () {
                    hint.text("");
                }, 2000);
                flag = false;
                return flag;
            }
            if (url_paper == "") {
                hint.text("请选择纸质证书Logo图片");
                setTimeout(function () {
                    hint.text("");
                }, 2000);
                flag = false;
                return flag;
            }
            return flag;
        },
        initialize: function (opt) {
            this.render();
            this.startQuery();
        },
        render: function () {
            this.$el.html(this.template);
            this.initMultiUpload();
        },
        renderResults: function (data) {
            data.moment = moment;
            this.$el.find(".logo-view .list-content").html(this.listTemplate(data));
            this.$el.find(".logo-view .page-content").html(this.pageTemplate(data));
        }
    });
    return view;
});