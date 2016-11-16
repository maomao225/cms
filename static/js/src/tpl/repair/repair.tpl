<div class="repair-repairs-view">
    <form class="form-horizontal q-form">
        <div class="form-group">
            <div class="inline-desc">VPC\主站：</div>
            <div class="col-xs-2">
                <select class="form-control input-sm" name="source_type">
                    <option value="">全部</option>
                </select>
            </div>
            <div class="inline-desc">B端\C端：</div>
            <div class="col-xs-2">
                <select class="form-control input-sm" name="user_type">
                    <option value="">全部</option>
                </select>
            </div>
            <div class="inline-desc">问题类型：</div>
            <div class="col-xs-2">
                <select class="form-control input-sm" name="rtype">
                    <option value="">全部</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="inline-desc">工单状态：</div>
            <div class="col-xs-2">
                <select class="form-control input-sm" name="status">
                    <option value="">全部</option>
                </select>
            </div>
            <div class="inline-desc">标签：</div>
            <div class="col-xs-2">
                <select class="form-control input-sm" name="tag">
                    <option value="">全部</option>
                </select>
            </div>
            <div class="inline-desc">工单id：</div>
            <div class="col-xs-2">
                <input type="text" class="form-control input-sm" name="id">
            </div>
        </div>

        <div class="form-group">
            <div class="inline-desc">处理人：</div>
            <div class="col-xs-2">
                <input type="text" class="form-control input-sm" name="op_user">
            </div>
            <div class="inline-desc">提交时间：</div>
            <div class="col-xs-2">
                <input type="text" class="form-control input-sm start-date" name="create_time_begin">
            </div>
            <div class="inline-desc">至：</div>
            <div class="col-xs-2">
                <input type="text" class="form-control input-sm end-date" name="create_time_end">
            </div>
        </div>
        <div class="form-group">
            <div class="inline-desc">学校：</div>
            <div class="col-xs-2">
                <input type="text" class="form-control input-sm" name="school">
            </div>
        </div>
        <div class="btn-row">
            <div class="col-xs-6 text-danger hint-block"></div>
            <div class="fr">
                <button type="button" class="btn btn-default q-btn">查询</button>
                <button type="button" class="btn btn-default all-btn">我的全部工单</button>
                <button type="button" class="btn btn-default todo-btn">我的待办工单</button>
            </div>
        </div>
    </form>

    <table class="table table-bordered table-xt">
        <thead>
        <tr>
            <th style="width: 4%;">ID</th>
            <th style="width: 9%;">提交时间</th>
            <th style="width: 12%;">VPC\主站</th>
            <th style="width: 9%;">B端\C端</th>
            <th style="width: 9%;">问题类型</th>
            <th style="width: 10%;">标题</th>
            <th style="width: 20%;">问题描述</th>
            <th style="width: 19%;">联系方式</th>
            <th style="width: 10%;">工单状态</th>
            <th style="width: 11%;">问题标签</th>
            <th style="width: 11%;">处理人</th>
            <th style="width: 9%;">操作</th>
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
    <div id="repair-detail" class="detail-block"></div>
</div>
<div class="modal fade edit-modal" id="edit-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">编辑标签</h4>
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
<div class="modal fade confirm-modal" id="close-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">关闭工单</h4>
            </div>
            <div class="modal-body">
                <p class="confirm-desc">确定要关闭此工单么？</p>
                <div class="row">
                    <button type="button" class="btn btn-default confirm-close-btn">确定</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</div>

