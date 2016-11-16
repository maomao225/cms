<form class="form-horizontal tag-form">
	<input type="hidden" name="repair_id" value="<%= (typeof repair_id == 'undefined') ? '' : repair_id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>标签：</label>
		<div class="col-xs-8">
			<input type="text" class="form-control" name="tag" value="<%= (typeof tag == 'undefined') ? '' : tag %>"/>
		</div>
	</div>
	
	<div class="form-group">
		<div class="col-xs-6 text-danger hint-block"></div>
	</div>
</form>

