<% _.each(list, function(menu, idx) { %>
<tr>
	<td><%= menu.name %></td>
	<td><%= menu.mkey %></td>
	<td><%= menu.url %></td>
	<td><%= menu.resource_name %></td>
	<td><%= menu.parent_name %></td>
	<td><%= menu.order %></td>
	<td><%= menu.created %></td>
	<td><%= menu.modified %></td>
	<td>
		<a class="edit-link" href="#menu/editmenu/<%= menu.id %>">编辑</a>
		<a class="delete-link" href="javasript:;" data-menu-id="<%= menu.id %>">删除</a>
	</td>
</tr>
<% }); %>