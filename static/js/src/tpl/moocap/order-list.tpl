<% _.each(list, function(order, idx) { %>
<tr>
	<td><%= order.number %></td>
	<td><%= order.cost %></td>
	<td><%= order.status %></td>
	<td><%= order.payway %></td>
	<td><%= order.serial_number %></td>
	<td><%= order.exam_name %></td>
	<td><%= order.student_name %></td>
	<td><%= order.identity_type %></td>
	<td><%= order.identity %></td>
	<td><%= order.purchase_time ? moment(order.purchase_time).format('YYYY-MM-DD HH:mm:ss'): '' %></td>
	<td>
		<% if(order.status == 'refund-allowed') { %>
		<a class="refund-link" href="javascript:;" data-order-id="<%= order.number %>">退款</a>
		<% } %>
	</td>
</tr>
<% }); %>