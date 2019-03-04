/**
 * Created by sailengsi on 2017/5/11.
 */

import {Home,Content} from 'layout/';
import {Appraisal} from 'views/';

export default {
	path: '/appraisal',
	name: '评价管理',
  child:true,
	component: Home,
  redirect: '/appraisal/shop/list',
	children:[{
        path: 'shop',
				icon: 'pingjia1',
        name: '评价列表',
        redirect: '/appraisal/shop/list',
        component: Content,
        children:[{
            path: 'list',
            component: Appraisal.List,
        },{
            path: 'edit',
            component: Appraisal.Edit,
        }]
    }]
};
