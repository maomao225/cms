<div class="courseinfo-total-view">
	<h4>整体统计</h4>
	<div class="btn-row">
		<div class="fr">
			<button class="btn btn-default export-btn">导出数据</button>
		</div>
	</div>
	<table class="table table-bordered table-xt">
		<thead>
			<tr>
				<th style="width: 12%;"></th>
				<th style="width: 11%;">全部课程</th>
				<th style="width: 11%;">正在开课</th>
				<th style="width: 11%;">尚未开课</th>
				<th style="width: 11%;">已完结</th>
				<th style="width: 12%;">selfpaced课程</th>
				<th style="width: 11%;">tv端课程</th>
				<th style="width: 11%;">edX课程</th>
				<th style="width: 10%;">废课</th>
			</tr>
		</thead>
		<tbody class="list-content">
			<tr>
				<td>课程数目</td>
				<td><%= course_data.total_count %></td>
				<td><%= course_data.running_count %></td>
				<td><%= course_data.pre_count %></td>
				<td><%= course_data.finish_count %></td>
				<td><%= course_data.selfpaced_count %></td>
				<td><%= course_data.tv_count %></td>
				<td><%= course_data.edx_count %></td>
				<td><%= course_data.abandon_count %></td>
			</tr>
			<tr>
				<td>院校数目</td>
				<td><%= course_data.org_total_count %></td>
				<td><%= course_data.org_ing_count %></td>
				<td><%= course_data.org_pre_count %></td>
				<td><%= course_data.org_finish_count %></td>
				<td><%= course_data.org_selfpaced_count %></td>
				<td><%= course_data.org_tv_count %></td>
				<td><%= course_data.org_edx_count %></td>
				<td><%= course_data.org_abandon_count %></td>
			</tr>
			<tr>
				<td>已抓取课程数目</td>
				<td><%= course_data.grab_total_count %></td>
				<td><%= course_data.grab_running_count %></td>
				<td><%= course_data.grab_pre_count %></td>
				<td><%= course_data.grab_finish_count %></td>
				<td><%= course_data.grab_selfpaced_count %></td>
				<td><%= course_data.grab_tv_count %></td>
				<td><%= course_data.grab_edx_count %></td>
				<td><%= course_data.grab_abandon_count %></td>
			</tr>
			<tr>
				<td>已显示课程数目</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td>-</td>
				<td><%= course_data.rss_show_count %></td>
				<td>-</td>
			</tr>
		</tbody>
	</table>
</div>