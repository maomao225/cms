<div class="community">
	<div class="community_wrap">
		<div class="community_left fl">
			<% _.each(list, function(post, idx) { %>
			<div class="community_position cf">
				<div class="cheader_left fl">
					<em><%= post.category_name %></em>
					<a class="ctitle" href="//www.xuetangx.com/community/post/<%= post.post_id %>" target="_blank"><p><%= post.title %></p></a>
				</div>
				<p class="cheader_right fr cf"><span class="last_send_time fr" style="visibility: visible;"><%= post.fromNow %></span><span class="hotnum fr"><%= post.hot_count %></span></p>
			</div>
			<% }); %>
		</div>
	</div>
</div>