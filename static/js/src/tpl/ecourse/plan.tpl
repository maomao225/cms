<div class="ecourse-plan-view">
  <h4>选修计划</h4>
  <form class="form-horizontal q-form">
    <div class="form-group">
      <div class="inline-desc">计划名称：</div>
      <div class="col-xs-4">
        <input type="text" class="form-control" name="search">
      </div>
      <div class="inline-desc">当前状态：</div>
      <div class="col-xs-2">
        <select class="form-control" name="status">
          <option value="">全部</option>
          <option value="1">未开始</option>
          <option value="2">进行中</option>
          <option value="3">已完结</option>
        </select>
      </div>
    </div>
    <div class="btn-row">
      <div class="col-xs-6 text-danger hint-block"></div>
      <div class="fr">
        <button type="button" class="btn btn-default new-btn">新建</button>
        <button type="button" class="btn btn-default q-btn">查询</button>
      </div>
    </div>
  </form>
  <table class="table table-bordered table-xt">
    <thead>
    <tr>
      <th style="width: 10%;">计划名称</th>
      <th style="width: 10%;">当前状态</th>
      <th style="width: 24%;">课程列表</th>
      <th style="width: 18%;">数据生成开始时间</th>
      <th style="width: 18%;">数据生成结束时间</th>
      <th style="width: 10%;">课程简介</th>
      <th style="width: 10%;">操作</th>
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
  <div class="modal fade confirm-modal" id="delete-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">提示</h4>
        </div>
        <div class="modal-body">
          <p class="confirm-desc">您确定要删除该选修计划？（删除后将无法恢复）</p>

          <div class="row">
            <button type="button" class="btn btn-default confirm-delete-btn">确定</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>