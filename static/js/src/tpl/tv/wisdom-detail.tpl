<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>名人名言：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="content" value="<%= (typeof content == 'undefined') ? '' : content %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>开始轮播时间：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control start-date" name="date_start" value="<%= (typeof date_start == 'undefined') ? '' : date_start %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>结束轮播时间：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control end-date" name="date_end" value="<%= (typeof date_end == 'undefined') ? '' : date_end %>"/>
		</div>
	</div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>