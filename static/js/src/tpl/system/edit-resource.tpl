<div class="edit-resource">
	<form class="form-horizontal edit-form">
		<h3><%= editFlag ? "编辑" : "新增" %>资源</h3>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>资源名称：</div>
			<div class="col-xs-3">
				<input type="hidden" name="id" value="<%= resource.id %>">
				<input type="text" class="form-control input-sm" name="name" value="<%= resource.name %>">
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>所属系统：</div>
			<div class="col-xs-3">
				<select class="form-control input-sm" name="system_id">
					<% if(resource.system_list){ %>
					<% _.each(resource.system_list, function(item, idx) { %>
					<option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
					<% }); %>
					<% } %>
				</select>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>资源扩展：</div>
			<div class="col-xs-3">
				<textarea class="form-control" rows="3" name="ext_content"><%= resource.ext_content %></textarea>
			</div>
		</div>
		<div class="form-group">
			<div class="col-xs-2 inline-desc"><span class="required-text">*&nbsp;</span>资源描述：</div>
			<div class="col-xs-3">
				<input type="text" class="form-control input-sm" name="description" value="<%= resource.description %>">
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