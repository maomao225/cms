<article>
	<div class="wrap cf">
		<div class="fl">
			<section>
				<h3>招兵买马</h3>
				<% _.each(list, function(recruitment, idx) { %>
				<h4><%= recruitment.name %></h4>
				<% var introList = recruitment.introduction.split("\n"); %>
				<% _.each(introList, function(line, idx) { %>
				<p><%= line %></p>
				<% }); %>
				<% }); %>
			</section>
		</div>
	</div>
</article>