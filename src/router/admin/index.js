/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';
import {Admin} from 'views/';

export default {
    path: '/admin',
    name: '系统管理',
    child:true,
    component: Home,
    redirect: '/admin/adminBox/platform',
    children:[{
        path: 'adminBox',
        name: '管理员管理',
        icon:'guanliyuan',
        child:true,
        component: Content,
        children:[{
                path: 'platform',
                name: '平台管理员',
                component: Admin.AdminBox.PlatformAdmin,
            },{
                path: 'adminEdit',
                hidden:true,
                name: '管理员编辑',
                component: Admin.AdminBox.AdminEdit,
            },{
                path: 'role',
                name: '角色管理员',
                component: Admin.AdminBox.PlatformRole,
            },{
                path: 'roleEdit',
                hidden:true,
                name: '角色编辑',
                component: Admin.AdminBox.RoleEdit,
            },{
                path: 'ticket',
                name: '票务管理员',
                component: Admin.AdminBox.Ticket,
            },{
                path: 'ticketEdit',
                hidden:true,
                name: '编辑管理员',
                component: Admin.AdminBox.TicketEdit,
            },{
                path: 'supplier',
                name: '供应商管理员',
                component: Admin.AdminBox.Supplier,
            }]
    },{
        path: 'country',
        name: '国家城市管理',
        child:true,
        icon:'guojia',
        component: Content,
        children:[{
            path: 'city',
            name: '城市管理',
            component: Admin.Country.CityBox,
        },{
            path: 'country',
            name: '国家管理',
            component: Admin.Country.CountryBox,
        },{
            path: 'countryEdit',
            hidden:true,
            name: '国家编辑',
            component: Admin.Country.CountryEdit,
        }]
    },{
        path: 'rule',
        name: '退改规则管理',
        child:true,
        icon:'guizeshezhi',
        component: Content,
        children:[{
          path: 'modifies',
          name: '改签规则列表',
          component: Admin.Rule.Modifies,
        },{
          path: 'returning',
          name: '退款规则列表',
          component: Admin.Rule.Returning,
        },{
          path: 'edit',
          name: '修改',
          hidden:'true',
          component: Admin.Rule.Edit,
        },{
          path: 'edit2',
          name: '修改',
          hidden:'true',
          component: Admin.Rule.Edit2,
        }]
    }]
};
