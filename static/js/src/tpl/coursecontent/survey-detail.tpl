<form class="form-horizontal detail-form">
	<input type="hidden" name="sid" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
	<div class="form-group">
		<label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>问卷名称：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="title" value="<%= (typeof title == 'undefined') ? '' : title %>"/>
		</div>
	</div>
	<div class="form-group">
		<label class="col-xs-3 control-label">问卷前言：</label>
		<div class="col-xs-9">
			<input type="text" class="form-control" name="preface" value="<%= (typeof preface == 'undefined') ? '' : preface %>"/>
		</div>
	</div>
    <div class="form-group">
        <label class="col-xs-3 control-label"><span class="required-text">*&nbsp;</span>提交按钮文案：</label>
        <div class="col-xs-9">
            <input type="text" class="form-control" name="submit_text" value="<%= (typeof submit_text == 'undefined') ? '' : submit_text %>"/>
        </div>
    </div>
    <div class="form-group">
        <label class="col-xs-3 control-label">问卷内容：</label>
        <div class="col-xs-9">
            <textarea class="form-control" name="content"><%= (typeof content == 'undefined') ? '' : content %></textarea>
        </div>
    </div>
	<div class="form-group">
		<div class="col-xs-9 text-danger hint-block"></div>
	</div>
</form>