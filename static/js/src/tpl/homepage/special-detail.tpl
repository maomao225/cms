<form class="form-horizontal detail-form">
	<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>课程id：</label>
		<div class="col-xs-9 input-group">
			<input type="text" class="form-control" name="cid" value="<%= (typeof cid == 'undefined') ? '' : cid %>"/>
			<span class="input-group-addon">（请输入数据ID，非“TsinghuaX/30700313_2014X/2014_T2”）</span>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>课程名称：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="title" value="<%= (typeof title == 'undefined') ? '' : title %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>课程图片：</label>
		<div class="col-xs-7">
			<input type="text" class="form-control" name="pic_url" value="<%= (typeof pic_url == 'undefined') ? '' : pic_url %>" readonly/>
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