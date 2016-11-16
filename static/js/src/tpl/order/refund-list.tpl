<% _.each(results, function(order, idx) { %>
<tr>
  <td><%= order.order_id %></td>
  <td><%= order.username %></td>
  <td><%= order.user_id %></td>
  <td><%= order.email %></td>
  <td><%= order.course_name %></td>
  <td><%= order.reasons %></td>
  <td><%= order.created_at ? moment(order.created_at).format('YYYY-MM-DD HH:mm:ss'): '' %></td>
  <td><%= order.refunded_time ? moment(order.refunded_time).format('YYYY-MM-DD HH:mm:ss'): '' %></td>
  <td><%= order.status_name %></td>
  <td><%= order.operator %></td>
  <td>
    <% if(order.status == 'wait_refund') { %>
    <a class="refund-link" href="javascript:;" data-order-id="<%= order.order_id %>">退款</a>
    <% } %>
  </td>
</tr>
<% }); %>