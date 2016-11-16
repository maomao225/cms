<% _.each(list, function(wisdom, idx) { %>
<tr data-wisdom-id="<%= wisdom.id %>">
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= wisdom.content %>"><%= wisdom.content.length > 10 ? wisdom.content.substr(0, 10) + '...' : wisdom.content %></a></td>
	<td><%= wisdom.date_start %></td>
	<td><%= wisdom.date_end %></td>
	<td><%= wisdom.created %></td>
	<td><%= wisdom.updated %></td>
	<td><input class="order-input" type="text" value="<%= wisdom.order %>" data-wisdom-id="<%= wisdom.id %>" maxlength="2"/></td>
	<td><span class="hide-status"><%= wisdom.enabled=="1"  ? '是' : '否' %></span></td>
	<td>
		<a class="edit-link" href="javascript:;" data-wisdom-id="<%= wisdom.id %>">编辑</a>
		<a class="toggle-status-link" href="javascript:;" data-wisdom-id="<%= wisdom.id %>" data-active-status="<%= wisdom.enabled %>"><%= wisdom.enabled=="1"  ? '隐藏' : '显示' %></a>
		<a class="delete-link" href="javascript:;" data-wisdom-id="<%= wisdom.id %>">删除</a>
	</td>
</tr>
<% }); %>