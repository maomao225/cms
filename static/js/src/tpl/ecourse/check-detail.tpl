<form class="form-horizontal detail-form">
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
    <label class="col-xs-3">校验学号CSV：</label>
    <div class="col-xs-3">
      <button type="button" class="btn btn-default fileinput-button">
        <span>选择附件</span>
        <input class="fileupload" type="file" name="student_file">
      </button>
    </div>
  </div>
  <div class="form-group">
    <div class="col-xs-offset-3 col-xs-9 hint-block text-danger"></div>
    <div class="col-xs-offset-3 col-xs-9">
      <a class="demo-link" target="_blank"></a>
    </div>
    <div class="col-xs-offset-3 col-xs-9 text-danger hint-block"></div>
  </div>
</form>