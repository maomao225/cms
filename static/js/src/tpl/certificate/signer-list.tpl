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