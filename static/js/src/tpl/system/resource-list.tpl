<% _.each(list, function(resource, idx) { %>
<tr>
	<td><%= resource.name %></td>
	<td><%= resource.system_name %></td>
	<td><%= resource.description %></td>
	<td><%= resource.created %></td>
	<td><%= resource.modified %></td>
	<td>
		<a class="edit-link" href="#resource/editresource/<%= resource.id %>">编辑</a>
		<a class="delete-link" href="javasript:;" data-resource-id="<%= resource.id %>">删除</a>
	</td>
</tr>
<% }); %>