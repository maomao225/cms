<form class="form-horizontal slogan-form" onsubmit="return false;">
	<input type="hidden" name="slogan_id" value="<%= (typeof slogan_id == 'undefined') ? '' : slogan_id %>"/>
	<div class="form-group">
		<label class="inline-desc control-label">Slogan标题：</label>
		<div class="col-xs-9 input-group">
			<input type="text" class="form-control need-count" name="title" maxlength="12" value="<%= (typeof title == 'undefined') ? '' : title %>"/>
			<span class="input-group-addon"><span class="count-label"><%= (typeof title == 'undefined') ? 0 : title.length %></span>/12</span>
		</div>
	</div>
	<div class="form-group">
		<label class="inline-desc control-label">Slogan介绍：</label>
		<div class="col-xs-9 input-group">
			<input type="text" class="form-control need-count" name="description" maxlength="30" value="<%= (typeof description == 'undefined') ? '' : description %>"/>
			<span class="input-group-addon"><span class="count-label"><%= (typeof description == 'undefined') ? 0 : description.length %></span>/30</span>
		</div>
	</div>
	<div class="btn-row">
		<div class="col-xs-8 text-danger hint-block slogan-hint-block"></div>
		<div class="fr">
			<button type="button" class="btn btn-default save-slogan-btn">保存</button>
		</div>
	</div>
</form>
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
		<th style="width: 30%;">分类</th>
		<th style="width: 40%;">分类图片</th>
		<th style="width: 10%;">顺序</th>
		<th style="width: 20%;">操作</th>
	</tr>
	</thead>
	<tbody class="list-content">
	<% _.each(list, function(category, idx) { %>
	<tr data-category-id="<%= category.id %>">
		<td><%= category.category_name %></td>
		<td><a class="preview-link" href="javascript:;" data-image-url="<%= category.pic_url %>"><%= category.category_name %></a></td>
		<td><input class="order-input" type="text" value="<%= category.order %>" data-category-id="<%= category.id %>" maxlength="2"/></td>
		<td>
			<a class="edit-link" href="javascript:;" data-category-id="<%= category.id %>">编辑</a>
			<a class="delete-link" href="javascript:;" data-category-id="<%= category.id %>">删除</a>
		</td>
	</tr>
	<% }); %>
	</tbody>
</table>