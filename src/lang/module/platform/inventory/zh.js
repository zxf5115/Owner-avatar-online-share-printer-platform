export const inventory = {
  list: '库存列表',
  log_info: '日志',

  printer_total: '打印机合计',
  ink_total: '墨盒合计',
  paper_total: '纸张合计',

  type: '设备类型',
  code: '设备编号',
  model: '设备型号',
  equipment_status: '设备状态',
  inventory_status: '库存状态',
  create_time: '入库时间',

  log: {
    logistics_info: '物流',
    attachment_info: '附件',

    content: '操作行为',
    operator: '操作人',
    create_time: '操作时间',
  },

  inbound: {
    list: '入库列表',
    from: '入库申请',
    update: '入库',
    basic_info: '设备信息',
    inventory_info: '盘点信息',
    resource_info: '资料信息',
    abnormal_info: '异常',
    receipt_info: '签收信息',
    finish_info: '完成信息',
    detail_info: '明细',

    write: '填写信息',
    inventory: '盘点',
    finish: '完成',

    nickname: '系统入库',
    category: '入库类型',
    total: '入库数量',
    create_time: '入库时间',

    rules: {
      picture: {
        require: '单据不能为空',
      },
    },

    abnormal: {
      inbound_id: '入库批次',
      type: '异常类型',
      model: '异常型号',
      code: '异常编号',
      create_time: '产生时间',
    },

    resource: {
      device_code: '盘点设备码',
      picture: '凭证',
      device_code_warehouse: '对比设备码',
      receipt_form: '签收单',
    },
  },

  outbound: {
    list: '出库列表',
    from: '出库申请',
    update: '出库',
    agent_info: '代理商信息',
    equipment_info: '设备信息',
    logistics_info: '物流信息',
    resource_info: '资料信息',
    receipt_info: '签收信息',
    finish_info: '完成信息',

    write: '填写信息',
    send: '发货',
    finish: '完成',

    category: '出库类型',
    device_code: '设备码',
    total: '出库数量',
    operator: '操作人',
    picture: '单据',
    company_id: '物流公司',
    logistics_no: '物流单号',
    receipt_form: '签收单',
    create_time: '出库时间',

    rules: {
      member_id: {
        require: '代理商不能为空',
      },
      type: {
        require: '类型不能为空',
      },
      category: {
        require: '出库类型不能为空',
      },
      device_code: {
        require: '设备码不能为空',
      },
      total: {
        require: '出库数量不能为空',
      },
      operator: {
        require: '操作人不能为空',
      },
      company_name: {
        require: '物流公司不能为空',
      },
      logistics_no: {
        require: '物流单号不能为空',
      },
    },

    logistics: {
      company_name: '物流公司',
      logistics_no: '物流单号',
    },

    resource: {
      device_code: '盘点设备码',
      picture: '凭证',
      receipt_form: '签收单',
    },
  },
}
