<div class="ecourse-weekly-view">
  <h4>选修周报</h4>
  <form class="form-horizontal q-form">
    <div class="form-group">
      <div class="inline-desc">学校名称：</div>
      <div class="col-xs-4">
        <input type="text" class="form-control" name="org_name">
      </div>
      <div class="inline-desc">选修计划：</div>
      <div class="col-xs-4">
        <input type="text" class="form-control" name="plan_name">
      </div>
    </div>
    <div class="btn-row">
      <div class="col-xs-6 text-danger hint-block"></div>
      <div class="fr">
        <button type="button" class="btn btn-default q-btn">查询</button>
      </div>
    </div>
  </form>
  <table class="table table-bordered table-xt">
    <thead>
    <tr>
      <th style="width: 20%;">学校名称</th>
      <th style="width: 20%;">选修计划</th>
      <th style="width: 22%;">课程列表</th>
      <th style="width: 22%;">周报更新时间</th>
      <th style="width: 16%;">操作</th>
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
</div>