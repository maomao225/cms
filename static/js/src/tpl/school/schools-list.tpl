<% _.each(list, function(school, idx) { %>
<tr>
	<td><%= school.name %></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= school.cover_image %>"><%= school.name %></a></td>
	<td><a href="<%= school.link_url %>" target="_blank"><%= school.link_url %></a></td>
	<td><input class="order-input" type="text" value="<%= school.order %>" data-school-id="<%= school.id %>" maxlength="2"/></td>
	<td>
		<a class="edit-link" href="javascript:;" data-school-id="<%= school.id %>">编辑</a>
		<a class="delete-link" href="javascript:;" data-school-id="<%= school.id %>">删除</a>
	</td>
</tr>
<% }); %>