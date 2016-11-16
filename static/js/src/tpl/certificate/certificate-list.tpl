<% _.each(list, function(certificate, idx) { %>
<tr>
	<td><%= certificate.name %></td>
	<td><%= certificate.course_id %></td>
	<td><%= certificate.status == 1  ? '已发放' : '未发放' %></td>
	<td><%= certificate.syn_student_status_name %></td>
	<td>
		<a href="#certificates/edit/<%= certificate.course_id %>">编辑</a>
	</td>
</tr>
<% }); %>