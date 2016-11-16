<div class="pushemail-view">
  <form class="form-horizontal content-form">
    <div class="form-group">
      <div class="col-xs-2 inline-desc">邮件组地址：</div>
      <div class="col-xs-10">
        <input type="text" class="form-control" name="toEmail" placeholder="Email list address">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">邮件名称：</div>
      <div class="col-xs-10">
        <input type="text" class="form-control" name="subject">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">模板名称：</div>
      <div class="col-xs-10">
        <input type="text" class="form-control" name="templateName" placeholder="Template name">
      </div>
    </div>
    <div class="btn-row">
      <div class="col-xs-6 text-danger hint-block"></div>
      <div class="col-xs-6 text-right">
        <button type="button" class="btn btn-default send-btn">发送邮件</button>
        <button type="reset" class="btn btn-default reset-btn">重置</button>
      </div>
    </div>
  </form>
  <div class="modal fade confirm-modal" id="success-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">发送提示</h4>
        </div>
        <div class="modal-body">
          <p class="confirm-desc">邮件发送成功</p>
          <div class="row">
            <button type="button" class="btn btn-default" data-dismiss="modal">我知道了</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>