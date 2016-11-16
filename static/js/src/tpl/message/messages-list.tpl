<% _.each(list, function(message, idx) { %>
<tr data-message-id="<%= message.id %>">
    <td><%= message.id %></td>
	<td><%= message.title %></td>
	<td><%- message.content.replace(/<\/?[^>]*>/g, "").length > 10 ? message.content.substr(0, 10) + '...' : message.content.replace(/<\/?[^>]*>/g, "") %></td>
	<td><%= message.channel %></td>
	<td><span class="task-status"><%= message.task_status_name %></span></td>
	<td><span class="release-status"><%= message.release_status %></span></td>
	<td><span class="withdraw-status"><%= message.withdraw_status_name %></span></td>
	<td><%= message.created %></td>
	<td><%= message.sender %></td>
	<td>
		<a class="detail-link" href="javascript:;" data-message-id="<%= message.id %>">查看</a>
		<% if(message.channel.indexOf("letter") > -1){ %><a class="preview-link" href="javascript:;" data-message-id="<%= message.id %>">预览</a><% } %>
		<% if(message.task_status == "0"){ %><a class="task-status-link" href="javascript:;" data-message-id="<%= message.id %>">发布</a><% } %>
		<% if(message.task_status == "0"){ %><a class="release-status-link" href="#message/edit/<%= message.id %>">编辑</a><% } %>
		<% if(message.task_status == "1" && message.withdraw_status == "0"){ %><a class="withdraw-status-link" href="javascript:;" data-message-id="<%= message.id %>">撤回</a><% } %>
	</td>
</tr>
<% }); %>