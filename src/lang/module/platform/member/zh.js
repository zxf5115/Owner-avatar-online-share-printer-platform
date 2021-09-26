export const member = {
  list: '会员列表',
  from: '会员操作',
  info: '会员信息',
  view: '会员详情',
  delete: '删除会员',
  export: '导出会员',
  archive_info: '会员档案',
  asset_info: '资金信息',

  member_no: '会员ID',
  avatar: '会员头像',
  username: '会员电话',
  mobile: '手机',
  email: '邮箱',
  nickname: '会员昵称',
  asset_money: '账户余额',
  audit_status: '审核状态',
  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  enable: '解禁',
  disable: '禁用',

  push: 'APP推送',
  push_course: '课程推送',
  push_activity: '活动推送',

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
    info: '会员档案',

    sex: '会员性别',
    attention_total: '关注总数',
    fans_total: '粉丝总数',
    approval_total: '点赞总数',
    accepted_total: '获赞总数',
    city: '所在城市',
    area: '地区',
    address: '详细地址',


    rules: {
      member_id: {
        require: '会员昵称不能为空',
      },
      realname: {
        require: '真实姓名不能为空',
      },
      id_card_no: {
        require: '身份证号不能为空',
      },
    },
  }
}
