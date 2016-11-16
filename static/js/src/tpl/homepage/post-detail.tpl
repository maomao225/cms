<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>帖子id：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="post_id" value="<%= (typeof post_id == 'undefined') ? '' : post_id %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>帖子标题：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="title" value="<%= (typeof title == 'undefined') ? '' : title %>"/>
		</div>
	</div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>