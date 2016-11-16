<% _.each(results, function(survey, idx) { %>
<tr data-survey-id="<%= survey.id %>">
    <td><%= survey.id %></td>
	<td><%= survey.title %></td>
	<td><%= survey.start %></td>
    <td><%= survey.participants_count %></td>
    <td><a href="<%= survey.survey_url %>" target="_blank"><%= survey.survey_url %></a></td>
	<td>
		<a class="edit-link" href="javascript:;" data-survey-id="<%= survey.id %>">编辑</a>
		<a class="delete-link" href="javascript:;" data-survey-id="<%= survey.id %>">删除</a>
        <% if (typeof survey.statistic_url == 'string' && survey.statistic_url != ''){ %><a class="download-link" href="<%= survey.statistic_url %>" target="_blank">统计数据下载</a><% } %>
	</td>
</tr>
<% }); %>