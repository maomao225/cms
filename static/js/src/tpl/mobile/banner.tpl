<div class="m-banner-view">
	<form class="form-horizontal q-form">
		<div class="form-group">
			<div class="inline-desc">Banner名称：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm" name="name">
			</div>
			<div class="inline-desc">状态：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm" name="is_active">
					<option value="">全部</option>
					<option value="1">显示</option>
					<option value="0">隐藏</option>
				</select>
			</div>
			<div class="inline-desc">banner类型：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm" name="btype">
					<option value="">全部</option>
				</select>
			</div>
		</div>
		<div class="form-group">
			<div class="inline-desc">所属终端：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm belong-select" name="belong">
					<option value="">全部</option>
				</select>
			</div>
			<div class="inline-desc">渠道：</div>
			<div class="col-xs-2">
				<select class="form-control input-sm" name="channel">
					<option value="">全部</option>
				</select>
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
				<th style="width: 12%;">Banner图片</th>
				<th style="width: 10%;">Banner介绍</th>
				<th style="width: 10%;">Banner类型</th>
				<th style="width: 10%;">链接地址</th>
				<th style="width: 8%;">所属终端</th>
				<th style="width: 8%;">渠道</th>
				<th style="width: 12%;">（TV端大图）</th>
				<th style="width: 8%;">顺序</th>
				<th style="width: 8%;">显示状态</th>
				<th style="width: 14%;">操作</th>
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
					<h4 class="modal-title">新建Banner</h4>
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
					<h4 class="modal-title">编辑Banner</h4>
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
					<p class="confirm-desc">您确定要删除该Banner？（删除后将无法恢复）</p>
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
					<p class="confirm-desc">确定要将<span class="belong"></span>端的数据发布到线上么？</p>
					<div class="row">
						<button type="button" class="btn btn-default publish-btn">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>