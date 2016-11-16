<div class="edit-ecourse-plan-view">
  <h4>选修计划</h4>
  <form class="form-horizontal content-form">
    <input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">计划名称：</div>
      <div class="col-xs-10">
        <input type="text" class="form-control" name="name" value="<%= (typeof name == 'undefined') ? '' : name %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">课程列表：</div>
      <div class="col-xs-10">
        <textarea class="form-control" name="course_list" rows="5"><%= (typeof course_list == 'undefined') ? '' : course_list.join('\n') %></textarea>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">数据生成开始时间</div>
      <div class="col-xs-10">
        <input type="text" class="form-control start-date" name="data_start" value="<%= (typeof data_start == 'undefined') ? '' : data_start %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">数据生成结束时间</div>
      <div class="col-xs-10">
        <input type="text" class="form-control end-date" name="data_end" value="<%= (typeof data_end == 'undefined') ? '' : data_end %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">课程简介：</div>
      <div class="col-xs-8">
        <input type="text" class="form-control fileinput" name="introduction" value="<%= (typeof introduction == 'undefined') ? '' : introduction %>">
      </div>
      <div class="col-xs-2">
        <button type="button" class="btn btn-default fileinput-button">
          <span>选择附件</span>
          <input class="fileupload" type="file" name="course_file">
        </button>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-offset-2 col-xs-10 text-danger hint-block"></div>
      <div class="col-xs-offset-2 col-xs-10 clear-left text-left">
        <button type="button" class="btn btn-default cancel-btn">取消</button>
        <button type="button" class="btn btn-default save-btn">保存</button>
      </div>
    </div>
  </form>
</div>