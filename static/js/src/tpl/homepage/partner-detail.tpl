<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>合作伙伴名称：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="name" value="<%= (typeof name == 'undefined') ? '' : name %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">合作伙伴url：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="url" value="<%= (typeof url == 'undefined') ? '' : url %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>合作伙伴图片：</label>
		<div class="col-xs-7">
			<input type="text" class="form-control fileinput" name="pic_url" value="<%= (typeof pic_url == 'undefined') ? '' : pic_url %>" readonly/>
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