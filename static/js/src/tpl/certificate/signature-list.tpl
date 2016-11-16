<% _.each(list, function(signature, idx) { %>
<tr>
	<td><%= signature.name %></td>
	<td><%= signature.suffix %></td>
	<td><a class="preview-link" href="javascript:;" data-image-url="<%= signature.url %>"><img src="<%= signature.url %>" alt="签字图片"/></a></td>
	<td><%= moment(signature.created).format('YYYY-MM-DD hh:mm:ss') %></td>
	<td>
		<a class="edit-link" href="javascript:;" data-signature-id="<%= signature.id %>">编辑</a>
		<a class="download-link" href="<%= signature.url %>" download>下载</a>
		<a class="delete-link" href="javascript:;" data-signature-id="<%= signature.id %>">删除</a>
	</td>
</tr>
<% }); %>