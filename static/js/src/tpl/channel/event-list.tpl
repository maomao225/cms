<% _.each(results, function(event, idx) { %>
<tr>
  <td><%= event.title %></td>
  <td><a href="<%= event.special_url %>" target="_blank"><%= event.special_url %></a></td>
  <td><a class="preview-image" href="javascript:;" data-image-url="<%= event.banner %>">活动海报</a></td>
  <td><%= (event.stype && event.stype == 1) ? '课程' : '帖子' %></td>
  <td><%= event.latest_publish_time %></td>
  <td><%= event.status_name %></td>
  <td>
    <a class="preview-link" data-event-url="<%= event.special_url %>" href="javascript:;">预览</a>
    <% if(event.status != 3){ %><a class="publish-link" data-event-id="<%= event.id %>" href="javascript:;">发布</a><% }
    %>
    <a href="#channel/event/edit/<%= event.id %>">编辑</a>
    <a class="delete-link" data-event-id="<%= event.id %>" href="javascript:;">删除</a>
  </td>
</tr>
<% }); %>