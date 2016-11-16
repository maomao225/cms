<% _.each(results, function(email, idx) { %>
<tr data-email-id="<%= email.id %>">
    <td><%= email.id %></td>
	<td><%= email.title %></td>
	<td><%= email.course_id %></td>
    <td><%= email.course_name %></td>
    <td><%= email.user_count %></td>
    <td><%= moment(email.commit_time).format('YYYY-MM-DD HH:mm:ss') %></td>
    <td><%= email.status_name %></td>
    <td><%= email.review_opinion %></td>
	<td>
        <% if(email.status == "2"){ %><a href="#review/email/edit/<%= email.id %>">审核</a><% } %>
        <% if(email.status != "2"){ %><a href="#review/email/detail/<%= email.id %>">查看</a><% } %>
	</td>
</tr>
<% }); %>