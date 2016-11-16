<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>合作院校名称：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="name" value="<%= (typeof name == 'undefined') ? '' : name %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>院校图片：</label>
		<div class="col-xs-7">
			<input type="text" class="form-control fileinput" name="cover_image" value="<%= (typeof cover_image == 'undefined') ? '' : cover_image %>" readonly/>
		</div>
		<div class="col-xs-2">
			<button type="button" class="btn btn-default fileinput-button">
				<span>一键上传</span>
				<input class="fileupload-input" type="file" name="file">
			</button>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">院校链接：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="link_url" value="<%= (typeof link_url == 'undefined') ? '' : link_url %>"/>
		</div>
	</div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>