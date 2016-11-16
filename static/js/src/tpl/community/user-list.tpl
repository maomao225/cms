<% _.each(list, function(user, idx) { %>
<tr data-user-id="<%= user.id %>">
	<td><%= user.id %></td>
	<td><%= user.nickname %></td>
	<td><%= user.registerDate %></td>
	<td><span class="prohib-status"><%= user.isProhibit  ? '是' : '否' %></span></td>
	<td><a class="prohib-link" href="javascript:;" data-user-id="<%= user.id %>"><%= user.isProhibit ? '取消禁言' : '禁言' %></a></td>
	<td><a class="delete-avatar-link" href="javascript:;" data-user-id="<%= user.id %>"><%= user.hasAvatar ? '删除头像' : '' %></a></td>
</tr>
<% }); %>