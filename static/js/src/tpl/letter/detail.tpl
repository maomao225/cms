<div class="letter-detail">
	<div class="detail-row">
		<div class="col-xs-2">收信人ID：</div>
		<div class="col-xs-10 recipient-col">
			<span class="recipient-list">
			<% var recipientStr = ""; %>
			<% _.each(recipient, function(r, idx) { %>
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
		<div class="col-xs-10"><%= sendTime %></div>
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
		<div class="col-xs-10"><%= linklabel %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">超链地址：</div>
		<div class="col-xs-10"><%= linkaddress %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2"><button type="button" class="btn btn-default back-btn">返回</button></div>
	</div>
</div>