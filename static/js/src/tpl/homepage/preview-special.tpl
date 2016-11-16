<div class="weizhuanti wrap" id="weizhuanti">
	<div class="weizhanti_wrap">
		<div class="weizhuanti_left fl">
			<p class="weizhuanti_title">
				<%= title %>
			</p>
			<p class="weizhuanti_intro">
				<%= description %>
			</p>
		</div>
		<div class="weizhuanti_right cf fl">
			<div class="carousel" id="carouseltwo">
				<div class="carousel_wrap carousel_move">
					<ul class="cf course_wrap carousel_item" style="width: 100%;">
						<% _.each(list, function(special, idx) { %>
						<li>
							<a href="//www.xuetangx.com/courses/<%= special.course_id %>/about" target="_blank">
								<div class="normal">
									<img src="<%= special.pic_url %>" alt="<%= special.title %>" title="<%= special.title %>">
								</div>
								<h3><%= special.title %></h3>
							</a>
						</li>
						<% }); %>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>