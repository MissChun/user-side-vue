export default {
    path: 'servicePackageManage',
    name: 'servicePackageManage',
    meta: { 
        isVerificationL: true,
        title: '服务包管理',
        iconName: 'icon-setting'
    },
    component: (resolve) => require(['../page/servicePackageManage/servicePackageManage'], resolve),
    children: [{
        path: 'experienceProjectManage',
        name: "experienceProjectManage",
        meta: {
        title: '体检项目管理',
        isVerificationL: false
        },
        redirect: '/servicePackageManage/experienceProjectManage/experienceProjectList',
        component: (resolve) => require(['../page/servicePackageManage/experienceProjectManage/experienceProjectManage'], resolve),
        children: [{
            path: 'experienceProjectList',
            name: "experienceProjectList",
            meta: {
            title: '体检项目管理列表',
            isVerificationL: false
            },
            component: (resolve) => require(['../page/servicePackageManage/experienceProjectManage/experienceProjectList'], resolve),
        },{
            path: 'settlementPriceEdit/:id',
            name: "settlementPriceEdit",
            meta: {
            title: '设置结算价',
            isVerificationL: false
            },
            component: (resolve) => require(['../page/servicePackageManage/experienceProjectManage/settlementPriceEdit'], resolve),
        }]
    }]
}