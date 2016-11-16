<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<input type="hidden" class="previous-input" name="previous" value="<%= (typeof url_elec == 'undefined') ? '' : url_elec.substr(url_elec.lastIndexOf('/')+1) %>"/>
	<div class="form-group">
		<label class="col-xs-2 control-label"><span class="required-text">*&nbsp;</span>Logo名称：</label>
		<div class="col-xs-10">
			<input type="text" class="form-control" name="name" value="<%= (typeof name == 'undefined') ? '' : name %>"/>
		</div>
	</div>
	<div class="form-group">
		<input type="hidden" class="suffixinput" name="suffix" value="<%= (typeof suffix == 'undefined') ? '' : suffix %>"/>
		<div class="col-xs-6 img-group">
			<label class="control-label">电子证书Logo图片：</label>
			<img src="<%= (typeof url_elec == 'undefined') ? '' : url_elec %>" class="logo-img" alt="电子证书Logo图片"/>
			<input type="hidden" class="fileinput" name="url_elec" value="<%= (typeof url_elec == 'undefined') ? '' : url_elec %>"/>
			<% if(typeof id == 'undefined') { %>
			<div class="btn-row">
				<button type="button" class="btn btn-default fileinput-button">
					<span>更换图片</span>
					<input class="fileupload-input" type="file" name="file">
				</button>
			</div>
			<% } %>
		</div>
		<div class="col-xs-6 img-group">
			<label class="control-label">纸质证书Logo图片：</label>
			<img src="<%= (typeof url_paper == 'undefined') ? '' : url_paper %>" class="logo-img" alt="纸质证书Logo图片"/>
			<input type="hidden" class="fileinput" name="url_paper" value="<%= (typeof url_paper == 'undefined') ? '' : url_paper %>"/>
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