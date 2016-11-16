<% _.each(list, function(recruitment, idx) { %>
<tr data-recruitment-id="<%= recruitment.id %>">
	<td><%= recruitment.name %></td>
	<td><%= recruitment.created %></td>
	<td><%= recruitment.modified %></td>
	<td><%= recruitment.operator %></td>
	<td><input class="order-input" type="text" value="<%= recruitment.order %>" data-recruitment-id="<%= recruitment.id %>" maxlength="2"/></td>
	<td><span class="hide-status"><%= recruitment.is_active=="1"  ? '是' : '否' %></span></td>
	<td>
		<a class="edit-link" href="javascript:;" data-recruitment-id="<%= recruitment.id %>">编辑</a>
		<a class="toggle-status-link" href="javascript:;" data-recruitment-id="<%= recruitment.id %>" data-active-status="<%= recruitment.is_active %>"><%= recruitment.is_active=="1"  ? '隐藏' : '显示' %></a>
		<a class="delete-link" href="javascript:;" data-recruitment-id="<%= recruitment.id %>">删除</a>
	</td>
</tr>
<% }); %>