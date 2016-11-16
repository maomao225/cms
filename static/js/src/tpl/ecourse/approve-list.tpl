<% _.each(results, function(approve, idx) { %>
<tr data-approve-id="<%= approve.id %>">
  <td><%= approve.org_name %></td>
  <td><%= approve.plan_name %></td>
  <td><%= approve.course_name %></td>
  <td class="student-count"><%= approve.student_count %></td>
  <td class="invalid-count"><%= approve.invalid_count %></td>
  <td><%= moment(approve.created).format('YYYY-MM-DD HH:mm:ss') %></td>
  <td><%= moment(approve.updated).format('YYYY-MM-DD HH:mm:ss') %></td>
  <td>
    <div class="link-wrap">
      <a class="view-link" data-org-id="<%= approve.org_id %>" data-plan-id="<%= approve.plan_id %>"
         data-course-id="<%= approve.course_id %>" data-org-name="<%= approve.org_name %>"
         data-plan-name="<%= approve.plan_name %>" data-course-name="<%= approve.course_name %>"
         data-demo-file="<%= demo_file %>" href="javascript:;">查看</a>
      <a class="download-link" data-org-id="<%= approve.org_id %>" data-plan-id="<%= approve.plan_id %>"
         data-course-id="<%= approve.course_id %>" href="javascript:;">下载</a>
      <a class="edit-link" data-approve-id="<%= approve.id %>" data-course-id="<%= approve.course_id %>"
         href="javascript:;">编辑</a>
      <a class="delete-link" data-approve-id="<%= approve.id %>" data-org-id="<%= approve.org_id %>"
         data-plan-id="<%= approve.plan_id %>" data-course-id="<%= approve.course_id %>" href="javascript:;">删除</a>
    </div>
  </td>
</tr>
<% }); %>