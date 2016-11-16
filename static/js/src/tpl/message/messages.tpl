<div class="messages-view">
	<form class="form-horizontal q-form">
		<div class="form-group">
			<div class="inline-desc">标题：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm" name="title" placeholder="标题">
			</div>
			<div class="inline-desc">发送人：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm" name="sender" placeholder="张三">
			</div>
			<div class="inline-desc">创建时间：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm start-date" name="created_start">
			</div>
			<div class="inline-desc fluid">至</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm end-date" name="created_end">
			</div>
		</div>
		<div class="form-group">
            <div class="inline-desc">ID：</div>
            <div class="col-xs-2">
                <input type="text" class="form-control input-sm" name="id" placeholder="ID">
            </div>
			<div class="inline-desc">发布状态：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm" name="task_status">
					<option value="">全部</option>
				</select>
			</div>
			<div class="inline-desc">执行状态：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm" name="release_status">
					<option value="">全部</option>
				</select>
			</div>
		</div>
		<div class="btn-row">
			<div class="col-xs-6 text-danger hint-block"></div>
			<div class="fr">
				<button type="button" class="btn btn-default q-btn">查询</button>
				<button type="button" class="btn btn-default c-btn">新建</button>
			</div>
		</div>
	</form>
	<table class="table table-bordered table-xt">
		<thead>
			<tr>
                <th style="width: 8%;">ID</th>
				<th style="width: 14%;">标题</th>
				<th style="width: 15%;">内容</th>
				<th style="width: 8%;">类型</th>
				<th style="width: 9%;">发布状态</th>
				<th style="width: 9%;">执行状态</th>
				<th style="width: 9%;">撤销状态</th>
				<th style="width: 9%;">创建日期</th>
				<th style="width: 8%;">发送人</th>
				<th style="width: 12%;">操作</th>
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
	<div id="message-detail" class="detail-block"></div>
	<div id="message-preview" class="preview-block"></div>

	<div class="modal fade confirm-modal" id="publish-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">发布提示</h4>
				</div>
				<div class="modal-body">
					<p class="confirm-desc">确定要发布该站内信？</p>
					<div class="row">
						<button type="button" class="btn btn-default publish-btn">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade confirm-modal" id="withdraw-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">撤销提示</h4>
				</div>
				<div class="modal-body">
					<p class="confirm-desc">确定要撤销该站内信？</p>
					<div class="row">
						<button type="button" class="btn btn-default withdraw-btn">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>