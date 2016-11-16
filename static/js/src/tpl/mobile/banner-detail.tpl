<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>Banner名称：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="name" value="<%= (typeof name == 'undefined') ? '' : name %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>Banner介绍：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="introduction" value="<%= (typeof introduction == 'undefined') ? '' : introduction %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>Banner图片：</label>
		<div class="col-xs-7">
			<input type="text" class="form-control fileinput" name="image" value="<%= (typeof image == 'undefined') ? '' : image %>"/>
		</div>
		<div class="col-xs-2">
			<button type="button" class="btn btn-default fileinput-button">
				<span>一键上传</span>
				<input class="fileupload-input" type="file" name="file">
			</button>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>链接地址：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="loca" value="<%= (typeof loca == 'undefined') ? '' : loca %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">Banner类型：</label>
		<div class="col-xs-9">
			<select class="form-control input-sm" name="btype">
				<% _.each(btype_list, function(item, idx) { %>
				<option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
				<% }); %>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">所属终端：</label>
		<div class="col-xs-9">
			<select class="form-control input-sm" name="belong">
				<% _.each(belong_list, function(item, idx) { %>
				<option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
				<% }); %>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">渠道：</label>
		<div class="col-xs-9">
			<select class="form-control input-sm" name="channel">
				<% _.each(channel_list, function(item, idx) { %>
				<option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
				<% }); %>
			</select>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">TV端大图(选填)：</label>
		<div class="col-xs-7">
			<input type="text" class="form-control fileinput" name="image_big" value="<%= (typeof image_big == 'undefined') ? '' : image_big %>"/>
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