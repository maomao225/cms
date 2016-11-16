<% _.each(list, function(user, idx) { %>
<tr>
	<td><%= user.real_name %></td>
	<td><%= user.name %></td>
	<td><%= user.email %></td>
	<td><%= user.phone ? user.phone : "---" %></td>
	<td><%= user.role %></td>
	<td><%= user.authorities.replace(/；/g, "；<br/>") %></td>
	<td><%= user.activestatus=="1" ? "开通" : "关闭" %></td>
	<td><a class="edit-link" href="#admin/edituser/<%= user.id %>">编辑</a></td>
</tr>
<% }); %>