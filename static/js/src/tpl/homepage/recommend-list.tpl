<% _.each(list, function(recommend, idx) { %>
<tr data-recommend-id="<%= recommend.id %>">
	<td><%= recommend.cid %></td>
	<td><%= recommend.course_id %></td>
	<td><%= recommend.title %></td>
	<td><%= recommend.description %></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= recommend.pic_url %>"><%= recommend.title %></a></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= recommend.ref_url %>"><%= (typeof recommend.ref_url == 'undefined' || recommend.ref_url == '') ? '' : recommend.title %></a></td>
	<td><input class="order-input" type="text" value="<%= recommend.order %>" data-recommend-id="<%= recommend.id %>" maxlength="2"/></td>
	<td>
		<a class="edit-link" href="javascript:;" data-recommend-id="<%= recommend.id %>">编辑</a>
		<a class="delete-link" href="javascript:;" data-recommend-id="<%= recommend.id %>">删除</a>
	</td>
</tr>
<% }); %>