<div class="channel-event-view">
    <form class="form-horizontal q-form">
        <div class="form-group">
            <div class="inline-desc">专题页标题：</div>
            <div class="col-xs-4">
                <input type="text" class="form-control input-sm" name="search">
            </div>
            <div class="inline-desc">发布状态：</div>
            <div class="col-xs-2">
                <select class="form-control input-sm" name="status">
                    <option value="">全部</option>
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
            <th style="width: 20%;">专题页标题</th>
            <th style="width: 25%;">专题页URL</th>
            <th style="width: 12%;">Banner图片</th>
            <th style="width: 12%;">专题页类型</th>
            <th style="width: 9%;">最新发布时间</th>
            <th style="width: 10%;">发布状态</th>
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
    <div class="modal fade preview-modal" id="preview-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">活动海报</h4>
                </div>
                <div class="modal-body">
                    <p class="preview-content"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
                    <p class="confirm-desc">您确定要删除该专题？（删除后将无法恢复）</p>
                    <div class="row">
                        <button type="button" class="btn btn-default confirm-delete-btn">确定</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade confirm-modal" id="publish-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">发布提示</h4>
                </div>
                <div class="modal-body">
                    <p class="confirm-desc">确定要将当前数据发布到线上么？</p>
                    <div class="row">
                        <button type="button" class="btn btn-default confirm-publish-btn">确定</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>