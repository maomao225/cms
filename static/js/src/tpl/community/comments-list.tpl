<% _.each(list, function(comment, idx) { %>
<tr>
	<td><%- comment.post.author %></td>
	<td><%= comment.post.id %></td>
	<td><a href="http://www.xuetangx.com/community/post/<%= comment.post.id %>" target="_blank"><%- comment.post.title %></a></td>
	<td><%= comment.author %></td>
	<td><%= comment.id %></td>
	<td><%- comment.content %></td>
	<td><%= comment.createTime %></td>
	<td><a class="delete-link" href="javascript:;" data-comment-id="<%= comment.id %>">删除</a></td>
</tr>
<% }); %>