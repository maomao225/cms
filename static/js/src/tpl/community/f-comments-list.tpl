<% _.each(list, function(comment, idx) { %>
<tr>
	<td><%= comment.plate_title %></td>
	<td><%= comment.topic_id %></td>
	<td><a href="http://www.xuetangx.com/community/post/<%= comment.topic_id %>" target="_blank"><%= comment.title %></a></td>
	<td><%= comment.nickname %></td>
	<td><%= comment.id %></td>
	<td><%= comment.content %></td>
	<td><%= comment.modified %></td>
	<td><a class="delete-link" href="javascript:;" data-comment-id="<%= comment.id %>">删除</a></td>
</tr>
<% }); %>