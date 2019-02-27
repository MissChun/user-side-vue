export default {
    path: 'orderManage',
    name: 'orderManage',
    // title:'订单管理',
    meta: { 
        isVerificationL: true,
        title: '订单管理',
        iconName: 'icon-setting'
    },
    component: (resolve) => require(['../page/orderManage/orderManage'], resolve),
    children: [{
        path: 'physicalOrder',
        name: "physicalOrder",
        meta: {
        title: '体检订单',
        isVerificationL: false
        },
        redirect: '/orderManage/physicalOrder/physicalOrderList',
        component: (resolve) => require(['../page/orderManage/physicalOrder/physicalOrder'], resolve),
        children: [{
            path: 'physicalOrderList',
            name: "physicalOrderList",
            meta: {
            title: '体检订单列表',
            isVerificationL: false
            },
            component: (resolve) => require(['../page/orderManage/physicalOrder/physicalOrderList'], resolve),
        }]
    }]
}