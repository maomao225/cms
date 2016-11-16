<div class="courseinfo-bycourse-download-view">
    <h4>选修课课程数据资源下载</h4>

    <form class="form-horizontal form-download q-form">
        <div class="form-group">
            <div class="inline-desc">课程名称：</div>
            <div class="col-xs-3">
                <input type="text" class="form-control input-sm start-date" name="course_name">
            </div>
            <div class="inline-desc">课程ID：</div>
            <div class="col-xs-3">
                <input type="text" class="form-control input-sm start-date" name="course_id">
            </div>
        </div>
        <div class="form-group">
            <div class="inline-desc">选修学校：</div>
            <div class="col-xs-3">
                <input type="text" class="form-control input-sm start-date" name="org">
            </div>
        </div>

        <div class="form-group">
            <div class="col-xs-6 text-danger hint-block"></div>
        </div>
        <div class="btn-row">
            <!-- <div class="link-panel fl">
                <a href="javascript:;" class="scroll-link active" data-scroll-target="basic">基本信息</a>
                <a href="javascript:;" class="scroll-link" data-scroll-target="time">时间信息</a>
            </div> -->
            <div class="fr">
                <button type="button" class="btn btn-default q-btn">查询</button>
            </div>
        </div>
    </form>
    <div class="fixed-container">
        <table class="table table-bordered table-xt" style="width: 100%;">
            <thead>
            <tr>
                <th style="width: 20%;" data-scroll-mark="basic">课程名称</th>
                <th style="width: 15%;">课程ID</th>
                <th style="width: 25%;">课程来源</th>
                <th style="width: 40%;">导出类型</th>
            </tr>
            </thead>
            <tbody class="list-content">
            </tbody>
        </table>
    </div>
    <nav class="page-content">
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
    </nav>
    <div class="modal fade export-modal" id="export-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">选择导出学校</h4>
                </div>
                <div class="modal-body">
                    <p class="export-content"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</div>