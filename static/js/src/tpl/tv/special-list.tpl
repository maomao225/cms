<% _.each(list, function(special, idx) { %>
<tr data-special-id="<%= special.id %>">
	<td><%= special.group_name %></td>
	<td><%= special.name %></td>
	<td><%= special.slug %></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= special.cover_image %>"><%= special.name %></a></td>
	<td><input class="order-input" type="text" value="<%= special.order %>" data-special-id="<%= special.id %>" maxlength="2"/></td>
	<td>
		<a class="edit-link" href="javascript:;" data-special-id="<%= special.id %>">编辑</a>
		<a class="delete-link" href="javascript:;" data-special-id="<%= special.id %>">删除</a>
	</td>
</tr>
<% }); %>