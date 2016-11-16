<% _.each(list, function(course, idx) { %>
<tr data-course-id="<%= course.id %>">
	<td><%= course.course_id %></td>
	<td><%= course.name %></td>
	<td><%= course.course_type %></td>
	<td><%= course.course_status %></td>
	<td><%= course.org %></td>
	<td><%= course.open_times %></td>
	<td><%= course.start %></td>
	<td><%= course.end %></td>
	<td><%= course.length %></td>
	<td><%= course.week_enrollment_count %></td>
	<td><%= course.total_enrollment_count %></td>
	<td><%= course.certificate_count %></td>
	<td><%= course.finish_course_rate %></td>
	<td><a class="edit-link" href="javascript:;" data-course-id='<%= course.id %>'>编辑备注</a></td>
</tr>
<% }); %>