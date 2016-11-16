<% _.each(list, function(logo, idx) { %>
<tr>
	<td><%= logo.name %></td>
	<td><%= logo.suffix %></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= logo.url_elec %>"><img src="<%= logo.url_elec %>" alt="电子证书Logo图片"/></a></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= logo.url_paper %>"><img src="<%= logo.url_paper %>" alt="纸质证书Logo图片"/></a></td>
	<td><%= moment(logo.created).format('YYYY-MM-DD HH:mm:ss') %></td>
	<td>
		<a class="edit-link" href="javascript:;" data-logo-id="<%= logo.id %>">编辑</a>
		<a class="download-link" href="<%= logo.url_elec %>" download>下载电子证书Logo</a>
		<a class="download-link" href="<%= logo.url_paper %>" download>下载纸质证书Logo</a>
		<a class="delete-link" href="javascript:;" data-logo-id="<%= logo.id %>">删除</a>
	</td>
</tr>
<% }); %>