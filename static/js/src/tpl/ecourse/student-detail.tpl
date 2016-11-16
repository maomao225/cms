<form class="form-horizontal detail-form" data-student-id="<%= (typeof id == 'undefined') ? '' : id %>">
  <input type="hidden" name="org_id" value="<%= (typeof org_id == 'undefined') ? '' : org_id %>"/>
  <input type="hidden" name="plan_id" value="<%= (typeof plan_id == 'undefined') ? '' : plan_id %>"/>
  <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
  <div class="form-group">
    <label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>学堂号：</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" name="unique_code" value="<%= (typeof unique_code == 'undefined') ? '' : unique_code %>"/>
    </div>
  </div>
  <div class="form-group">
    <label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>学校学号：</label>
    <div class="col-xs-4">
      <input type="text" class="form-control" name="org_number" value="<%= (typeof org_number == 'undefined') ? '' : org_number %>"/>
    </div>
  </div>
  <div class="form-group">
    <div class="col-xs-9 text-danger hint-block"></div>
  </div>
</form>