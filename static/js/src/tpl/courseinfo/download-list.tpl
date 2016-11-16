<% _.each(list, function(course, idx) { %>
<tr data-course-id="<%= course.course_id %>">
	<td><%= course.name %></td>
	<td><%= course.course_id %></td>
	<td><%= course.source_org %></td>
	<td>
		<ul class="orglist" style="margin-top: 10px;">
		<% _.each(course.type_list, function(etype, idx) {%>
			<li><a class="type-link" href="javascript:;" data-type-key="<%=etype.key%>" data-course-id="<%=course.course_id%>"><%=etype.val%></a></li>
		<% });%>
		</ul>
	</td>
</tr>
<% }); %>