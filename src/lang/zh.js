import  {common}  from './system/platform/common/zh'
import  {login}  from './system/platform/login/zh'
import  {user}  from './system/platform/user/zh'
import  {menu}  from './system/platform/menu/zh'
import  {message}  from './system/platform/message/zh'
import  {config}  from './system/platform/config/zh'
import  {setting}  from './system/platform/setting/zh'
import  {log}  from './system/platform/log/zh'




// ---------------------------------------
// 模块

import  {organization}  from './module/platform/organization/zh'

import  {member}  from './module/platform/member/zh'
import  {manager}  from './module/platform/manager/zh'
import  {agent}  from './module/platform/agent/zh'

import  {advertising}  from './module/platform/advertising/zh'

import  {order}  from './module/platform/order/zh'

import  {complain}  from './module/platform/complain/zh'

import  {notice}  from './module/platform/notice/zh'

import  {financial}  from './module/platform/financial/zh'

import  {problem}  from './module/platform/common/problem/zh'

import  {contact}  from './module/platform/contact/zh'

import  {statistical}  from './module/platform/statistical/zh'

import  {printer}  from './module/platform/printer/zh'

import  {material}  from './module/platform/material/zh'

import  {repair}  from './module/platform/repair/zh'

import  {inventory}  from './module/platform/inventory/zh'

import  {bank}  from './module/platform/common/bank/zh'

export default {

  // 公共
  common: {
    ...common
  },

  // 登录
  login: {
    ...login
  },

  // 用户
  user: {
    ...user
  },

  // 菜单
  menu: {
    ...menu
  },

  // 消息
  message: {
    ...message
  },

  // 配置
  config: {
    ...config
  },

  // 设置
  setting: {
    ...setting
  },

  // 日志
  log: {
    ...log
  },

  // ------------------------------------

  // 广告
  advertising: {
    ...advertising
  },

  // 机构
  organization: {
    ...organization
  },

  // 会员
  member: {
    ...member
  },

  // 店长
  manager: {
    ...manager
  },

  // 代理人
  agent: {
    ...agent
  },

  // 订单
  order: {
    ...order
  },

  // 投诉
  complain: {
    ...complain
  },

  // 通知
  notice: {
    ...notice
  },

  // 财务
  financial: {
    ...financial
  },

  // 常见问题
  problem: {
    ...problem
  },

  // 联系客服
  contact: {
    ...contact
  },

  // 统计
  statistical: {
    ...statistical
  },

  // 打印机
  printer: {
    ...printer
  },

  // 耗材
  material: {
    ...material
  },

  // 报修
  repair: {
    ...repair
  },

  // 库存
  inventory: {
    ...inventory
  },

  // 银行
  bank: {
    ...bank
  },
}
