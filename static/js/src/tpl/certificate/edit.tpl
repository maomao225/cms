<div class="cert-edit-view">
    <section class="title-section">
        <a href="#certificates" class="return-link">返回证书信息列表</a>
        <h4><%= (typeof course_name == 'undefined') ? '' : course_name %></h4>
        <div class="subtitle"><%= course_id %></div>
    </section>
    <nav class="nav-section">
        页面导航:
        <a href="javascript:;" data-nav-target="stu-list">获得证书的学生列表</a>
        <a href="javascript:;" data-nav-target="cert-text">证书文案</a>
        <a href="javascript:;" data-nav-target="cert-image">证书图片</a>
        <a href="javascript:;" data-nav-target="cert-date">证书日期</a>
        <a href="javascript:;" data-nav-target="cert-signature">证书签证人信息</a>
        <a href="javascript:;" data-nav-target="cert-preview">预览证书</a>
        <a href="javascript:;" data-nav-target="cert-message">发送消息</a>
        <a href="javascript:;" data-nav-target="cert-status">证书状态</a>
    </nav>
    <section class="content-section stu-list">
        <h5>获得证书的学生列表(<span class="sync-label"><%= list_info.syn_student_status_name %></span>)</h5>
        <form class="form-horizontal content-form" onsubmit="return false;">
            <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
            <div class="form-group">
                <div class="col-xs-6">
                    <div class="control-label">优秀学生<em>（高于80分）</em></div>
                    <textarea name="excellence_students" rows="10"><%= list_info.excellence_students.join("\n") %></textarea>
                </div>
                <div class="col-xs-6">
                    <div class="control-label">合格学生<em>（低于80分，高于60分）</em></div>
                    <textarea name="eligible_students" rows="10"><%= list_info.eligible_students.join("\n") %></textarea>
                </div>
            </div>
            <div class="btn-row">
                <div class="fl hint-block"></div>
                <div class="fr">
                    <button type="button" class="btn btn-default sync-stu-list" data-sync-status="<%= list_info.syn_student_status %>"  data-sync-date="<%= list_info.last_syn_date %>">同步学生列表</button>
                    <button type="button" class="btn btn-default" data-toggle="modal" data-target="#confirm-modal-stu-list">保存获得证书的学生列表</button>
                </div>
            </div>
            <div class="modal fade confirm-modal" id="confirm-modal-stu-list" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">确认提示</h4>
                        </div>
                        <div class="modal-body">
                            <p class="confirm-desc">确认保存获得证书的学生列表？</p>
                            <div class="row">
                                <button type="button" class="btn btn-default save-stu-list" data-dismiss="modal">确定</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="modal fade edit-modal" id="stu-sync-status-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">同步状态</h4>
                    </div>
                    <div class="modal-body">
                        <div class="status-wrap"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="content-section cert-text">
        <h5>证书文案</h5>
        <form class="form-horizontal content-form" onsubmit="return false;">
            <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
            <div class="form-group">
                <label class="col-xs-2 control-label">英文认证地址</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="authenticity_en_us" value="<%= (typeof text_info.authenticity_en_us == 'undefined') ? 'Verify the Authenticity at' : text_info.authenticity_en_us %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">中文认证地址</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="authenticity_zh_cn" value="<%= (typeof text_info.authenticity_zh_cn == 'undefined') ? '验证地址' : text_info.authenticity_zh_cn %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">英文授权说明</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="authorization_en_us" value="<%= (typeof text_info.authorization_en_us == 'undefined') ? 'a course of study offered and authorized by XX through xuetangX' : text_info.authorization_en_us %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">中文授权说明</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="authorization_zh_cn" value="<%= (typeof text_info.authorization_zh_cn == 'undefined') ? '该课程由XX提供，授权学堂在线平台运营' : text_info.authorization_zh_cn %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">英文课程名</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="course_name_en_us" value="<%= (typeof text_info.course_name_en_us == 'undefined') ? '' : text_info.course_name_en_us %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">中文课程名</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="course_name_zh_cn" value="<%= (typeof text_info.course_name_zh_cn == 'undefined') ? '' : text_info.course_name_zh_cn %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">课程ID</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="course_number" value="<%= (typeof text_info.course_number == 'undefined') ? '' : text_info.course_number %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">英文发证日期</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control date-input" name="issue_date_en_us" value="<%= (typeof text_info.issue_date_en_us == 'undefined') ? 'Issue Date' : text_info.issue_date_en_us %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">中文发证日期</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control date-input" name="issue_date_zh_cn" value="<%= (typeof text_info.issue_date_zh_cn == 'undefined') ? '发证日期' : text_info.issue_date_zh_cn %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">英文合格说明</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="pass_en_us" value="<%= (typeof text_info.pass_en_us == 'undefined') ? 'Successfully completed and received a passing grade in' : text_info.pass_en_us %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">中文合格说明</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="pass_zh_cn" value="<%= (typeof text_info.pass_zh_cn == 'undefined') ? '顺利完成学习并通过了考核' : text_info.pass_zh_cn %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">英文额外声明</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="statement_en_us" value="<%= (typeof text_info.statement_en_us == 'undefined') ? '' : text_info.statement_en_us %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">中文额外声明</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="statement_zh_cn" value="<%= (typeof text_info.statement_zh_cn == 'undefined') ? '' : text_info.statement_zh_cn %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">英文学校名</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="university_en_us" value="<%= (typeof text_info.university_en_us == 'undefined') ? '' : text_info.university_en_us %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">中文学校名</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="university_zh_cn" value="<%= (typeof text_info.university_zh_cn == 'undefined') ? '' : text_info.university_zh_cn %>"/>
                </div>
            </div>
            <div class="btn-row">
                <div class="fl hint-block"></div>
                <div class="fr">
                    <button class="btn btn-default sync-cert-text">同步证书文案</button>
                    <button class="btn btn-default" data-toggle="modal" data-target="#confirm-modal-cert-text">保存证书文案</button>
                </div>
            </div>
            <div class="modal fade confirm-modal" id="confirm-modal-cert-text" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">确认提示</h4>
                        </div>
                        <div class="modal-body">
                            <p class="confirm-desc">确认保存证书文案？</p>
                            <div class="row">
                                <button type="button" class="btn btn-default save-cert-text" data-dismiss="modal">确定</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
    <section class="content-section cert-image">
        <h5>证书图片</h5>
        <form class="form-horizontal content-form cert-image-form" onsubmit="return false;">
            <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
            <div class="form-group">
                <div class="col-xs-6 img-group">
                    <div class="control-label">电子证书Logo图片：</div>
                    <img src="<%= image_info.elec_logo_url %>" class="logo-img" alt="电子证书Logo图片"/>
                    <input type="hidden" name="elec_logo_url" value="<%= (typeof image_info.elec_logo_url == 'undefined') ? '' : image_info.elec_logo_url %>"/>
                    <input type="hidden" name="elec_logo" value="<%= (typeof image_info.name == 'undefined') ? '' : image_info.name %>"/>
                </div>
                <div class="col-xs-6 img-group">
                    <div class="control-label">纸质证书Logo图片：</div>
                    <img src="<%= image_info.paper_logo_url %>" class="logo-img" alt="纸质证书Logo图片"/>
                    <input type="hidden" name="paper_logo_url" value="<%= (typeof image_info.paper_logo_url == 'undefined') ? '' : image_info.paper_logo_url %>"/>
                    <input type="hidden" name="paper_logo" value="<%= (typeof image_info.name == 'undefined') ? '' : image_info.name %>"/>
                </div>
            </div>
            <div class="btn-row">
                <div class="fl hint-block"></div>
                <div class="fr">
                    <button class="btn btn-default open-cert-image-modal">更换图片</button>
                    <button class="btn btn-default" data-toggle="modal" data-target="#confirm-modal-cert-image">保存证书图片</button>
                </div>
            </div>
            <div class="modal fade confirm-modal" id="confirm-modal-cert-image" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">确认提示</h4>
                        </div>
                        <div class="modal-body">
                            <p class="confirm-desc">确认保存证书图片？</p>
                            <div class="row">
                                <button type="button" class="btn btn-default save-cert-image" data-dismiss="modal">确定</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="modal fade edit-modal" id="cert-image-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form class="form-horizontal content-form modal-cert-image-form" onsubmit="return false;">
                        <div class="modal-header">
                            <h4 class="modal-title">更换证书Logo图片</h4>
                        </div>
                        <div class="modal-body cf">
                            <div class="form-group cf">
                                <label class="col-xs-1 inline-desc fluid">请选择Logo名称：</label>
                                <div class="col-xs-5">
                                    <div class="input-group">
                                        <input type="text" class="form-control logo-suggest-input"/>
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-6 img-group">
                                    <div class="control-label">电子证书Logo图片：</div>
                                    <img src="<%= image_info.elec_logo_url %>" class="logo-img" alt="电子证书Logo图片"/>
                                    <input type="hidden" name="elec_logo_url" value="<%= (typeof image_info.elec_logo_url == 'undefined') ? '' : image_info.elec_logo_url %>"/>
                                    <input type="hidden" name="elec_logo" value="<%= (typeof image_info.name == 'undefined') ? '' : image_info.name %>"/>
                                </div>
                                <div class="col-xs-6 img-group">
                                    <div class="control-label">纸质证书Logo图片：</div>
                                    <img src="<%= image_info.paper_logo_url %>" class="logo-img" alt="纸质证书Logo图片"/>
                                    <input type="hidden" name="paper_logo_url" value="<%= (typeof image_info.paper_logo_url == 'undefined') ? '' : image_info.paper_logo_url %>"/>
                                    <input type="hidden" name="paper_logo" value="<%= (typeof image_info.name == 'undefined') ? '' : image_info.name %>"/>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default save-cert-image-modal">保存</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <section class="content-section cert-date">
        <h5>证书日期</h5>
        <form class="form-horizontal content-form" onsubmit="return false;">
            <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
            <div class="form-group">
                <div class="col-xs-2">
                    <input type="text" class="form-control input-sm date-input" name="issue_date" value="<%= (typeof date_info.issue_date == 'undefined') ? '' : date_info.issue_date %>">
                </div>
            </div>
            <div class="btn-row">
                <div class="fl hint-block"></div>
                <div class="fr">
                    <button class="btn btn-default" data-toggle="modal" data-target="#confirm-modal-cert-date">保存证书日期</button>
                </div>
            </div>
            <div class="modal fade confirm-modal" id="confirm-modal-cert-date" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">确认提示</h4>
                        </div>
                        <div class="modal-body">
                            <p class="confirm-desc">确认保存证书日期？</p>
                            <div class="row">
                                <button type="button" class="btn btn-default save-cert-date" data-dismiss="modal">确定</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
    <section class="content-section cert-signature">
        <h5>证书签证人信息</h5>
        <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
        <div class="signer-list">
        <% _.each(professor_list, function(signer, idx){ %>
        <form class="form-horizontal content-form cert-signer-form<%= idx+1 %>" onsubmit="return false;">
            <h5 class="signer-title">
                <span class="collapse-toggler"><span class="glyphicon glyphicon-triangle-bottom"></span>证书签证人<%= idx+1 %></span>
                <button class="delete-signer-btn" data-form-element="cert-signer-form<%= idx+1 %>">删除</button>
            </h5>
            <div class="signer-content">
                <div class="col-xs-8">
                    <div class="form-group">
                        <label class="col-xs-2 control-label">英文学位</label>
                        <div class="col-xs-10">
                            <input type="text" class="form-control input-sm" name="degree_en_us" value="<%= (typeof signer.degree_en_us == 'undefined') ? '' : signer.degree_en_us %>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">中文学位</label>
                        <div class="col-xs-10">
                            <input type="text" class="form-control input-sm" name="degree_zh_cn" value="<%= (typeof signer.degree_zh_cn == 'undefined') ? '' : signer.degree_zh_cn %>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">英文职务</label>
                        <div class="col-xs-10">
                            <input type="text" class="form-control input-sm" name="duty_en_us" value="<%= (typeof signer.duty_en_us == 'undefined') ? '' : signer.duty_en_us %>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">中文职务</label>
                        <div class="col-xs-10">
                            <input type="text" class="form-control input-sm" name="duty_zh_cn" value="<%= (typeof signer.duty_zh_cn == 'undefined') ? '' : signer.duty_zh_cn %>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">中文姓名</label>
                        <div class="col-xs-10">
                            <input type="text" class="form-control input-sm" name="name_zh_cn" value="<%= (typeof signer.name_zh_cn == 'undefined') ? '' : signer.name_zh_cn %>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">英文姓名</label>
                        <div class="col-xs-10">
                            <input type="text" class="form-control input-sm" name="name_en_us" value="<%= (typeof signer.name_en_us == 'undefined') ? '' : signer.name_en_us %>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-xs-2 control-label">类型</label>
                        <div class="col-xs-10">
                            <div class="radio-inline">
                                <label>
                                    <input type="radio" class="q-radio" name="type" value="authorizer" <%= (signer.type == "authorizer") ? "checked" : "" %>>authorizer
                                </label>
                            </div>
                            <div class="radio-inline">
                                <label>
                                    <input type="radio" class="q-radio" name="type" value="professor" <%= (signer.type == "professor") ? "checked" : "" %>>professor
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="signer-img-title">签字图片</div>
                    <img class="signer-img" src="<%= (typeof signer.signiture_url == 'undefined') ? '' : signer.signiture_url %>" alt="签字图片"/>
                    <input type="hidden" class="form-control input-sm" name="signiture_url" value="<%= (typeof signer.signiture_url == 'undefined') ? '' : signer.signiture_url %>">
                    <div class="signer-img-name"><%= (typeof signer.signiture_zh_cn == 'undefined') ? '' : signer.signiture_zh_cn %></div>
                    <input type="hidden" class="form-control input-sm" name="signiture_zh_cn" value="<%= (typeof signer.signiture_zh_cn == 'undefined') ? '' : signer.signiture_zh_cn %>">
                    <div class="btn-row">
                        <button type="button" class="btn btn-default open-signer-image-modal" data-form-element="cert-signer-form<%= idx+1 %>">更换图片</button>
                    </div>
                </div>
            </div>
        </form>
        <% }); %>
        </div>
        <div class="btn-row">
            <div class="fl hint-block"></div>
            <div class="fr">
                <button class="btn btn-default sync-cert-signer">同步证书签证人信息</button>
                <button class="btn btn-default add-cert-signer" <% professor_list.length < 5 ? "" : "disabled" %>>新增证书签证人信息</button>
                <button class="btn btn-default" data-toggle="modal" data-target="#confirm-modal-cert-signer">保存证书签证人信息</button>
            </div>
        </div>
        <div class="modal fade confirm-modal" id="confirm-modal-cert-signer" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">确认提示</h4>
                    </div>
                    <div class="modal-body">
                        <p class="confirm-desc">确认保存证书签证人信息？</p>
                        <div class="row">
                            <button type="button" class="btn btn-default save-cert-signer" data-dismiss="modal">确定</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade confirm-modal" id="delete-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">删除提示</h4>
                    </div>
                    <div class="modal-body">
                        <p class="confirm-desc">您确定要删除该签证人？</p>
                        <div class="row">
                            <button type="button" class="btn btn-default confirm-delete-btn">确定</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade edit-modal" id="signer-image-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form class="form-horizontal content-form modal-signer-image-form" onsubmit="return false;">
                        <div class="modal-header">
                            <h4 class="modal-title">更换签字图片</h4>
                        </div>
                        <div class="modal-body cf">
                            <div class="form-group cf">
                                <label class="col-xs-3">请选择签字名称：</label>
                                <div class="col-xs-5">
                                    <div class="input-group">
                                        <input type="text" class="form-control signer-suggest-input"/>
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-3 control-label">签字图片：</div>
                                <div class="col-xs-5">
                                    <img src="" class="signer-img" alt="签字图片"/>
                                    <input type="hidden" name="signiture_url" value=""/>
                                    <input type="hidden" name="signiture_zh_cn" value="">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default save-signer-image-modal">保存</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <section class="content-section cert-preview">
        <h5>预览证书</h5>
        <form class="form-horizontal content-form" onsubmit="return false;">
            <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
            <div class="form-group">
                <div class="col-xs-2">
                    <select class="form-control input-sm" name="is_paper">
                        <option value="1">纸质</option>
                        <option value="0">电子</option>
                    </select>
                </div>
                <div class="col-xs-2">
                    <select class="form-control input-sm" name="is_cert">
                        <option value="1">认证</option>
                        <option value="0">普通</option>
                    </select>
                </div>
                <div class="col-xs-2">
                    <select class="form-control input-sm" name="is_excellent">
                        <option value="1">优秀</option>
                        <option value="0">合格</option>
                    </select>
                </div>
            </div>
            <div class="btn-row">
                <div class="fl hint-block"></div>
                <div class="fr">
                    <button class="btn btn-default preview-cert">预览证书</button>
                </div>
            </div>
        </form>
    </section>
    <section class="content-section cert-message">
        <h5>发送消息(<span class="subtitle">该课程发送证书站内信通知的次数：<%= msg_send_info.msg_send_count %></span>)</h5>
        <div class="task-label"><%= msg_send_info.msg_task_ids.length > 0 ? '该课程的证书站内信通知发送的站内信id:  '+msg_send_info.msg_task_ids.join(',') : '' %></div>
        <form class="form-horizontal content-form" onsubmit="return false;">
            <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
            <div class="form-group">
                <label class="col-xs-2 control-label">标题</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="title" value="<%= course_name + '课程证书已发放' %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">正文</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="content" value="<%= '一分耕耘一分收获，恭喜你已经获得' + course_name + '课程证书，快快去申请' %>"/>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-2 control-label">超链文字</label>
                <div class="col-xs-10">
                    <input type="text" class="form-control" name="button" value="去申请"/>
                </div>
            </div>
            <div class="btn-row">
                <div class="fl hint-block"></div>
                <div class="fr">
                    <button class="btn btn-default" data-toggle="modal" data-target="#confirm-send-message-modal">发送</button>
                </div>
            </div>
            <div class="modal fade confirm-modal" id="confirm-send-message-modal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">确认发送</h4>
                        </div>
                        <div class="modal-body">
                            <p class="confirm-desc">请确认学生列表已经保存成功</p>
                            <div class="row">
                                <button type="button" class="btn btn-default confirm-send-message" data-dismiss="modal">确定</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
    <section class="content-section cert-status">
        <h5>证书状态</h5>
        <div class="cf">
            <div class="form-group">
                发证状态：
                <span class="status-text">
                <%
                    _.each(status_list, function(status, idx){
                        if(status.is_checked == 1){
                            print(status.name);
                        }
                    });
                %>
                </span>
            </div>
            <div class="btn-row">
                <div class="fl hint-block"></div>
                <div class="fr">
                    <button class="btn btn-default open-cert-status-modal" data-toggle="modal" data-target="#cert-status-modal">修改证书状态</button>
                </div>
            </div>
        </div>
        <div class="modal fade edit-modal" id="cert-status-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form class="form-horizontal content-form" onsubmit="return false;">
                        <div class="modal-header">
                            <h4 class="modal-title">修改证书状态</h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" name="course_id" value="<%= (typeof course_id == 'undefined') ? '' : course_id %>"/>
                            <div class="form-group">
                                <label class="col-xs-2 control-label">证书状态：</label>
                                <div class="col-xs-10">
                                    <% _.each(status_list, function(status, idx) { %>
                                    <div class="radio-inline">
                                        <label>
                                            <input type="radio" name="status" data-status-text="<%= status.name %>" value="<%= status.id %>" <%= status.is_checked == 1 ? 'checked' : '' %>><%= status.name %>
                                        </label>
                                    </div>
                                    <% }); %>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="fl hint-block"></div>
                            <button type="button" class="btn btn-default save-cert-status-modal">保存</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>