<% _.each(list, function(course, idx) { %>
<tr data-course-id="<%= course.id %>">
	<td><%= course.name %></td>
	<td><%= course.org %></td>
	<td><%= course.course_num %></td>
	<td><%= course.run %></td>
	<td><%= course.course_status %></td>
	<td><%= course.subtitle %></td>
	<td><%= course.create_time %></td>
	<td><%= course.enrollment_start %></td>
	<td><%= course.enrollment_end %></td>
	<td><%= course.start %></td>
	<td><%= course.end %></td>
	<td><%= course.effort %></td>
	<td><%= course.length %></td>
	<td><%= course.chapter %></td>
	<td><%= course.owner %></td>
	<td><a class="detail-link" href="javascript:;" data-desc='<%= JSON.stringify(course.teacher_info) %>'>教师信息</a></td>
	<td><%= course.prerequisites %></td>
	<td><%= course.category_str %></td>
</tr>
<% }); %>