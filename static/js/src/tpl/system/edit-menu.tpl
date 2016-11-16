<div class="edit-menu">
	<form class="form-horizontal edit-form">
		<h3><%= editFlag ? "编辑" : "新增" %>菜单</h3>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>菜单名称：</div>
			<div class="col-xs-3">
				<input type="hidden" name="id" value="<%= menu.id %>">
				<input type="text" class="form-control input-sm" name="name" value="<%= menu.name %>">
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>菜单key：</div>
			<div class="col-xs-3">
				<input type="text" class="form-control input-sm" name="mkey" value="<%= menu.mkey %>">
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>菜单url：</div>
			<div class="col-xs-3">
				<input type="text" class="form-control input-sm" name="url" value="<%= menu.url %>">
			</div>
		</div>
		<% if(editFlag){ %>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>子系统名称：</div>
			<div class="col-xs-3">
				<input type="text" class="form-control input-sm" value="<%= menu.system_name %>" readonly>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>资源id：</div>
			<div class="col-xs-3">
				<select class="form-control input-sm" name="resource_id">
					<% _.each(menu.resource_list, function(item, idx) { %>
					<option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
					<% }); %>
				</select>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>父菜单id：</div>
			<div class="col-xs-3">
				<select class="form-control input-sm" name="parent_id">
					<% _.each(menu.menu_list, function(item, idx) { %>
					<option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
					<% }); %>
				</select>
			</div>
		</div>
		<% }else{ %>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>子系统名称：</div>
			<div class="col-xs-3">
				<select class="form-control input-sm system-select" name="system_id">
					<option value=""></option>
				</select>
			</div>
		</div>
		<div class="form-group resource-group" style="display: none;">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>资源id：</div>
			<div class="col-xs-3">
				<select class="form-control input-sm" name="resource_id"></select>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>父菜单id：</div>
			<div class="col-xs-3">
				<select class="form-control input-sm" name="parent_id"></select>
			</div>
		</div>
		<% } %>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>顺序：</div>
			<div class="col-xs-3">
				<input type="text" class="form-control input-sm" name="order" maxlength="2" value="<%= menu.order %>">
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-5 text-danger hint-block"></div>
			<div class="col-xs-5 clear-left">
				<button type="button" class="btn btn-default confirm-btn">确定</button>
				<button type="button" class="btn btn-default cancel-btn">取消</button>
			</div>
		</div>
	</form>
</div>