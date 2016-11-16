<div class="refund-order-view">
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
    </div>
    <div class="btn-row">
      <div class="col-xs-6 text-danger hint-block"></div>
      <div class="fr">
        <button type="button" class="btn btn-default export-btn">导出订单</button>
        <button type="button" class="btn btn-default q-btn">查询</button>
      </div>
    </div>
  </form>
  <table class="table table-bordered table-xt">
    <thead>
    <tr>
      <th style="width: 10%;">订单号</th>
      <th style="width: 8%;">用户名</th>
      <th style="width: 8%;">用户id</th>
      <th style="width: 8%;">邮箱</th>
      <th style="width: 10%;">课程名</th>
      <th style="width: 10%;">退款原因</th>
      <th style="width: 9%;">申请时间</th>
      <th style="width: 9%;">退款时间</th>
      <th style="width: 8%;">退款状态</th>
      <th style="width: 8%;">操作人</th>
      <th style="width: 8%;">操作</th>
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
  <div class="modal fade confirm-modal" id="refund-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">确认退款</h4>
        </div>
        <div class="modal-body">
          <p class="confirm-desc">您是否确定将订单编号为 <span class="order-number"></span> 的订单做退款处理？</p>

          <div class="row">
            <button type="button" class="btn btn-default confirm-refund-btn">确定</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>