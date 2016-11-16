<% _.each(list, function(banner, idx) { %>
<tr data-banner-id="<%= banner.id %>">
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= banner.image %>"><%= banner.name %></a></td>
	<td><%= banner.introduction %></td>
	<td><%= banner.btype %></td>
	<td><a href="<%= banner.loca %>" target="_blank"><%= banner.name %></a></td>
	<td><%= banner.belong %></td>
	<td><%= (banner.channel && banner.channel != "") ? banner.channel : "--" %></td>
	<td>
		<% if(banner.image_big && banner.image_big != ""){ %>
		<a class="preview-link" href="javascript:;" data-image-url="<%= banner.image_big %>"><%= banner.name %></a>
		<% }else{ %>
		<%= "--" %>
		<% } %>
	</td>
	<td><input class="order-input" type="text" value="<%= banner.order %>" data-banner-id="<%= banner.id %>" maxlength="2"/></td>
	<td><span class="hide-status"><%= banner.is_active=="1"  ? '是' : '否' %></span></td>
	<td>
		<a class="edit-link" href="javascript:;" data-banner-id="<%= banner.id %>">编辑</a>
		<a class="toggle-status-link" href="javascript:;" data-banner-id="<%= banner.id %>" data-active-status="<%= banner.is_active %>"><%= banner.is_active=="1"  ? '隐藏' : '显示' %></a>
		<a class="delete-link" href="javascript:;" data-banner-id="<%= banner.id %>">删除</a>
	</td>
</tr>
<% }); %>