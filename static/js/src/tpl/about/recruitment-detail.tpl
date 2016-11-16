<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>职位名称：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="name" value="<%= (typeof name == 'undefined') ? '' : name %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>职位介绍：</label>
		<div class="col-xs-9">
			<textarea class="form-control" rows="3" name="introduction"><%= (typeof introduction == 'undefined') ? '' : introduction %></textarea>
		</div>
	</div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>