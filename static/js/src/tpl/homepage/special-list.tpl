<form class="form-horizontal special-form" onsubmit="return false;">
	<input type="hidden" name="special_id" value="<%= (typeof special_id == 'undefined') ? '' : special_id %>"/>
	<div class="form-group">
		<label class="inline-desc control-label">微专题名称：</label>
		<div class="col-xs-9 input-group">
			<input type="text" class="form-control need-count" name="title" maxlength="30" value="<%= (typeof title == 'undefined') ? '' : title %>"/>
			<span class="input-group-addon"><span class="count-label"><%= (typeof title == 'undefined') ? 0 : title.length %></span>/30</span>
		</div>
	</div>
	<div class="form-group">
		<label class="inline-desc control-label">微专题介绍：</label>
		<div class="col-xs-9 input-group">
			<input type="text" class="form-control need-count" name="description" maxlength="200" value="<%= (typeof description == 'undefined') ? '' : description %>"/>
			<span class="input-group-addon"><span class="count-label"><%= (typeof description == 'undefined') ? 0 : description.length %></span>/200</span>
		</div>
	</div>
	<div class="btn-row">
		<div class="col-xs-8 text-danger hint-block special-hint-block"></div>
		<div class="fr">
			<button type="button" class="btn btn-default save-special-btn">保存</button>
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
		<th style="width: 10%;">ID</th>
		<th style="width: 25%;">课程id</th>
		<th style="width: 20%;">课程名称</th>
		<th style="width: 20%;">课程图片</th>
		<th style="width: 10%;">顺序</th>
		<th style="width: 15%;">操作</th>
	</tr>
	</thead>
	<tbody class="list-content">
	<% _.each(list, function(course, idx) { %>
	<tr data-course-id="<%= course.id %>">
		<td><%= course.cid %></td>
		<td><%= course.course_id %></td>
		<td><%= course.title %></td>
		<td><a class="preview-link" href="javascript:;" data-image-url="<%= course.pic_url %>"><%= course.title %></a></td>
		<td><input class="order-input" type="text" value="<%= course.order %>" data-course-id="<%= course.id %>" maxlength="2"/></td>
		<td>
			<a class="edit-link" href="javascript:;" data-course-id="<%= course.id %>">编辑</a>
			<a class="delete-link" href="javascript:;" data-course-id="<%= course.id %>">删除</a>
		</td>
	</tr>
	<% }); %>
	</tbody>
</table>