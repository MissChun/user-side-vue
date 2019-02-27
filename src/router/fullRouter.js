import orderManage from './orderManage'
export default [{
  path: '',
  name: 'index',
  redirect: '/orderManage',
  component: (resolve) => require(['../page/MainFirst'], resolve),
  meta: {
    title: '首页'
  },
  children: [
    orderManage,
  ]
}];
