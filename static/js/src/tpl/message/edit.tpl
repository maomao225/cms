<div class="create-message">
	<form class="form-horizontal content-form">
		<input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>"/>
		<div class="form-group">
			<div class="col-xs-2 inline-desc">收信人ID：</div>
			<div class="col-xs-5">
				<input type="text" class="form-control input-sm" name="user_ids" value="<%= (typeof user_ids == 'undefined') ? '' : user_ids.join(';') %>">
			</div>
			<div class="col-xs-2">
				<button type="button" class="btn btn-default fileinput-button upload-btn">
					<span>一键上传</span>
					<input id="fileupload" type="file" name="files">
				</button>
			</div>
			<div class="col-xs-3">
				<div class="add-desc">点击按钮可导入Excel文件中的收件人ID。</div>
			</div>
			<div class="col-xs-offset-2 col-xs-5 clear-left">
				<div class="add-desc">支持同时输入多个ID，ID之间请用;(半角英文分号)隔开。例：236626;178787;127719;118899</div>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc">课程ID：</div>
			<div class="col-xs-5">
				<input type="text" class="form-control input-sm" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>">
			</div>
			<div class="col-xs-offset-2 col-xs-5 clear-left">
				<div class="add-desc">收信人ID与课程ID需选填其中一个</div>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>站内信类型：</div>
			<div class="col-xs-5">
				<% _.each(channel_list, function(item, idx) { %>
				<div class="checkbox">
					<label>
						<input type="checkbox" name="channel" value="<%= item.id %>" <%= item.is_checked ? "checked" : "" %>><%= item.name %>
					</label>
				</div>
				<% }); %>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>标题：</div>
			<div class="col-xs-5">
				<input type="text" class="form-control input-sm need-count" name="title" maxlength="40" value="<%= (typeof title == 'undefined') ? '' : title %>">
			</div>
			<div class="col-xs-offset-2 col-xs-5 clear-left">
				<div class="add-desc">当前已输入<span class="current-chars"><%= (typeof title == 'undefined') ? 0 : title.length %></span>个字符, 还可以输入<span class="remain-chars"><%= (typeof title == 'undefined') ? 40 : 40-title.length %></span>个字符。</div>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>正文：</div>
			<div class="col-xs-10">
				<textarea id="message-editor" name="content" class="content-area need-count" maxlength="1000"></textarea>
			</div>
			<div class="col-xs-offset-2 col-xs-5 clear-left">
				<div class="add-desc editor-desc">当前已输入<span class="current-chars"><%= (typeof content == 'undefined') ? 0 : content.replace(/<\/?[^>]*>/g, "").length %></span>个字符, 还可以输入<span class="remain-chars"><%= (typeof content == 'undefined') ? 1000 : 1000-content.replace(/<\/?[^>]*>/g, "").length %></span>个字符。</div>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc">超链提示：</div>
			<div class="col-xs-2">
				<input type="text" class="form-control input-sm need-count" name="button" maxlength="4" value="<%= (typeof button == 'undefined') ? '' : button %>">
			</div>
			<div class="col-xs-5">
				<div class="add-desc inline-desc">当前已输入<span class="current-chars"><%= (typeof button == 'undefined') ? 0 : button.length %></span>个字符, 还可以输入<span class="remain-chars"><%= (typeof button == 'undefined') ? 4 : 4-button.length %></span>个字符。</div>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc">超链地址：</div>
			<div class="col-xs-5">
				<input type="text" class="form-control input-sm" name="link" value="<%= (typeof link == 'undefined') ? '' : link %>">
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-offset-2 col-xs-10 text-danger hint-block"></div>
			<div class="col-xs-offset-2 col-xs-10 clear-left">
				<button type="button" class="btn btn-default send-btn">保存</button>
				<button type="button" class="btn btn-default cancel-btn">取消</button>
			</div>
		</div>
	</form>
</div>