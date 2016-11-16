<% _.each(list, function(letter, idx) { %>
<tr>
	<td><%= letter.sendTime %></td>
	<td><%= letter.title %></td>
	<td class="fix-width">
		<% _.each(letter.recipient, function(r, idx) { %>
		<%= r + ";" %>
		<% }); %>
	</td>
	<td><%= letter.sender %></td>
	<td><a class="detail-link" href="javascript:;" data-letter-id="<%= letter.id %>">查看详情</a></td>
</tr>
<% }); %>