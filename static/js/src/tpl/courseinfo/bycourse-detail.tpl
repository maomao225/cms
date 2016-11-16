<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-2 control-label">备注内容：</label>
		<div class="col-xs-10">
			<textarea class="form-control" rows="3" name="remark"><%= (typeof remark == 'undefined') ? '' : remark %></textarea>
		</div>
	</div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>