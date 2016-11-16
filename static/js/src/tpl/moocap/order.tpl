<div class="moocap-order-view">
	<form class="form-horizontal q-form">
		<div class="form-group">
			<div class="inline-desc">下单时间：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm start-date" name="purchase_time_begin">
			</div>
			<div class="inline-desc fluid">至</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm end-date" name="purchase_time_end">
			</div>
			<div class="inline-desc">支付状态：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm" name="status">
					<option value="">全部</option>
					<option value="refund-allowed">同意退款</option>
					<option value="refunded">已退款</option>
				</select>
			</div>
		</div>
		<div class="form-group">
			<div class="inline-desc">搜索：</div>
			<div class="col-xs-6">
				<input type="text" class="form-control input-sm" name="key" placeholder="请输入订单编号\考试科目\证件号\学生姓名的关键字">
			</div>
		</div>
		<div class="btn-row">
			<div class="col-xs-6 text-danger hint-block"></div>
			<div class="fr">
				<button type="button" class="btn btn-default export-btn">导出订单信息</button>
				<button type="button" class="btn btn-default q-btn">查询</button>
			</div>
		</div>
	</form>
	<table class="table table-bordered table-xt">
		<thead>
			<tr>
				<th style="width: 9%;">订单编号</th>
				<th style="width: 9%;">订单金额</th>
				<th style="width: 9%;">支付状态</th>
				<th style="width: 9%;">支付方式</th>
				<th style="width: 9%;">支付流水号</th>
				<th style="width: 11%;">考试科目</th>
				<th style="width: 9%;">学生姓名</th>
				<th style="width: 9%;">证件类型</th>
				<th style="width: 9%;">证件号</th>
				<th style="width: 9%;">下单时间</th>
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