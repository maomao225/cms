<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-2 control-label"><span class="required-text">*&nbsp;</span>签字名称：</label>
		<div class="col-xs-10">
			<input type="text" class="form-control" name="name" value="<%= (typeof name == 'undefined') ? '' : name %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-2 control-label"><span class="required-text">*&nbsp;</span>签字图片：</label>
		<div class="col-xs-10">
			<img src="<%= (typeof url == 'undefined') ? '' : url %>" class="signature-img" alt="签字图片"/>
			<input type="hidden" class="fileinput" name="url" value="<%= (typeof url == 'undefined') ? '' : url %>"/>
			<input type="hidden" class="suffixinput" name="suffix" value="<%= (typeof suffix == 'undefined') ? '' : suffix %>"/>
			<div class="btn-row">
				<button type="button" class="btn btn-default fileinput-button">
					<span>更换图片</span>
					<input class="fileupload-input" type="file" name="file">
				</button>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>