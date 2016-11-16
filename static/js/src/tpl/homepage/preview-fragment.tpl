<div class="bg_hui pb_80 hot-spot" id="hot-spot">
	<div class="hot-spot-title bg_hui">
		<h2><span>热门知识点</span><a class="reviewmore" href="//www.xuetangx.com/fragment" target="_blank">[查看更多]</a></h2>
	</div>
	<div class="hot_spot_wrap wrap bg_hui">
		<ul class="fl">
			<% _.each(list.slice(0, 7), function(fragment, idx) { %>
			<li class="<%= idx == 4 ? 'longleft' : '' %>">
				<a href="//www.xuetangx.com/fragment/<%= fragment.frag_id %>" target="_blank">
					<div class="normal">
						<img src="<%= fragment.pic_url %>" class="layer" alt="<%= fragment.title %>" title="<%= fragment.title %>">
						<div class="cover">
							<img src="<%= fragment.pic_url %>" class="blur">
							<div class="mask"><p><%= fragment.title %></p></div>
						</div>
					</div>
				</a>
			</li>
			<% }); %>
		</ul>
		<% if(list[7]){ %>
		<div class="hotspot_right cf fl">
			<a href="//www.xuetangx.com/fragment/<%= list[7].frag_id %>" target="_blank">
				<div class="normal">
					<img src="<%= list[7].pic_url %>" class="layer" alt="<%= list[7].title %>" title="<%= list[7].title %>">
					<div class="cover">
						<img src="<%= list[7].pic_url %>" class="blur">
						<div class="mask"><p><%= list[7].title %></p></div>
					</div>
				</div>
			</a>
		</div>
		<% } %>
	</div>
</div>