<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label">分类名称：</label>
		<div class="col-xs-9">
			<select class="form-control input-sm" name="group_id">
				<% _.each(group_list, function(item, idx) { %>
				<option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.slug %></option>
				<% }); %>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>专题名称：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="name" value="<%= (typeof name == 'undefined') ? '' : name %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>专题介绍：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="slug" value="<%= (typeof slug == 'undefined') ? '' : slug %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>专题图片：</label>
		<div class="col-xs-7">
			<input type="text" class="form-control fileinput" name="cover_image" value="<%= (typeof cover_image == 'undefined') ? '' : cover_image %>" />
		</div>
		<div class="col-xs-2">
			<button type="button" class="btn btn-default fileinput-button">
				<span>一键上传</span>
				<input class="fileupload-input" type="file" name="file">
			</button>
		</div>
	</div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>