<div class="ecourse-student-view">
  <a href="#ecourse/approve" class="return-link">返回核准名单</a>
  <h4>核准名单/<span class="small"><%= org_name + ' ' + plan_name + ' ' + course_name %></span></h4>
  <form class="form-horizontal q-form">
    <input type="hidden" name="org_id" value="<%= (typeof org_id == 'undefined') ? '' : org_id %>"/>
    <input type="hidden" name="plan_id" value="<%= (typeof plan_id == 'undefined') ? '' : plan_id %>"/>
    <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
    <div class="form-group">
      <div class="inline-desc">学堂号：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="unique_code">
      </div>
      <div class="inline-desc">用户昵称：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="nick_name">
      </div>
      <div class="inline-desc">学号：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="org_number">
      </div>
    </div>
    <div class="form-group">
      <div class="inline-desc">姓名：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="student_name">
      </div>
      <div class="inline-desc">状态：</div>
      <div class="col-xs-3">
        <select class="form-control" name="status">
          <option value="">全部</option>
        </select>
      </div>
      <div class="inline-desc">失效原因：</div>
      <div class="col-xs-3">
        <select class="form-control" name="invalid_reason">
          <option value="">全部</option>
        </select>
      </div>
    </div>
    <div class="btn-row">
      <div class="col-xs-6 text-danger hint-block"></div>
      <div class="fr">
        <button type="button" class="btn btn-default new-btn">+添加学生</button>
        <button type="button" class="btn btn-default download-btn">下载</button>
        <button type="button" class="btn btn-default q-btn">查询</button>
      </div>
    </div>
  </form>
  <table class="table table-bordered table-xt">
    <thead>
    <tr>
      <th style="width: 20%;">学堂号</th>
      <th style="width: 12%;">用户昵称</th>
      <th style="width: 16%;">学号</th>
      <th style="width: 10%;">姓名</th>
      <th style="width: 10%;">状态</th>
      <th style="width: 20%;">失效原因</th>
      <th style="width: 12%;">操作</th>
    </tr>
    </thead>
    <tbody class="list-content"></tbody>
  </table>
  <nav class="page-content">
    <ul class="pagination">
      <li class="disabled"><a href="javascript:;"><span>&laquo;第1页</span></a></li>
      <li class="disabled"><a href="javascript:;"><span>&lt;上一页</span></a></li>
      <li><span class="page-desc">第0页，共0页</span></li>
      <li class="disabled"><a href="javascript:;"><span>下一页&gt;</span></a></li>
      <li class="disabled"><a href="javascript:;"><span>最后1页&raquo;</span></a></li>
    </ul>
    <div class="records-control">
      共0条数据，每页显示
      <select class="records-select">
        <option value="10">10条</option>
        <option value="20">20条</option>
        <option value="50">50条</option>
        <option value="100">100条</option>
      </select>
    </div>
  </nav>
  <div class="modal fade create-modal" id="create-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">添加学生</h4>
        </div>
        <div class="modal-body">
          <div class="create-content"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default save-create-btn">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade edit-modal" id="edit-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">编辑学生</h4>
        </div>
        <div class="modal-body">
          <div class="edit-content"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default save-edit-btn">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade confirm-modal" id="delete-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">提示</h4>
        </div>
        <div class="modal-body">
          <p class="confirm-desc">您确定要删除该核准名单？（删除后将无法恢复）</p>

          <div class="row">
            <button type="button" class="btn btn-default confirm-delete-btn">确定</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>