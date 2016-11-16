<div class="ecourse-approve-view">
  <h4>核准名单</h4>

  <form class="form-horizontal q-form">
    <div class="form-group">
      <div class="inline-desc">学校名称：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="org_name">
      </div>
      <div class="inline-desc">选修计划：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="plan_name">
      </div>
      <div class="inline-desc">课程id：</div>
      <div class="col-xs-3">
        <input type="text" class="form-control" name="course_id">
      </div>
    </div>
    <div class="btn-row">
      <div class="col-xs-6 text-danger hint-block"></div>
      <div class="fr">
        <button type="button" class="btn btn-default check-btn">校验学号</button>
        <button type="button" class="btn btn-default new-btn">创建核准名单</button>
        <button type="button" class="btn btn-default q-btn">查询</button>
      </div>
    </div>
  </form>
  <table class="table table-bordered table-xt">
    <thead>
    <tr>
      <th style="width: 12%;">学校名称</th>
      <th style="width: 12%;">选修计划</th>
      <th style="width: 20%;">课程名称</th>
      <th style="width: 11%;">选课人数</th>
      <th style="width: 11%;">失效人数</th>
      <th style="width: 9%;">创建日期</th>
      <th style="width: 9%;">修改日期</th>
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
  <div class="modal fade edit-modal" id="check-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">校验学号</h4>
        </div>
        <div class="modal-body">
          <div class="check-content"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade create-modal" id="create-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">新增核准数据</h4>
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
          <h4 class="modal-title">编辑核准数据</h4>
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