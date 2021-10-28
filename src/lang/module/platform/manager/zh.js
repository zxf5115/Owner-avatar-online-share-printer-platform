export const manager = {
  list: '店长列表',
  from: '店长操作',
  info: '店长信息',
  view: '店长详情',
  delete: '删除店长',
  export: '导出店长',
  archive_info: '店长档案',
  vip_info: '贵宾信息',
  parent_info: '代理人信息',
  asset_info: '资金信息',

  member_no: '店长ID',
  avatar: '店长头像',
  username: '店长电话',
  nickname: '店长姓名',
  agent_name: '所属代理商',
  asset_money: '账户余额',
  audit_status: '审核状态',
  proportion: '分成金额',
  order_total: '订单总量',
  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  enable: '解禁',
  disable: '禁用',

  role: {
    list: '身份列表',
    from: '身份操作',
    title: '身份名称',
    content: '身份描述',
    distribution: '分配身份',

    menu: '菜单权限',
    interface: '接口权限',

    rules: {
      title: {
        require: '身份名称不能为空',
        length: '长度在 1 到 50 个字符',
      },
    },
  },

  password: {
    from: '密码修改',

    old_password: '当前密码',
    password: '新密码',
    password_confirmation: '确认密码',
    please_old_password: '请输入当前登录密码',
    rules: {
      old_password: {
        require: '当前登录密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
      password: {
        require: '新密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
      password_confirmation: {
        require: '确认密码不能为空',
        length: '长度在 1 到 32 个字符',
      },
    }
  },

  archive: {
    list: '档案列表',
    from: '档案操作',
    view: '档案详情',
    info: '店长档案',

    age: '店长年龄',
    sex: '店长性别',
    attention_total: '关注总数',
    fans_total: '粉丝总数',
    approval_total: '点赞总数',
    accepted_total: '获赞总数',
    city: '所在城市',
    area: '地区',
    address: '详细地址',


    rules: {
      member_id: {
        require: '店长昵称不能为空',
      },
      realname: {
        require: '真实姓名不能为空',
      },
      id_card_no: {
        require: '身份证号不能为空',
      },
    },
  },

  asset: {
    proportion: '分成金额',
  }
}
