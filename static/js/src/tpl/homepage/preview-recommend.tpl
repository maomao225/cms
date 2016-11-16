<div class="bg_hui pb_80 rec_courses">
	<div class="rec_courses_title wrap bg_hui">
		<h2><span>推荐课程</span></h2>
	</div>
	<div class="rec_courses_wrap wrap bg_hui">
		<ul class="cf">
			<% _.each(list, function(recommend, idx) { %>
			<li>
				<a href="//www.xuetangx.com/courses/<%= recommend.course_id %>/about" title="<%= recommend.title %>" target="_blank">
					<div class="normal">
						<img src="<%= recommend.pic_url %>" alt="<%= recommend.title %>" title="<%= recommend.title %>">
						<% if(recommend.ref_url && recommend.ref_url != ''){ %>
						<img src="<%= recommend.ref_url %>">
						<% } %>
					</div>
					<h3><%= recommend.title %></h3>
				</a>
			</li>
			<% }); %>
		</ul>
	</div>
</div>