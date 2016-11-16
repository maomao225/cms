/**
 * Created by dupeng on 15-5-28.
 */
define([
  'jquery',
  'backbone'
], function ($, Backbone) {
  'use strict';

  var Workspace = Backbone.Router.extend({
    routes: {
      '': 'initPanel',
      'homepage': 'homepageBanner',
      'homepage/banner': 'homepageBanner',
      'homepage/category': 'homepageCategory',
      'homepage/recommend': 'homepageRecommend',
      'homepage/microspecial': 'homepageSpecial',
      'homepage/fragment': 'homepageFragment',
      'homepage/recpost': 'homepagePost',
      'homepage/partner': 'homepagePartner',
      'community': 'communityPosts',
      'community/posts': 'communityPosts',
      'community/comments': 'communityComments',
      'community/f-comments': 'communityFcomments',
      'community/user': 'communityUser',
      'community/reports': 'communityReport',
      'community/tags': 'communityTags',
      'letter/letters': 'letterQuery',
      'letter/create': 'letterCreate',
      'message/messages': 'messageQuery',
      'message/create': 'messageCreate',
      'message/edit/:id': 'messageEdit',
      'message/pushemail': 'pushEmail',
      'admin': 'adminPanel',
      'admin/newuser': 'newUser',
      'admin/edituser/:id': 'editUser',
      'menu': 'menuPanel',
      'menu/newmenu': 'newMenu',
      'menu/editmenu/:id': 'editMenu',
      'resource': 'resourcePanel',
      'resource/newresource': 'newResource',
      'resource/editresource/:id': 'editResource',
      'role': 'rolePanel',
      'role/newrole': 'newRole',
      'role/editrole/:id': 'editRole',
      'school/schools': 'schoolPanel',
      'about/recruitment': 'aboutRecruitment',
      'mobile/banner': 'mobileBanner',
      'tv/special': 'tvSpecial',
      'tv/wisdom': 'tvWisdom',
      'courseinfo/all': 'couseinfoAll',
      'courseinfo/total': 'couseinfoTotal',
      'courseinfo/byschool': 'couseinfoByshcool',
      'courseinfo/bycourse': 'couseinfoBycourse',
      'courseinfo/download': 'couseinfoDownload',
      'repair/repairs': 'repairPanel',
      'certificates': 'certificatePanel',
      'certificates/edit/*id': 'editCertificates',
      'signatures': 'signaturePanel',
      'logos': 'logoPanel',
      'order/moocap': 'moocapOrder',
      'order/certificate': 'certOrder',
      'order/certificate/edit/:id': 'certOrderEdit',
      'order/refund': 'refundOrder',
      'coursecontent/survey': 'courseSurvey',
      'review/email': 'reviewEmail',
      'review/email/edit/:id': 'reviewEmailEdit',
      'review/email/detail/:id': 'reviewEmailDetail',
      'channel/event': 'eventPanel',
      'channel/event/create': 'eventCreate',
      'channel/event/edit/:id': 'eventEdit',
      'ecourse/plan': 'ecoursePlan',
      'ecourse/plan/create': 'createEcoursePlan',
      'ecourse/plan/edit/:id': 'editEcoursePlan',
      'ecourse/approve': 'ecourseApprove',
      'ecourse/student': 'approveStudent',
      'ecourse/weekly': 'ecourseWeekly'
    },
    initialize: function (opt) {
      var router = this;
      require(['src/views/nav'], function (nav) {
        new nav();
      });
    },
    execute: function (callback, args, name) {
      //unbind all events on main node for next view to be rendered
      $("#main").off();
      //destroy editor
      if (window.um && $("#" + window.um.id).length) {
        window.um.destroy();
      }
      if (!!window.tinymce && !!window.tinymce.activeEditor && $("#" + tinymce.activeEditor.id).length) {
        tinymce.remove('#' + tinymce.activeEditor.id);
      }
      //apply original callback
      if (callback) callback.apply(this, args);
    },

    initPanel: function () {
      require(['src/views/system/home'], function (view) {
        new view();
      });
    },
    homepageBanner: function () {
      require(['src/views/homepage/banner'], function (view) {
        new view();
      });
    },
    homepageCategory: function () {
      require(['src/views/homepage/category'], function (view) {
        new view();
      });
    },
    homepageRecommend: function () {
      require(['src/views/homepage/recommend'], function (view) {
        new view();
      });
    },
    homepageSpecial: function () {
      require(['src/views/homepage/special'], function (view) {
        new view();
      });
    },
    homepageFragment: function () {
      require(['src/views/homepage/fragment'], function (view) {
        new view();
      });
    },
    homepagePost: function () {
      require(['src/views/homepage/post'], function (view) {
        new view();
      });
    },
    homepagePartner: function () {
      require(['src/views/homepage/partner'], function (view) {
        new view();
      });
    },
    communityPosts: function () {
      require(['src/views/community/posts'], function (view) {
        new view();
      });
    },
    communityComments: function () {
      require(['src/views/community/comments'], function (view) {
        new view();
      });
    },
    communityFcomments: function () {
      require(['src/views/community/f-comments'], function (view) {
        new view();
      });
    },
    communityTags: function () {
      require(['src/views/community/tags'], function (view) {
        new view();
      });
    },
    communityUser: function () {
      require(['src/views/community/user'], function (view) {
        new view();
      });
    },
    communityReport: function () {
      require(['src/views/community/reports'], function (view) {
        new view();
      });
    },
    letterQuery: function () {
      require(['src/views/letter/letters'], function (view) {
        new view();
      });
    },
    letterCreate: function () {
      require(['src/views/letter/create'], function (view) {
        new view();
      });
    },
    //message related
    messageQuery: function () {
      require(['src/views/message/messages'], function (view) {
        new view();
      });
    },
    messageCreate: function () {
      require(['src/views/message/create'], function (view) {
        new view();
      });
    },
    messageEdit: function (msgId) {
      require(['src/views/message/edit'], function (view) {
        new view({msgId: msgId});
      });
    },
    pushEmail: function () {
      require(['src/views/message/pushemail'], function (view) {
        new view();
      });
    },
    //admin related
    adminPanel: function () {
      require(['src/views/system/admin'], function (view) {
        new view();
      });
    },
    newUser: function () {
      require(['src/views/system/newuser'], function (view) {
        new view();
      });
    },
    editUser: function (userId) {
      require(['src/views/system/edituser'], function (view) {
        new view({userId: userId});
      });
    },
    //menu related
    menuPanel: function () {
      require(['src/views/system/menu'], function (view) {
        new view();
      });
    },
    newMenu: function () {
      require(['src/views/system/newmenu'], function (view) {
        new view();
      });
    },
    editMenu: function (menuId) {
      require(['src/views/system/editmenu'], function (view) {
        new view({menuId: menuId});
      });
    },
    //resource related
    resourcePanel: function () {
      require(['src/views/system/resource'], function (view) {
        new view();
      });
    },
    newResource: function () {
      require(['src/views/system/newresource'], function (view) {
        new view();
      });
    },
    editResource: function (resourceId) {
      require(['src/views/system/editresource'], function (view) {
        new view({resourceId: resourceId});
      });
    },
    //role related
    rolePanel: function () {
      require(['src/views/system/role'], function (view) {
        new view();
      });
    },
    newRole: function () {
      require(['src/views/system/newrole'], function (view) {
        new view();
      });
    },
    editRole: function (roleId) {
      require(['src/views/system/editrole'], function (view) {
        new view({roleId: roleId});
      });
    },
    schoolPanel: function () {
      require(['src/views/school/schools'], function (view) {
        new view();
      });
    },
    aboutRecruitment: function () {
      require(['src/views/about/recruitment'], function (view) {
        new view();
      });
    },
    mobileBanner: function () {
      require(['src/views/mobile/banner'], function (view) {
        new view();
      });
    },
    tvSpecial: function () {
      require(['src/views/tv/special'], function (view) {
        new view();
      });
    },
    tvWisdom: function () {
      require(['src/views/tv/wisdom'], function (view) {
        new view();
      });
    },
    couseinfoAll: function () {
      require(['src/views/courseinfo/all'], function (view) {
        new view();
      });
    },
    couseinfoTotal: function () {
      require(['src/views/courseinfo/total'], function (view) {
        new view();
      });
    },
    couseinfoByshcool: function () {
      require(['src/views/courseinfo/byschool'], function (view) {
        new view();
      });
    },
    couseinfoBycourse: function () {
      require(['src/views/courseinfo/bycourse'], function (view) {
        new view();
      });
    },
    couseinfoDownload: function () {
      require(['src/views/courseinfo/download'], function (view) {
        new view();
      });
    },
    repairPanel: function () {
      require(['src/views/repair/repairs'], function (view) {
        new view();
      });
    },
    //certificate related
    certificatePanel: function () {
      require(['src/views/certificate/certificate'], function (view) {
        new view();
      });
    },
    editCertificates: function (id) {
      require(['src/views/certificate/edit'], function (view) {
        new view({cId: id});
      });
    },
    signaturePanel: function () {
      require(['src/views/certificate/signature'], function (view) {
        new view();
      });
    },
    logoPanel: function () {
      require(['src/views/certificate/logo'], function (view) {
        new view();
      });
    },
    moocapOrder: function () {
      require(['src/views/moocap/order'], function (view) {
        new view();
      });
    },
    certOrder: function () {
      require(['src/views/order/certificate'], function (view) {
        new view();
      });
    },
    certOrderEdit: function (id) {
      require(['src/views/order/editcertificate'], function (view) {
        new view({oId: id});
      });
    },
    refundOrder: function () {
      require(['src/views/order/refund'], function (view) {
        new view();
      });
    },
    courseSurvey: function () {
      require(['src/views/coursecontent/survey'], function (view) {
        new view();
      });
    },
    reviewEmail: function () {
      require(['src/views/review/email'], function (view) {
        new view();
      });
    },
    reviewEmailEdit: function (id) {
      require(['src/views/review/emailedit'], function (view) {
        new view({eId: id});
      });
    },
    reviewEmailDetail: function (id) {
      require(['src/views/review/emailedit'], function (view) {
        new view({eId: id, isRead: true});
      });
    },
    eventPanel: function () {
      require(['src/views/channel/event'], function (view) {
        new view();
      });
    },
    eventCreate: function () {
      require(['src/views/channel/editevent'], function (view) {
        new view();
      });
    },
    eventEdit: function (id) {
      require(['src/views/channel/editevent'], function (view) {
        new view({eId: id});
      });
    },
    ecoursePlan: function () {
      require(['src/views/ecourse/plan'], function (view) {
        new view();
      });
    },
    createEcoursePlan: function () {
      require(['src/views/ecourse/editplan'], function (view) {
        new view();
      });
    },
    editEcoursePlan: function (id) {
      require(['src/views/ecourse/editplan'], function (view) {
        new view({eId: id});
      });
    },
    ecourseApprove: function () {
      require(['src/views/ecourse/approve'], function (view) {
        new view();
      });
    },
    approveStudent: function () {
      require(['src/views/ecourse/student'], function (view) {
        new view();
      });
    },
    ecourseWeekly: function () {
      require(['src/views/ecourse/weekly'], function (view) {
        new view();
      });
    }
  });
  return Workspace;
});