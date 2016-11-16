<div class="edit-event-view">
  <form class="form-horizontal content-form">
    <input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
    <% if(typeof id !== 'undefined') { %>
    <input type="hidden" name="status" value="2"/>
    <% } %>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">专题页url：</div>
      <div class="col-xs-10 input-group">
        <span class="input-group-addon">http://www.xuetangx.com/event/</span>
        <input type="text" class="form-control" name="name" maxlength="50" value="<%= (typeof name == 'undefined') ? '' : name %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">专题页标题：</div>
      <div class="col-xs-10">
        <input type="text" class="form-control" name="title" maxlength="200" value="<%= (typeof title == 'undefined') ? '' : title %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">搜索关键词：</div>
      <div class="col-xs-10">
        <input type="text" class="form-control" name="keywords" maxlength="200" placeholder="多个搜索关键词之间用空格分隔"
               value="<%= (typeof keywords == 'undefined') ? '' : keywords %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">Banner图片：</div>
      <div class="col-xs-8">
        <input type="text" class="form-control fileinput" name="banner" maxlength="200"
               value="<%= (typeof banner == 'undefined') ? '' : banner %>">
      </div>
      <div class="col-xs-2">
        <button type="button" class="btn btn-default fileinput-button">
          <span>一键上传</span>
          <input class="fileupload" type="file" name="file">
        </button>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">专题说明：</div>
      <div class="col-xs-10">
        <textarea class="form-control" name="introduction" rows="5" maxlength="400"><%= (typeof introduction == 'undefined') ? '' : introduction %></textarea>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">分享文案：</div>
      <div class="col-xs-10">
        <textarea class="form-control" name="share_copy" rows="5" maxlength="400"><%= (typeof share_copy == 'undefined') ? '' : share_copy %></textarea>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">专题页类型：</div>
      <div class="col-xs-10">
        <% if(typeof stype == 'undefined') { %>
        <select class="form-control" name="stype">
          <option value="">请选择</option>
        </select>
        <% } else {%>
        <select class="form-control" name="stype" disabled>
          <option value="<%= stype %>"><%= stype_name %></option>
        </select>
        <% } %>
      </div>
    </div>
    <div class="rec-list<%= (typeof stype == 'undefined') ? ' hidden' : (stype == 1 ? ' course' : ' post')%>">
      <% if(typeof recommend_list != 'undefined') { %>
      <% _.each(recommend_list, function(recblock, idx) { %>
      <div class="rec-item">
        <div class="form-group course-group">
          <div class="col-xs-2 inline-desc">课程id：</div>
          <div class="col-xs-10">
            <input type="text" class="form-control course-id" maxlength="50"
                   value="<%= (typeof recblock.course_id == 'undefined') ? '' : recblock.course_id %>">
          </div>
          <a href="javascript:;" class="remove-rec-link">删除</a>
        </div>
        <div class="form-group post-group">
          <div class="col-xs-2 inline-desc">帖子url：</div>
          <div class="col-xs-10">
            <input type="text" class="form-control post-url" maxlength="100"
                   value="<%= (typeof recblock.post_url == 'undefined') ? '' : recblock.post_url %>">
          </div>
          <a href="javascript:;" class="remove-rec-link">删除</a>
        </div>
        <div class="form-group">
          <div class="col-xs-2 inline-desc">推荐理由：</div>
          <div class="col-xs-10">
            <input type="text" class="form-control recommend" maxlength="400"
                   value="<%= (typeof recblock.recommend == 'undefined') ? '' : recblock.recommend %>">
          </div>
        </div>
      </div>
      <% }); %>
      <% } %>
      <div class="btn-row text-center">
        <button type="button" class="btn btn-default add-course-btn">添加课程id&推荐理由</button>
        <button type="button" class="btn btn-default add-post-btn">添加帖子url&推荐理由</button>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-offset-2 col-xs-10 text-danger hint-block"></div>
      <div class="col-xs-offset-2 col-xs-10 clear-left text-right">
        <button type="button" class="btn btn-default cancel-btn">取消</button>
        <button type="button" class="btn btn-default save-btn">保存</button>
      </div>
    </div>
  </form>
  <div class="modal fade preview-modal" id="preview-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">专题页预览</h4>
        </div>
        <div class="modal-body">
          <iframe src="" frameborder="0"></iframe>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
</div>