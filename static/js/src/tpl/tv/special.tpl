<div class="tv-special-view">
	<form class="form-horizontal q-form">
		<div class="form-group">
			<div class="inline-desc">类别分组：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm" name="group_id">
					<option value="">全部</option>
				</select>
			</div>
			<div class="inline-desc">分类名称：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm" name="name">
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
				<th style="width: 20%;">分类名称</th>
				<th style="width: 19%;">专题名称</th>
				<th style="width: 20%;">专题介绍</th>
				<th style="width: 19%;">专题图片</th>
				<th style="width: 8%;">顺序</th>
				<th style="width: 14%;">操作</th>
			</tr>
		</thead>
		<tbody class="list-content"></tbody>
	</table>
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
					<h4 class="modal-title">新建精品专题</h4>
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
					<h4 class="modal-title">编辑精品专题</h4>
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
					<p class="confirm-desc">您确定要删除该精品专题？（删除后将无法恢复）</p>
					<div class="row">
						<button type="button" class="btn btn-default confirm-delete-btn">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>