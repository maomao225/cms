<% _.each(list, function(fragment, idx) { %>
<tr data-fragment-id="<%= fragment.id %>">
	<td><%= fragment.title %></td>
	<td><%= fragment.frag_id %></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= fragment.pic_url %>"><%= fragment.title %></a></td>
	<td><%= fragment.course_id %></td>
	<td><input class="order-input" type="text" value="<%= fragment.order %>" data-fragment-id="<%= fragment.id %>" maxlength="2"/></td>
	<td>
		<a class="edit-link" href="javascript:;" data-fragment-id="<%= fragment.id %>">编辑</a>
		<a class="delete-link" href="javascript:;" data-fragment-id="<%= fragment.id %>">删除</a>
	</td>
</tr>
<% }); %>