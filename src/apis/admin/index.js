/**
 * Created by sailengsi on 2017/4/30.
 */

/**
 * 用户模块
 * @type {Object}
 */
export default [
  {
    name: '城市列表',
    method: 'ctys',
    path: '/sys/citys',
    type: 'get'
  },
  {
    name: '国家列表',
    method: 'countrys',
    path: '/sys/countrys',
    type: 'get'
  },
  {
    name: '编辑/添加城市',
    method: 'city_edit',
    path: '/sys/city_edit',
    type: 'post'
  },
  {
    name: '删除城市',
    method: 'city_del',
    path: '/sys/city_del',
    type: 'post'
  },
  {
    name: '编辑国家',
    method: 'country_edit',
    path: '/sys/country_edit',
    type: 'post'
  },
  {
    name: '启用/禁用国家',
    method: 'country_change_status',
    path: '/sys/country_change_status',
    type: 'post'
  },
  //角色
  {
    name: '角色分组列表',
    method: 'auth_groups',
    path: '/auth/groups',
    type: 'get'
  },
  {
    name: '分组详情',
    method: 'auth_group',
    path: '/auth/group',
    type: 'get'
  },
  {
    name: '编辑角色',
    method: 'auth_group_edit',
    path: '/auth/group_edit',
    type: 'post'
  },
  //公共
  {
    name: '删除管理员',
    method: 'user_admin_del',
    path: '/user/admin_del',
    type: 'post'
  },
  {
    name: '禁用／启用管理员',
    method: 'user_admin_change_status',
    path: '/user/admin_change_status',
    type: 'post'
  },
  {
    name: '修改密码',
    method: 'user_admin_change_pwd',
    path: '/user/admin_change_pwd',
    type: 'post'
  },
  //平台
  {
    name: '平台管理员列表',
    method: 'user_admins',
    path: '/user/admins',
    type: 'get'
  },
  {
    name: '添加平台管理员',
    method: 'user_admin_add',
    path: '/user/admin_add',
    type: 'post'
  },
  {
    name: '编辑平台管理员',
    method: 'user_admin_edit',
    path: '/user/admin_edit',
    type: 'post'
  },
  {
    name: '平台管理员详情',
    method: 'user_admin',
    path: '/user/admin',
    type: 'get'
  },

  //票务
  {
    name: '票务管理员列表',
    method: 'user_ticket_admins',
    path: '/user/ticket_admins',
    type: 'get'
  },
  {
    name: '添加票务管理员',
    method: 'user_ticket_admin_add',
    path: '/user/ticket_admin_add',
    type: 'post'
  },
  {
    name: '编辑票务管理员',
    method: 'user_ticket_admin_edit',
    path: '/user/ticket_admin_edit',
    type: 'post'
  },
  //供应商
  {
    name: '供应商管理员列表',
    method: 'user_supplier_admins',
    path: '/user/supplier_admins',
    type: 'get'
  },
  {
    name: '供应商管理员详情',
    method: 'user_supplier_admin',
    path: '/user/supplier_admin',
    type: 'get'
  },
  //退票改签规则
  {
    name: '退改签规则列表',
    method: 'change_lists',
    path: '/change/lists',
    type: 'get'
  },
  {
    name: '评价详情',
    method: 'change_detail',
    path: '/change/detail',
    type: 'get'
  },
  {
    name: '退改签添加修改',
    method: 'change_edit',
    path: '/change/edit',
    type: 'post'
  },
  {
    name: '删除',
    method: 'change_del',
    path: '/change/del',
    type: 'post'
  }
]
