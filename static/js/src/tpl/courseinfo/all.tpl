<div class="courseinfo-all-view">
	<div class="btn-row">
		<div class="link-panel fl">
			<a href="javascript:;" class="scroll-link active" data-scroll-target="basic">基本信息</a>
			<a href="javascript:;" class="scroll-link" data-scroll-target="time">时间信息</a>
			<a href="javascript:;" class="scroll-link" data-scroll-target="additional">补充信息</a>
		</div>
		<div class="fr">
			<button class="btn btn-default export-btn">导出数据</button>
		</div>
	</div>
	<div class="fixed-container">
		<table class="table table-bordered table-xt" style="width: 212%;">
			<thead>
			<tr>
				<th style="width: 10%;" data-scroll-mark="basic">课程名称</th>
				<th style="width: 10%;">课程组织</th>
				<th style="width: 10%;">课程代码</th>
				<th style="width: 10%;">课程学期</th>
				<th style="width: 10%;">课程状态</th>
				<th style="width: 10%;">课程副标题</th>
				<th style="width: 18%;" data-scroll-mark="time">创建时间</th>
				<th style="width: 18%;">开放注册时间</th>
				<th style="width: 18%;">截止注册时间</th>
				<th style="width: 9%;">开课时间</th>
				<th style="width: 9%;">结课时间</th>
				<th style="width: 10%;" data-scroll-mark="additional">课程课时</th>
				<th style="width: 10%;">开课周数</th>
				<th style="width: 10%;">课程章节数</th>
				<th style="width: 10%;">所属平台</th>
				<th style="width: 20%;">教师信息</th>
				<th style="width: 10%;">知识点储备</th>
				<th style="width: 10%;">分类信息</th>
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
					<h4 class="modal-title">教师信息</h4>
				</div>
				<div class="modal-body">
					<p class="detail-content"></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				</div>
			</div>
		</div>
	</div>
</div>