<div class="partner-school-view">
	<div class="btn-row">
		<div class="col-xs-8 text-danger hint-block list-hint-block"></div>
		<div class="fr">
			<button type="button" class="btn btn-default new-btn">新建</button>
			<button type="button" class="btn btn-default order-btn">刷新顺序</button>
		</div>
	</div>
	<table class="table table-bordered table-xt">
		<thead>
		<tr>
			<th style="width: 25%;">合作院校名称</th>
			<th style="width: 25%;">院校图片</th>
			<th style="width: 30%;">院校链接</th>
			<th style="width: 10%;">顺序</th>
			<th style="width: 10%;">操作</th>
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
	<div class="btn-row">
		<div class="fr">
			<button type="button" class="btn btn-default preview-btn">预览</button>
			<button type="button" class="btn btn-default confirm-publish-btn">发布</button>
		</div>
	</div>
	<div class="preview-panel school_list_page"></div>
	<div class="modal fade preview-modal" id="preview-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">图片预览</h4>
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
					<h4 class="modal-title">新建合作院校</h4>
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
					<h4 class="modal-title">编辑合作院校</h4>
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
					<p class="confirm-desc">您确定要删除该合作院校？（删除后将无法恢复）</p>
					<div class="row">
						<button type="button" class="btn btn-default confirm-delete-btn">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade confirm-modal" id="publish-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">发布提示</h4>
				</div>
				<div class="modal-body">
					<p class="confirm-desc">确定要将当前数据发布到线上么？</p>
					<div class="row">
						<button type="button" class="btn btn-default publish-btn">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>