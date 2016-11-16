<% _.each(results, function(weekly, idx) { %>
<tr>
  <td><%= weekly.org_name %></td>
  <td><%= weekly.plan_name %></td>
  <td><%= weekly.course_list.join('<br/>') %></td>
  <td><%= weekly.update_time %></td>
  <td>
    <a class="download-link" href="<%= weekly.pdf_url %>" download>下载PDF</a>
    <a class="download-link" href="<%= weekly.zip_url %>" download>下载ZIP</a>
  </td>
</tr>
<% }); %>