<div class="courseinfo-bycourse-view">
	<h4>按课程统计</h4>
	<form class="form-horizontal q-form">
		<div class="form-group">
			<div class="inline-desc">开课开始时间：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm start-date" name="start_begin">
			</div>
			<div class="inline-desc fluid">至</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm end-date" name="start_end">
			</div>
		</div>
		<div class="form-group">
			<div class="inline-desc">课程类型：</div>
			<div class="col-xs-10">
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="course_type" value="all" checked>全部
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="course_type" value="mooc">经典MOOC
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="course_type" value="selfpaced">self-paced
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="course_type" value="edx">edX
					</label>
				</div>
			</div>
		</div>
		<div class="form-group">
			<div class="inline-desc">课程状态：</div>
			<div class="col-xs-10">
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="course_status" value="all" checked>全部
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="course_status" value="ing">开课中
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="course_status" value="pre">尚未开课
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="course_status" value="finish">已完结
					</label>
				</div>
			</div>
		</div>
		<div class="form-group">
			<div class="inline-desc">排序：</div>
			<div class="col-xs-10">
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="order_type" value="default" checked>全部
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="order_type" value="start_up">按开课时间升序
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="order_type" value="start_down">按开课时间降序
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="order_type" value="week_down">按当周报名人数降序
					</label>
				</div>
				<div class="radio-inline">
					<label>
						<input type="radio" class="q-radio" name="order_type" value="total">按累计报名人数降序
					</label>
				</div>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-6 text-danger hint-block"></div>
		</div>
		<div class="btn-row">
			<div class="link-panel fl">
				<a href="javascript:;" class="scroll-link active" data-scroll-target="basic">基本信息</a>
				<a href="javascript:;" class="scroll-link" data-scroll-target="time">时间信息</a>
			</div>
			<div class="fr">
				<button type="button" class="btn btn-default q-btn">查询</button>
				<button type="button" class="btn btn-default export-btn">导出数据</button>
			</div>
		</div>
	</form>
	<div class="fixed-container">
		<table class="table table-bordered table-xt" style="width: 138%;">
			<thead>
				<tr>
					<th style="width: 10%;" data-scroll-mark="basic">课程ID</th>
					<th style="width: 10%;">课程名称</th>
					<th style="width: 10%;">课程类型</th>
					<th style="width: 10%;">课程状态</th>
					<th style="width: 10%;">学校</th>
					<th style="width: 10%;">开课次数</th>
					<th style="width: 9%;" data-scroll-mark="time">开课时间</th>
					<th style="width: 9%;">结课时间</th>
					<th style="width: 10%;">课程周数</th>
					<th style="width: 10%;">当周报名人数</th>
					<th style="width: 10%;">累计报名人数</th>
					<th style="width: 10%;">获得证书人数</th>
					<th style="width: 10%;">结课率</th>
					<th style="width: 10%;">备注</th>
				</tr>
			</thead>
			<tbody class="list-content"></tbody>
		</table>
	</div>
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
	<div class="modal fade preview-modal" id="detail-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">编辑课程备注</h4>
				</div>
				<div class="modal-body">
					<p class="detail-content"></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default save-edit-btn">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
</div>