<ul class="nav navbar-nav navbar-left site-nav">
	<% _.each(sys_list, function(nav) { %>
	<% if(nav.is_checked == 1){ %>
	<li class="active"><a href="javascript:;"><%= nav.name %></a></li>
	<% }else{ %>
	<li><a href="<%= nav.url %>"><%= nav.name %></a></li>
	<% } %>
	<% }); %>
</ul>
<ul class="nav navbar-nav navbar-right">
	<li><a href="#home"><span class="glyphicon glyphicon-user"></span>&nbsp;<%= nickname %></a></li>
	<li><a href="/signout"><b>注销</b></a></li>
</ul>