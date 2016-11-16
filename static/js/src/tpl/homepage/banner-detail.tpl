<form class="form-horizontal detail-form">
	<input type="hidden" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>Banner大图URL：</label>
		<div class="col-xs-7">
			<input type="text" class="form-control fileinput" name="original" value="<%= (typeof original == 'undefined') ? '' : original %>" readonly/>
		</div>
		<div class="col-xs-2">
			<button type="button" class="btn btn-default fileinput-button">
				<span>一键上传</span>
				<input class="fileupload-input" type="file" name="file">
			</button>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">背景色/背景URL：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="background" value="<%= (typeof background == 'undefined') ? '' : background %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">背景宽度：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="background_image_width" value="<%= (typeof background_image_width == 'undefined') ? '' : background_image_width %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">图片背景色：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="background_image_color" value="<%= (typeof background_image_color == 'undefined') ? '' : background_image_color %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>链接地址：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="page_url" value="<%= (typeof page_url == 'undefined') ? '' : page_url %>"/>
		</div>
	</div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>