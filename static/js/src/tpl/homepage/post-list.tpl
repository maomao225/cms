<% _.each(list, function(post, idx) { %>
<tr>
	<td><%= post.post_id %></td>
	<td><%= post.title %></td>
	<td><%= post.category_name %></td>
	<td><%= post.hot_count %></td>
	<td><%= post.fromNow %></td>
	<td><input class="order-input" type="text" value="<%= post.order %>" data-post-id="<%= post.id %>" maxlength="2"/></td>
	<td>
		<a class="edit-link" href="javascript:;" data-post-id="<%= post.id %>">编辑</a>
		<a class="delete-link" href="javascript:;" data-post-id="<%= post.id %>">删除</a>
	</td>
</tr>
<% }); %>