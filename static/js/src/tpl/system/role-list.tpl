<% _.each(list, function(role, idx) { %>
<tr>
	<td><%= role.name %></td>
	<td><%= role.resources_name.replace(/;/g, ";<br/>") %></td>
	<td><%= role.created %></td>
	<td><%= role.modified %></td>
	<td>
		<a class="edit-link" href="#role/editrole/<%= role.id %>">编辑</a>
		<a class="delete-link" href="javasript:;" data-role-id="<%= role.id %>">删除</a>
	</td>
</tr>
<% }); %>