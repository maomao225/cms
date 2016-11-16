<div class="role-view">
	<form class="form-horizontal q-form">
		<div class="form-group">
			<div class="inline-desc">角色名称：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm" name="name">
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-8 text-danger hint-block"></div>
			<div class="col-xs-4 text-right">
				<button type="button" class="btn btn-default q-btn">查询</button>
				<button type="button" class="btn btn-default new-btn">新增角色</button>
			</div>
		</div>
	</form>
	<table class="table table-bordered table-xt">
		<thead>
			<tr>
				<th style="width: 15%;">角色名称</th>
				<th style="width: 30%;">资源列表</th>
				<th style="width: 20%;">创建时间</th>
				<th style="width: 20%;">修改时间</th>
				<th style="width: 15%;">操作</th>
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
	<div class="modal fade confirm-modal" id="delete-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">删除提示</h4>
				</div>
				<div class="modal-body">
					<p class="confirm-desc">您确定要删除该角色？（删除后将无法恢复）</p>
					<div class="row">
						<button type="button" class="btn btn-default confirm-btn">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>