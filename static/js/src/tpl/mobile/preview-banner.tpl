<div class="carousel">
	<ul class="carousel_wrap">
		<% _.each(list, function(banner, idx) { %>
		<% if(banner.is_active == 1){ %>
		<li class="carousel_item"><a href="#" title="<%= banner.name %>" target="_blank"><img src="<%= banner.image %>" /></a></li>
		<% } %>
		<% }); %>
	</ul>
</div>