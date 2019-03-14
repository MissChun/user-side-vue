/**
 * @description 接口文档API,用于后端接口查询
 * @param
 *   url:后端接口url（必需）
 *   method:后端接口方法（必需）
 *   desc:后端接口描述 （可选）
 *   param:接口参数 （可选）
 *     desc:参数描述（可选）
 */

const api = {
  deleteProject: {
    url: '/api/v1/sub-projects/:id',
    method: 'delete',
    desc: "删除类别、小项",
    param: {
      
    }
  },
  getProjectDetail: {
    url: '/api/v1/sub-projects/:id',
    method: 'get',
    desc: "检查项详情",
    param: {
      
    }
  },
  getProjectList: {
    url: '/api/v1/sub-projects',
    method: 'get',
    desc: "检查项列表",
    param: {
      
    }
  },
  updateCategory: {
    url: '/api/v1/sub-projects/:id',
    method: 'patch',
    desc: "更新检查项类别",
    param: {
      
    }
  },
  addCategory: {
    url: '/api/v1/sub-projects',
    method: 'post',
    desc: "新增检查项类别",
    param: {
      
    }
  },
  associatedPartnersDetail: {
    url: '/api/v1/enterprises/:id',
    method: 'get',
    desc: "合作方详情",
    param: {
      
    }
  },
  associatedPartnersList: {
    url: '/api/v1/enterprise-partner/:enterpriseId',
    method: 'get',
    desc: "关联合作方列表",
    param: {
      
    }
  },
  associatedPartners: {
    url: '/api/v1/enterprise-partner/:enterpriseId',
    method: 'post',
    desc: "关联合作方",
    param: {
      
    }
  },
  updatePartner: {
    url: '/api/v1/enterprises/:id',
    method: 'patch',
    desc: "更新合作方",
    param: {
      
    }
  },
  addPartner: {
    url: '/api/v1/enterprises',
    method: 'post',
    desc: "新增合作方",
    param: {
      
    }
  },
  partnerTypeList: {
    url: '/api/v1/enterprise-types',
    method: 'get',
    desc: "合作方类型列表",
    param: {
      
    }
  },
  login: {
    url: '/api/v1/auth',
    method: 'post',
    notNeedToken: true,
    desc: "登录",
    param: {
      username:'用户名',
      password:'密码'
    }
  },
  register: {
    url: '/api/v1/register',
    method: 'post',
    notNeedToken: true,
    desc: "注册",
    param: {
      username:'用户名',
      password:'密码'
    }
  },
}


export default api;
