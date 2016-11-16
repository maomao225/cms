<% _.each(list, function(course, idx) { %>
<tr data-course-id="<%= course.id %>">
	<td><%= course.name %></td>
	<td><%= course.total_count %></td>
	<td><%= course.running_count %></td>
	<td><%= course.pre_count %></td>
	<td><%= course.finish_count %></td>
	<td><%= course.selfpaced_count %></td>
	<td><%= course.tv_count %></td>
	<td><%= course.edx_count %></td>
	<td><%= course.abandon_count %></td>
</tr>
<% }); %>