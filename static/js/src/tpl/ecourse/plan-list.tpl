<% _.each(results, function(plan, idx) { %>
<tr>
  <td><%= plan.name %></td>
  <td><%= plan.status_name %></td>
  <td><%= plan.course_name_list.join('<br/>') %></td>
  <td><%= plan.data_start %></td>
  <td><%= plan.data_end %></td>
  <td><a class="download-link" href="<%= plan.introduction %>" download>课程简介</a></td>
  <td>
    <a href="#ecourse/plan/edit/<%= plan.id %>">编辑</a>
    <a class="delete-link" data-plan-id="<%= plan.id %>" href="javascript:;">删除</a>
  </td>
</tr>
<% }); %>