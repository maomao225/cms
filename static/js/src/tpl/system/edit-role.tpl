<div class="edit-role">
	<form class="form-horizontal edit-form">
		<h3><%= editFlag ? "编辑" : "新增" %>角色</h3>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>角色名称：</div>
			<div class="col-xs-3">
				<input type="hidden" name="id" value="<%= role.id %>">
				<input type="text" class="form-control input-sm" name="name" value="<%= role.name %>">
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>资源列表：</div>
			<div class="col-xs-10">
				<table class="table table-bordered table-xt">
					<thead>
					</thead>
					<tbody>
					<% _.each(role.resource_list, function(system, idx) { %>
					<tr>
						<td style="width: 25%;"><%= system.system_name %></td>
						<td style="width: 75%;">
							<% _.each(system.list, function(resource, idx) { %>
							<div class="checkbox">
								<label>
									<input type="checkbox" name="resource_id" value="<%= resource.id %>" <%= resource.is_checked == 1 ? "checked" : "" %>><%= resource.name %>
								</label>
							</div>
							<% }); %>
						</td>
					</tr>
					<% }); %>
					</tbody>
				</table>
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