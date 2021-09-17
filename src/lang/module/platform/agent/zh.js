export const agent = {
  list: '代理商列表',
  from: '代理商操作',
  info: '代理商信息',
  view: '代理商详情',
  delete: '删除代理商',
  export: '导出代理商',
  archive_info: '代理商档案',
  asset_info: '资金信息',
  social_info: '社交信息',
  certification_info: '认证信息',
  certification_personal: '个人认证',
  certification_company: '企业认证',
  certification_project: '项目认证',
  certification_status: '认证状态',
  certification_content: '认证意见',

  member_no: '代理商ID',
  avatar: '代理商头像',
  username: '代理商电话',
  mobile: '手机',
  email: '邮箱',
  nickname: '代理商昵称',
  asset_money: '账户余额',
  audit_status: '审核状态',
  status: '账号状态',
  last_login_time: '最后登录时间',
  create_time: '注册时间',

  enable: '解禁',
  disable: '禁用',

  archive: {
    list: '档案列表',
    from: '档案操作',
    view: '档案详情',
    info: '代理商档案',

    sex: '代理商性别',
    attention_total: '关注总数',
    fans_total: '粉丝总数',
    approval_total: '点赞总数',
    accepted_total: '获赞总数',
    city: '所在城市',
    area: '地区',
    address: '详细地址',


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

  certification: {
    personal: {
      id_card_front_picture: '身份证正面照片',
      id_card_behind_picture: '身份证反面照片',
    },
    company: {
      company_name: '企业名称',
      business_license_no: '营业执照号',
      business_license_picture: '营业执照图片',
    },
    project: {
      project_name: '项目名称',
      project_logo: '项目logo',
      realname: '联系人',
      mobile: '联系人手机号',
      project_category: '项目分类',
      project_website: '项目官网',
      project_document: '白皮书地址',
      project_social: '社交媒体',
      project_report: '审计报告',
      project_github: 'github地址',
    },
  }
}
