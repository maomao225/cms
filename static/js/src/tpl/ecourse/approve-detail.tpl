<form class="form-horizontal detail-form" data-approve-id="<%= (typeof id == 'undefined') ? '' : id %>">
  <% if(typeof isEdit != 'undefined' && isEdit) { %>
  <div class="form-group">
    <label class="col-xs-3">学校名称：</label>
    <div class="col-xs-3">
      <select class="form-control" name="org_id" disabled>
        <% _.each(org_list, function(item, idx) { %>
        <option value="<%= item.org_id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
        <% }); %>
      </select>
    </div>
  </div>
  <div class="form-group">
    <label class="col-xs-3">选修计划-课程：</label>
    <div class="col-xs-3">
      <select class="form-control" name="plan_id" disabled>
        <% _.each(plan_list, function(item, idx) { %>
        <option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
        <% }); %>
      </select>
    </div>
    <div class="col-xs-3">
      <select class="form-control" name="course_id" disabled>
        <% _.each(course_list, function(item, idx) { %>
        <option value="<%= item.course_id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.course_name %></option>
        <% }); %>
      </select>
    </div>
  </div>
  <div class="form-group">
    <label class="col-xs-3">导入名单：</label>
    <div class="col-xs-4">
      <textarea class="form-control" rows="3" name="student_list" readonly><%= JSON.stringify(student_list) %></textarea>
    </div>
    <div class="col-xs-3">
      <button type="button" class="btn btn-default fileinput-button import-btn">
        <span>选择附件</span>
        <input class="fileupload" type="file" name="student_file">
      </button>
    </div>
  </div>
  <% } else { %>
  <div class="form-group">
    <label class="col-xs-3">学校名称：</label>
    <div class="col-xs-3">
      <select class="form-control" name="org_id"></select>
    </div>
  </div>
  <div class="form-group">
    <label class="col-xs-3">选修计划-课程：</label>
    <div class="col-xs-3">
      <select class="form-control" name="plan_id"></select>
    </div>
    <div class="col-xs-3">
      <select class="form-control" name="course_id"></select>
    </div>
  </div>
  <div class="form-group">
    <label class="col-xs-3">导入名单：</label>
    <div class="col-xs-4">
      <textarea class="form-control" rows="3" name="student_list" readonly></textarea>
    </div>
    <div class="col-xs-3">
      <button type="button" class="btn btn-default fileinput-button import-btn">
        <span>选择附件</span>
        <input class="fileupload" type="file" name="student_file">
      </button>
    </div>
  </div>
  <% } %>
  <div class="form-group">
    <div class="col-xs-offset-3 col-xs-9">
      <div class="text-danger">谨慎!导入名单会直接覆盖原有名单</div>
      <a href="<%= demo_file %>" class="demo-link" download>下载导入名单示例demo.csv</a>
    </div>
    <div class="col-xs-offset-3 col-xs-9 text-danger hint-block"></div>
  </div>
</form>