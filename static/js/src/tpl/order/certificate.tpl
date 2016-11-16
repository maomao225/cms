<div class="cert-order-view">
  <form class="form-horizontal q-form">
    <div class="form-group">
      <div class="inline-desc">订单号：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="order_id">
      </div>
      <div class="inline-desc">用户名：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="username">
      </div>
      <div class="inline-desc">手机号：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="mobile">
      </div>
    </div>
    <div class="form-group">
      <div class="inline-desc">邮箱：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="email">
      </div>
      <div class="inline-desc">收件人：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="receiver">
      </div>
      <div class="inline-desc">发货状态：</div>
      <div class="col-xs-3">
        <select class="form-control" name="is_deliver">
          <option value="">全部</option>
          <option value="1">发货</option>
          <option value="2">未发货</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <div class="inline-desc">证书类型：</div>
      <div class="col-xs-3">
        <select class="form-control" name="credential_type">
          <option value="">全部</option>
          <option value="certificate">认证证书</option>
          <option value="paper">纸质证书</option>
        </select>
      </div>
      <div class="inline-desc">发票：</div>
      <div class="col-xs-3">
        <select class="form-control" name="invoice">
          <option value="">全部</option>
          <option value="1">有发票</option>
          <option value="0">无发票</option>
        </select>
      </div>
    </div>
    <div class="btn-row">
      <div class="col-xs-6 text-danger hint-block"></div>
      <div class="fr">
        <button type="button" class="btn btn-default export-cert-btn">批量下载证书</button>
        <button type="button" class="btn btn-default export-btn">导出订单</button>
        <button type="button" class="btn btn-default q-btn">查询</button>
      </div>
    </div>
  </form>
  <table class="table table-bordered table-xt">
    <thead>
    <tr>
      <th style="width: 4%;">
        <div class="checkbox-inline">
          <input type="checkbox" class="toggle-all">
        </div>
      </th>
      <th style="width: 8%;">订单号</th>
      <th style="width: 8%;">用户名</th>
      <th style="width: 8%;">用户id</th>
      <th style="width: 10%;">邮箱</th>
      <th style="width: 10%;">收件人/证书姓名</th>
      <th style="width: 10%;">联系电话</th>
      <th style="width: 10%;">运单号码</th>
      <th style="width: 8%;">需要发票</th>
      <th style="width: 10%;">收件地址</th>
      <th style="width: 8%;">证书预览</th>
      <th style="width: 6%;">操作</th>
    </tr>
    </thead>
    <tbody class="list-content"></tbody>
  </table>
  <nav class="page-content">
    <ul class="pagination">
      <li class="disabled"><a href="javascript:;"><span>&laquo;第1页</span></a></li>
      <li class="disabled"><a href="javascript:;"><span>&lt;上一页</span></a></li>
      <li><span class="page-desc">第0页，共0页</span></li>
      <li class="disabled"><a href="javascript:;"><span>下一页&gt;</span></a></li>
      <li class="disabled"><a href="javascript:;"><span>最后1页&raquo;</span></a></li>
    </ul>
    <div class="records-control">
      共0条数据，每页显示
      <select class="records-select">
        <option value="10">10条</option>
        <option value="20">20条</option>
        <option value="50">50条</option>
        <option value="100">100条</option>
      </select>
    </div>
  </nav>
</div>