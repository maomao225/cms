<% _.each(list, function(repair, idx) { %>
<tr data-repair-id="<%= repair.id %>">
	<td><%= repair.id %></td>
	<td><%= moment(repair.created).format('YYYY-MM-DD HH:mm:ss')  %></td>
	<td><a href="<%= repair.source_url %>" target="_blank"><%= repair.source_type_name %></a></td>
	<td><%= repair.user_type_name %></td>
	<td><%= repair.rtype_name %></td>
	<td class="repairTitle"><%= repair.title %></td>
	<td class="repairQA"><%= repair.content %></td>
	<td style="text-align: left">
        <% for(var i in repair.contact) { %>
           <%= i + ": " + repair.contact[i] %> <br/>
        <% } %>
    </td>
	<td><%= repair.status_name %></td>
	<td><%= repair.tag %></td>
	<td><%= repair.op_user %></td>
	<td>
        <% if(repair.is_edit == 1){ %><a class="edit_tag" href="javascript:;" data-repair-id="<%= repair.id %>">编辑标签</a><% } %> 
        <% if(repair.is_edit == 1){ %>
            <a class="repair-detail-link" href="javascript:;" data-repair-isedit="<%=repair.is_edit%>" data-repair-id="<%= repair.id %>">回复工单</a>
			<a class="repair-close-link" href="javascript:;" data-repair-id="<%= repair.id %>">关闭工单</a>
        <% }  else {%>
            <a class="repair-detail-link" href="javascript:;" data-repair-isedit="<%=repair.is_edit%>" data-repair-id="<%= repair.id %>">查看工单</a>
        <% } %>
    </td>
</tr>
<% }); %>
