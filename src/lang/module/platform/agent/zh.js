export const agent = {
  list: '代理商列表',
  from: '代理商操作',
  info: '代理商信息',
  view: '代理商详情',
  delete: '删除代理商',
  export: '导出代理商',
  distribution: '立即分配',
  archive_info: '代理商档案',
  asset_info: '资金信息',
  facility_info: '设备信息',
  printer_info: '打印机信息',
  bank_info: '银行卡信息',
  apply_info: '申请文书',
  bank_card: '银行卡',

  level: '代理商级别',
  another_name: '代理商别名',
  avatar: '代理商头像',
  username: '代理商电话',
  mobile: '手机',
  email: '邮箱',
  nickname: '代理商姓名',
  audit_status: '审核状态',
  parent_agent: '上级代理商',
  parent_agent_mobile: '上级代理商电话',
  below_agent: '下属代理商',
  below_manager: '下属店长',
  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  rules: {
    username: {
      require: '代理商电话不能为空',
    },
    nickname: {
      require: '代理商姓名不能为空',
    },
    level: {
      require: '代理商级别不能为空',
    },
  },



  facility: '设备',
  enable: '解禁',
  disable: '禁用',

  archive: {
    list: '档案列表',
    from: '档案操作',
    view: '档案详情',
    info: '代理商档案',

    age: '代理商年龄',
    sex: '代理商性别',
    id_card_no: '身份证号码',
    city: '所在城市',
    area: '地区',
    address: '详细地址',
    source: '设备来源',
    register_qrcode_url: '注册二维码',
    invitation_qrcode_url: '邀请二维码',

    rules: {
      member_id: {
        require: '代理商昵称不能为空',
      },
      realname: {
        require: '真实姓名不能为空',
      },
      id_card_no: {
        require: '身份证号不能为空',
      },
    },
  },

  resource: {
    business_license: '营业执照',
    contract: '分销合同',
    equipment: '设备列表',
  },

  asset: {
    money: '账户余额(元)',
    proportion: '收益(元)',
    manger_proportion: '直属店长收益(元)',
    withdrawal_money: '已提现金额(元)',
    order_total: '订单总量',
    should_printer_total: '认购数量',
    already_printer_total: '已分配总量',
    without_printer_total: '未分配总量',
  },

  bank: {
    list: '银行卡列表',
    from: '银行卡操作',
    view: '银行卡详情',

    company_name: '公司名称',
    open_bank_name: '开户行名称',
    branch_bank_name: '支行名称',
    card_no: '银行卡号',

    rules: {
      company_name: {
        require: '公司名称不能为空',
      },
      open_bank_name: {
        require: '开户行名称不能为空',
      },
      branch_bank_name: {
        require: '支行名称不能为空',
      },
      card_no: {
        require: '银行卡号不能为空',
      },
    },
  }
}
