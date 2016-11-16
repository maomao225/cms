<% _.each(list, function(post, idx) { %>
<tr data-post-id="<%= post.id %>">
	<td><%- post.author %></td>
	<td><%= post.id %></td>
	<td><a class="popup-link" href="javascript:;" data-post-id="<%= post.id %>"><%- post.title %></a></td>
	<td><%= post.createDate %></td>
	<td><span class="hide-status"><%= post.isHide ? '是' : '否' %></span></td>
	<td><a class="hide-link" href="javascript:;" data-post-id="<%= post.id %>" data-hide-status="<%= post.isHide %>"><%= post.isHide ? '取消隐藏' : '隐藏' %></a></td>
	<td class="tags">
		<% _.each(post.tags, function(tag, idx) { %>
		<div class="checkbox">
			<label>
				<input type="checkbox" class="tag-checkbox" <%= tag.isChecked ? "checked" : "" %> data-tag-id="<%= tag.id %>"><%= tag.label %>
			</label>
		</div>
		<% }); %>
		&nbsp;<button class="btn btn-default btn-sm tag-submit" data-post-id="<%= post.id %>">提交</button>
	</td>
</tr>
<% }); %>