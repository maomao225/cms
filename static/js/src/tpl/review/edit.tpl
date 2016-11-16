<div class="review-email-edit-view">
    <div class="btn-row">
        <button class="btn btn-default cancel-btn">返回邮件列表</button>
    </div>
    <form class="form-horizontal content-form" onsubmit="return false;">
        <section class="content-section email-section">
            <h5>邮件内容</h5>
            <input type="hidden" name="id" value="<%= (typeof id == 'undefined') ? '' : id %>">
            <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>">

            <div class="form-group">
                <label class="col-xs-2 control-label">收件人邮箱地址</label>

                <div class="col-xs-10">
                    <input type="text" class="form-control" value="<%= course_id %>@sendcloud.org" readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">发件人邮箱地址</label>

                <div class="col-xs-10">
                    <input type="text" class="form-control" value="noreplay@m.xuetangx.com" readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">发件人名称</label>

                <div class="col-xs-10">
                    <input type="text" class="form-control" value="学堂在线" readonly>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">主题</label>

                <div class="col-xs-10">
                    <input type="text" class="form-control" name="title" maxlength="22"
                           value="<%= (typeof title == 'undefined') ? '' : title %>"<%= ((typeof isRead != 'undefined')
                    && isRead) ? ' readonly' : '' %>>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">正文</label>

                <div class="col-xs-10">
                    <textarea id="email-editor" class="content-area" name="content"<%= ((typeof isRead != 'undefined')
                    && isRead) ? ' readonly' : '' %>><%= (typeof content == 'undefined') ? '' : content %></textarea>
                </div>
            </div>
            <div class="btn-row">
                <div class="fr">
                    <button class="btn btn-default preview-email-btn">预览</button>
                    <% if((typeof isRead == 'undefined') || !isRead) {%>
                    <button class="btn btn-default save-email-btn">保存邮件内容</button>
                    <% } %>
                </div>
            </div>
        </section>
        <section class="content-section email-section">
            <h5>审核意见</h5>

            <div class="form-group">
                <div class="col-xs-12">
                    <% if((typeof isRead == 'undefined') || !isRead) { %>
                    <div class="radio-inline">
                        <label>
                            <input type="radio" name="status" value="4" checked>审核通过并发送邮件
                        </label>
                    </div>
                    <div class="radio-inline">
                        <label>
                            <input type="radio" name="status" value="3">审核退回给老师/助教
                        </label>
                    </div>
                    <% } else { %>
                    <div class="radio-inline">
                        <label>
                            <input type="radio" name="status" value="4" disabled<%= status == 4 ? ' checked' : ''
                            %>>审核通过并发送邮件
                        </label>
                    </div>
                    <div class="radio-inline">
                        <label>
                            <input type="radio" name="status" value="3" disabled<%= status == 3 ? ' checked' : ''
                            %>>审核退回给老师/助教
                        </label>
                    </div>
                    <% } %>
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-12">
                    <textarea class="form-control" name="review_opinion" rows="5"<%= ((typeof isRead != 'undefined') &&
                    isRead) ? ' readonly' : '' %>><%= (typeof review_opinion == 'undefined') ? '' : review_opinion
                    %></textarea>
                </div>
            </div>
            <div class="btn-row">
                <div class="fl hint-block text-danger"></div>
                <div class="fr">
                    <% if((typeof isRead == 'undefined') || !isRead) {%>
                    <button class="btn btn-default cancel-btn">取消</button>
                    <button class="btn btn-default save-review-btn">执行审核意见</button>
                    <% } %>
                </div>
            </div>
        </section>
    </form>
    <div class="modal fade preview-modal" id="preview-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">邮件预览</h4>
                </div>
                <div class="modal-body">
                    <iframe src="" frameborder="0" style="width: 100%;height: 400px;"></iframe>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</div>