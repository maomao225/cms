<section class="wrap hz_school">
	<h2>合作院校</h2>
	<ul class="cf">
		<% _.each(list, function(school, idx) { %>
		<li>
			<a href="<%= school.link_url %>" title="<%= school.name %>" target="_blank">
				<div class="img">
					<span><img src="<%= school.cover_image %>" alt="<%= school.name %>" title="<%= school.name %>"></span>
				</div>
				<div class="text_con">
					<h3><%= school.name %></h3>
				</div>
			</a>
		</li>
		<% }); %>
	</ul>
</section>