<% _.each(list, function(partner, idx) { %>
<tr>
	<td><%= partner.name %></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= partner.pic_url %>"><%= partner.name %></a></td>
	<td><a href="<%= partner.url %>" target="_blank"><%= partner.url %></a></td>
	<td><input class="order-input" type="text" value="<%= partner.order %>" data-partner-id="<%= partner.id %>" maxlength="2"/></td>
	<td>
		<a class="edit-link" href="javascript:;" data-partner-id="<%= partner.id %>">编辑</a>
		<a class="delete-link" href="javascript:;" data-partner-id="<%= partner.id %>">删除</a>
	</td>
</tr>
<% }); %>