<div class="cert-view">
	<form class="form-horizontal q-form">
		<div class="form-group">
			<div class="inline-desc fluid">搜索：</div>
			<div class="col-xs-4">
				<input type="text" class="form-control input-sm" name="course_key" placeholder="请输入课程名称、课程ID等关键字">
			</div>
			<div class="inline-desc fluid">发放状态：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm" name="status">
					<option value="">全部</option>
					<option value="1">已发放</option>
					<option value="0">未发放</option>
				</select>
			</div>
		</div>
		<div class="form-group">
			<div class="inline-desc fluid">排序：</div>
			<div class="col-xs-9">
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="order_type" value="1" checked>课程名称首字母升序
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="order_type" value="0">课程名称首字母降序
					</label>
				</div>
			</div>
		</div>
		<div class="btn-row">
			<div class="col-xs-6 text-danger hint-block"></div>
			<div class="fr">
				<button type="button" class="btn btn-default q-btn">查询</button>
			</div>
		</div>
	</form>
	<table class="table table-bordered table-xt">
		<thead>
			<tr>
				<th style="width: 20%;">课程名称</th>
				<th style="width: 20%;">课程ID</th>
				<th style="width: 20%;">发放状态</th>
				<th style="width: 20%;">学生成绩同步状态</th>
				<th style="width: 20%;">操作</th>
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