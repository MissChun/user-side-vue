export default {
  path: 'customerManage',
  name: 'customerManage',
  meta: {
    isVerificationL: true,
    title: '客户健康管理',
    iconName: 'icon-setting'
  },
  component: (resolve) => require(['../page/customerManage/customerManage'], resolve),
  children: [{
    path: 'customerList',
    name: 'customerList',
    meta: {
      title: '客户列表',
      isVerificationL: false
    },
    redirect: '/customerManage/customerList/customerList',
    component: (resolve) => require(['../page/customerManage/customerList/customer'], resolve),
    children: [{
      path: 'customerList',
      name: 'customerList',
      meta: {
        title: '签约列表',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/customerManage/customerList/customerList'], resolve)
    }, {
      path: 'customerEdit/:id',
      name: 'customerEdit',
      meta: {
        title: '签约服务包',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/customerManage/customerList/customerEdit'], resolve)
    }]
  }, {
    path: 'healthManage',
    name: 'healthManage',
    meta: {
      title: '健康管理列表',
      isVerificationL: false
    },
    redirect: '/customerManage/healthManage/healthManageList',
    component: (resolve) => require(['../page/customerManage/healthManage/healthManage'], resolve),
    children: [{
      path: 'healthManageList',
      name: 'healthManageList',
      meta: {
        title: '用户列表',
        isVerificationL: false
      },
      component: (resolve) => require(['../page/customerManage/healthManage/healthManageList'], resolve)
    }]
  }]
}
