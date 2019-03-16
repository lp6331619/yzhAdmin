/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';
import {Notice} from 'views/';

export default {
	path: '',
	name: '',
  child:true,
	component: Home,
  redirect: '/notice/list',
	children:[{
        path: '/notice',
        name: '评价列表',
        redirect: '/notice/list',
        component: Content,
        children:[{
            path: 'list',
            component: Notice.List,
        },{
            path: 'edit',
            hidden:true,
            component: Notice.Edit,
        }]
    }]
};
