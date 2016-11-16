<div class="message-preview">
	<div class="message_item">
		<div class="item_wrap">
			<div class="msg_date">
				<span><%= created.substring(0, 10).replace(/-/g, ".") %></span>
			</div>
			<a class="msg_title"><%- title %></a>
			<div class="msg_content"><%= content %><a href="<%= link %>" target="_blank"><%= button %></a></div>
		</div>
	</div>
	<div>
		<button type="button" class="btn btn-default back-btn">返回</button>
	</div>
</div>