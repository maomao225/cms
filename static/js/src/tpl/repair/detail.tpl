<div class="repair-detail">
	<div class="detail-row">
		<div class="col-xs-2">VPC\主站：</div>
		<div class="col-xs-10"><%=source_type_name || "-" %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">B端\端：</div>
		<div class="col-xs-10"><%= user_type_name || "-"  %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">问题类型：</div>
		<div class="col-xs-10"><%= rtype_name || "-"  %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">工单状态：</div>
		<div class="col-xs-10"><%= status_name || "-"  %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">IP地址：</div>
		<div class="col-xs-10"><%= ip || "-"  %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">浏览器版本：</div>
		<div class="col-xs-10"><%= broswer || "-"  %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">学号：</div>
		<div class="col-xs-10"><%= student_id || "-" %></div>
	</div>
    <div class="detail-row">
        <div class="col-xs-2">学校名称：</div>
        <div class="col-xs-10"><%= school || "-" %></div>
    </div>
	<div class="detail-row">
		<div class="col-xs-2">学堂号：</div>
		<div class="col-xs-10"><%= xuetangx_id || "-" %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">UserID：</div>
		<div class="col-xs-10"><%= user_id || "-"  %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">邮箱：</div>
		<div class="col-xs-10"><%= email || "-"  %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">第三方登陆：</div>
		<div class="col-xs-10">-</div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">注册时间：</div>
		<div class="col-xs-10"><%= moment(register_date).format('YYYY-MM-DD HH:mm:ss') || "-"  %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-3">是否学堂选修课学生：</div>
		<div class="col-xs-8" style="margin-left: -79px"><%= is_elective %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">兑换券：</div>
		<div class="col-xs-7"><%=coupon_count || "-" %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">QQ：</div>
		<div class="col-xs-7"><%=QQ || "-" %></div>
	</div>
	<div class="detail-row">
		<div class="col-xs-2">电话：</div>
		<div class="col-xs-7"><%=mobile || "-" %></div>
	</div>
	<!-- <div class="detail-row">
		<div class="col-xs-2"><button type="button" class="btn btn-default back-btn">返回</button></div>
	</div> -->

	<br />
	<% if(study_info && study_info.length >0){ %>
	<div class="detail-row">
		<div class="col-xs-5"><h4>选课&证书信息：</h4></div>
	</div>
	<div class="detail-row">
		<table class="table table-bordered table-xt">
			<thead>
			<tr>
				<th style="width: 25%;">课程名称</th>
				<th style="width: 25%;">课程类型</th>
				<th style="width: 30%;">付费证书申请进度</th>
			</tr>
			</thead>
			<tbody class="list-content">
			<%for(var i=0,l=study_info.length;i<l;i++) {%>
				<tr>
					<td><%=study_info[i].course_name%></td>
					<td><%=study_info[i].course_type_name%></td>
					<td><%=study_info[i].pay_progress%></td>
				</tr>
			<%}%>
			</tbody>
		</table>
	</div>
	<% } %>
	<% if(study_record && study_record.length >0){ %>
	<div class="detail-row">
		<div class="col-xs-2"><h4>最近学习记录</h4></div>
	</div>
	<div class="detail-row">
		<table class="table table-bordered table-xt">
			<thead>
			<tr>
				<th style="width: 25%;">课程名称</th>
				<th style="width: 25%;">章节</th>
				<th style="width: 30%;">小节</th>
				<th style="width: 30%;">学习时间</th>
			</tr>
			</thead>
			<tbody class="list-content">
				<%for(var j=0,l=study_record.length;j<l;j++) {%>
				<tr>
					<td><%=study_record[j].course_name%></td>
					<td><%=study_record[j].chapter%></td>
					<td><%=study_record[j].section%></td>
					<td><%= moment(study_record[j].tudy_time).format('YYYY-MM-DD HH:mm:ss')  %></td> 

				</tr>
			<%}%>
			</tbody>
		</table>
	</div>
	<% } %>
	<p></p>
	<label>问题标题：<%=title%></label>
	<%if(question_answer && question_answer.length>0) {%>
		<%for(var k=0;k<question_answer.length;k++) {%>
			<%if(question_answer[k].type == "1") {%>
				<div class="detail-row"><label style="color:#5522aa;margin-top: 10px;">用户提问：</label><%=question_answer[k].content%></div>
				<%for( var m=0;m<question_answer[k]["attach_list"].length;m++) {%>
					<img class="showimg" data-repair-img=<%=question_answer[k]["attach_list"][m]%> style="width: 169px;height: 109px;background-size: cover;" src=<%=question_answer[k]["attach_list"][m]%>>
				<%}%>
			<%}%>
			<%if(question_answer[k].type == "2") {%>
				<div class="detail-row"><label style="color:#eb5800;margin-top: 10px;">客服回复：</label><%=question_answer[k].content%></div>
                <%for( var m=0;m<question_answer[k]["answer_attach_list"].length;m++) {%>
                <img class="showimg" data-repair-img=<%=question_answer[k]["answer_attach_list"][m]%> style="width: 169px;height: 109px;background-size: cover;" src=<%=question_answer[k]["answer_attach_list"][m]%>>
                <%}%>
			<%}%>
		<%}%>
	<%}%>
	<%if(is_edit>0) {%>
		<textarea id="txtanswer" style="width:70%;height:200px;margin:10px 0 10px 0" class="form-control" rows="2"></textarea>
        <div class="img-container">

        </div>
		<div style="margin:10px;display: none" class="hint-block-textarea">111</div>
        <button class="btn btn-default btn-lg fileinput-button upload_img">
            <span>上传图片</span>
            <input class="fileupload-input" type="file" name="file">
        </button>
		<button style="background-color:#5522aa;color:#ffffff" class="btn btn-default btn-lg answer_user">回复用户</button>
	<%}%>
	<button style="" class="btn btn-default btn-lg back_list">返回</button>
</div>

<div class="modal fade img-modal" id="img-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">反馈截图</h4>
                </div>
                <div class="modal-body">
                    <div class="img-content"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
