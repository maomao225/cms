<div class="cert-order-detail">
  <div class="detail-title">用户信息</div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">用户名：</div>
    <div class="col-xs-10"><%= username %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">用户id：</div>
    <div class="col-xs-10"><%= user_id %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">用户邮箱：</div>
    <div class="col-xs-10"><%= email %></div>
  </div>

  <div class="detail-title">订单信息</div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">订单号：</div>
    <div class="col-xs-10"><%= order_id %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">订单类型：</div>
    <div class="col-xs-10"><%= order_type_name %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">订单状态：</div>
    <div class="col-xs-10"><%= status_name %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">下单时间：</div>
    <div class="col-xs-10"><%= moment(created_at).format('YYYY-MM-DD HH:mm:ss') %></div>
  </div>

  <div class="detail-title">证书信息</div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">课程名称：</div>
    <div class="col-xs-10"><%= course_info_list.map(function(course){return course.course_name;}).join(' / ') %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">开课时间：</div>
    <div class="col-xs-10"><%= course_info_list.map(function(course){return moment(course.start).format('YYYY-MM-DD HH:mm:ss');}).join(' / ') %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">证书姓名：</div>
    <div class="col-xs-10"><%= credential_name %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">证书类型：</div>
    <div class="col-xs-10"><%= course_info_list.map(function(course){return course.cre_type;}).join(' / ') %></div>
  </div>

  <div class="detail-title">价格信息</div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">原价：</div>
    <div class="col-xs-10"><%= course_info_list.map(function(course){return course.min_price;}).join(' / ') %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">折扣/减免：</div>
    <div class="col-xs-10"><%= course_info_list.map(function(course){return course.discount || course.preferential_lines;}).join(' / ') %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">订单金额：</div>
    <div class="col-xs-10"><%= order_price %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">抵扣类型：</div>
    <div class="col-xs-10"><%= deduction_type_name %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">优惠券：</div>
    <div class="col-xs-10"><%= course_info_list.map(function(course){return course.par;}).join(' / ') %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">实付金额：</div>
    <div class="col-xs-10"><%= thirdpart_trade_totalfee %></div>
  </div>

  <div class="detail-title">支付信息</div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">支付方式：</div>
    <div class="col-xs-10"><%= payway %></div>
  </div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">交易流水号：</div>
    <div class="col-xs-10"><%= thirdpart_tradeno %></div>
  </div>

  <div class="detail-title">发票信息</div>
  <div class="detail-row">
    <div class="col-xs-2 inline-desc">发票抬头：</div>
    <div class="col-xs-10"><%= invoice_title %></div>
  </div>

  <% if((typeof address_id != 'undefined') && address_id != null && address_id != 0){ %>
  <form action="" class="content-form form-horizontal">
    <div class="detail-title">物流信息</div>
    <input type="hidden" name="address_id" value="<%= address_id %>"/>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">收件人：</div>
      <div class="col-xs-4">
        <input type="text" class="form-control input-sm" name="receiver" value="<%= receiver %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">固定电话：</div>
      <div class="col-xs-4">
        <input type="text" class="form-control input-sm" name="fixline" value="<%= fixline %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">移动电话：</div>
      <div class="col-xs-4">
        <input type="text" class="form-control input-sm" name="mobile" value="<%= mobile %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">收货地址：</div>
      <div class="col-xs-4">
        <input type="text" class="form-control input-sm" name="address" value="<%= address %>">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">物流公司：</div>
      <div class="col-xs-4">
        <select class="form-control input-sm" name="waytype">
          <% _.each(waytype_list, function(item, idx) { %>
          <option value="<%= item.id %>" <%= item.is_checked == 1 ? 'selected' : '' %>><%= item.name %></option>
          <% }); %>
        </select>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-2 inline-desc">快递单号：</div>
      <div class="col-xs-4">
        <input type="text" class="form-control input-sm" name="waybill" value="<%= waybill %>">
      </div>
    </div>
    <div class="detail-row">
      <div class="col-xs-10 text-danger hint-block"></div>
      <div class="col-xs-6 clear-left">
        <button type="button" class="btn btn-default save-btn">保存</button>
        <button type="button" class="btn btn-default back-btn">返回</button>
      </div>
    </div>
  </form>
  <% } else { %>
  <div class="detail-row">
    <div class="col-xs-6">
      <button type="button" class="btn btn-default back-btn">返回</button>
    </div>
  </div>
  <% } %>
</div>