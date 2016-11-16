<% _.each(results, function(order, idx) { %>
<tr>
  <td>
    <div class="checkbox-inline">
      <input type="checkbox" class="toggler" value="<%= order.order_id %>">
    </div>
  </td>
  <td><%= order.order_id %></td>
  <td><%= order.username %></td>
  <td><%= order.user_id %></td>
  <td><%= order.email %></td>
  <td><%= order.receiver + '/' + order.name %></td>
  <td><%= order.mobile %></td>
  <td><%= order.waybill %></td>
  <td><%= order.invoice %></td>
  <td><%= order.address %></td>
  <td>
    <% _.each(order.preview_list, function(course, idx){ %>
    <a href="/credential/preview?course_id=<%= encodeURIComponent(course.course_id) %>&is_paper=<%= course.is_paper %>&is_cert=<%= course.is_cert %>&is_excellent=<%= course.is_excellent %>" class="preview-link" target="_blank"><%= course.course_name %></a><br>
    <% }); %>
  </td>
  <td>
    <a class="edit-link" href="#order/certificate/edit/<%= order.order_id %>">编辑</a>
  </td>
</tr>
<% }); %>