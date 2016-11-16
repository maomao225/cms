<div class="h-post-view">
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
			<th style="width: 10%;">帖子id</th>
			<th style="width: 20%;">帖子标题</th>
			<th style="width: 15%;">帖子分类</th>
			<th style="width: 10%;">帖子热度</th>
			<th style="width: 15%;">创建时间</th>
			<th style="width: 10%;">顺序</th>
			<th style="width: 20%;">操作</th>
		</tr>
		</thead>
		<tbody class="list-content"></tbody>
	</table>
	<div class="btn-row">
		<div class="fr">
			<button type="button" class="btn btn-default preview-btn">预览</button>
			<button type="button" class="btn btn-default confirm-publish-btn">发布</button>
		</div>
	</div>
	<div class="preview-panel homepage"></div>
	<div class="modal fade create-modal" id="create-modal" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">新建推荐帖子</h4>
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
					<h4 class="modal-title">编辑推荐帖子</h4>
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
					<p class="confirm-desc">您确定要删除该条推荐么？（删除后将无法恢复）</p>
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