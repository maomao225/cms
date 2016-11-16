<div class="message-detail">
	<div class="detail-row">
		<div class="col-xs-2">收信人ID：</div>
		<div class="col-xs-10 recipient-col">
			<span class="recipient-list">
			<% var recipientStr = ""; %>
			<% _.each(user_ids, function(r, idx) { %>
			<% recipientStr += r + ";\n"; %>
			<% }); %>
			<%= recipientStr.trim() %>
			</span>
			<span class="glyphicon glyphicon-triangle-bottom expand-icon"></span>
		</div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">发信人：</div>
		<div class="col-xs-10"><%= sender %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">发送时间：</div>
		<div class="col-xs-10"><%= created %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">标题：</div>
		<div class="col-xs-10"><%= title %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">正文：</div>
		<div class="col-xs-10"><%= content %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">超链提示：</div>
		<div class="col-xs-10"><%= button %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">超链地址：</div>
		<div class="col-xs-10"><%= link %></div>
	</div>
	<% if(course_id != null && course_id != ""){ %>
	<div class="detail-row">
		<div class="col-xs-2">课程id：</div>
		<div class="col-xs-10"><%= course_id %></div>
	</div>
	<% } %>
	<div class="detail-row">
		<div class="col-xs-2">站内信类型：</div>
		<div class="col-xs-10"><%= channel %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">发布状态：</div>
		<div class="col-xs-10"><%= task_status %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">执行状态：</div>
		<div class="col-xs-10"><%= release_status %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">开始执行时间：</div>
		<div class="col-xs-10"><%= start_time %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">执行完成时间：</div>
		<div class="col-xs-10"><%= end_time %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">撤销状态：</div>
		<div class="col-xs-10"><%= withdraw_status %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2"><button type="button" class="btn btn-default back-btn">返回</button></div>
	</div>
</div>