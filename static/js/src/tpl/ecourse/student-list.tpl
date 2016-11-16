<% _.each(results, function(student, idx) { %>
<tr>
  <td><%= student.unique_code %></td>
  <td><%= student.nick_name %></td>
  <td><%= student.org_number %></td>
  <td><%= student.student_name %></td>
  <td><%= student.status_name %></td>
  <td><%= student.invalid_reason_name %></td>
  <td>
    <a class="edit-link" data-student-id="<%= student.id %>" href="javascript:;">编辑</a>
    <a class="delete-link" data-student-id="<%= student.id %>" href="javascript:;">删除</a>
  </td>
</tr>
<% }); %>