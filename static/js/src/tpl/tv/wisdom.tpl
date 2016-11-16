<div class="tv-wisdom-view">
	<form class="form-horizontal q-form">
		<div class="form-group">
			<div class="inline-desc">轮播时间：</div>
			<div class="col-xs-4">
				<div class="radiobutton">
					<label>
						<input type="radio" class="q-radio" name="date_type" value="0" checked>全部
					</label>
				</div>
				<div class="radiobutton">
					<label>
						<input type="radio" class="q-radio" name="date_type" value="1">已过期
					</label>
				</div>
				<div class="radiobutton">
					<label>
						<input type="radio" class="q-radio" name="date_type" value="2">正在轮播
					</label>
				</div>
				<div class="radiobutton">
					<label>
						<input type="radio" class="q-radio" name="date_type" value="3">未开始
					</label>
				</div>
			</div>
			<div class="inline-desc">轮播开始时间：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm start-date" name="date_start">
			</div>
			<div class="inline-desc fluid">至</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm end-date" name="date_end">
			</div>
		</div>
		<div class="form-group">
			<div class="inline-desc">显示状态：</div>
			<div class="col-xs-5">
				<div class="radiobutton">
					<label>
						<input type="radio" class="q-radio" name="enabled_type" value="0" checked>全部
					</label>
				</div>
				<div class="radiobutton">
					<label>
						<input type="radio" class="q-radio" name="enabled_type" value="1">显示
					</label>
				</div>
				<div class="radiobutton">
					<label>
						<input type="radio" class="q-radio" name="enabled_type" value="2">隐藏
					</label>
				</div>
			</div>
		</div>
		<div class="btn-row">
			<div class="col-xs-6 text-danger hint-block"></div>
			<div class="fr">
				<button type="button" class="btn btn-default q-btn">查询</button>
				<button type="button" class="btn btn-default new-btn">新建</button>
				<button type="button" class="btn btn-default order-btn">保存顺序</button>
			</div>
		</div>
	</form>
	<table class="table table-bordered table-xt">
		<thead>
			<tr>
				<th style="width: 34%;">名人名言</th>
				<th style="width: 9%;">开始时间</th>
				<th style="width: 9%;">结束时间</th>
				<th style="width: 9%;">创建时间</th>
				<th style="width: 9%;">更新时间</th>
				<th style="width: 8%;">顺序</th>
				<th style="width: 8%;">显示状态</th>
				<th style="width: 14%;">操作</th>
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
	<div class="modal fade preview-modal" id="preview-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">名人名言</h4>
				</div>
				<div class="modal-body">
					<p class="preview-content"></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade create-modal" id="create-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">新建名人名言</h4>
				</div>
				<div class="modal-body">
					<div class="create-content"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default save-create-btn">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade edit-modal" id="edit-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">编辑名人名言</h4>
				</div>
				<div class="modal-body">
					<div class="edit-content"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default save-edit-btn">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade confirm-modal" id="delete-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">删除提示</h4>
				</div>
				<div class="modal-body">
					<p class="confirm-desc">您确定要删除该条名人名言？（删除后将无法恢复）</p>
					<div class="row">
						<button type="button" class="btn btn-default confirm-delete-btn">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>