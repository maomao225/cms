<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>分类名称：</label>
		<div class="col-xs-9">
			<select class="form-control input-sm" name="category_id">
				<% _.each(category_list, function(item, idx) { %>
				<option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
				<% }); %>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>分类图片：</label>
		<div class="col-xs-7">
			<input type="text" class="form-control" name="pic_url" value="<%= (typeof pic_url == 'undefined') ? '' : pic_url %>" readonly/>
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