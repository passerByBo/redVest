export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  }, //我的店铺
  {
    path: '/home',
    name: '我的店铺',
    icon: 'shop',
    // access: 'canAdmin',
    component: './Home',
  }, //商品管理
  {
    path: '/merchandise',
    name: '商品管理',
    icon: 'shopping',
    access: 'canAdmin',
    // component: './Merchandise',
    routes: [
      {
        path: '/merchandise/thematic-group',
        name: '专题组管理',
        icon: 'smile',
        component: './Merchandise/ThematicGroup',
      },
      {
        path: '/merchandise/thematic',
        name: '专题管理',
        icon: 'smile',
        component: './Merchandise/Thematic',
      },
      {
        path: '/merchandise/brand',
        name: '品牌管理',
        icon: 'smile',
        component: './Merchandise/Brand',
      },
      {
        path: '/merchandise/type',
        name: '类型管理',
        icon: 'smile',
        component: './Merchandise/MerchandiseType',
      },
      {
        path: '/merchandise/product-list',
        name: '商品列表',
        icon: 'smile',
        component: './Merchandise/ProductList',
      },
    ],
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'orderedList',
    component: './Order',
  },
  {
    path: '/customer',
    name: '客户管理',
    icon: 'user',
    access: 'canAdmin',
    routes: [
      {
        path: '/customer/certification',
        name: '认证信息',
        icon: 'smile',
        routes: [
          {
            path: '/customer/certification/enterprise-certification',
            name: '企业认证申请',
            icon: 'smile',
            component: './Customer/Certification/EnterpriseCertification',
          },
          {
            path: '/customer/certification/merchant-certification',
            name: '商家认证申请',
            icon: 'smile',
            component: './Customer/Certification/MerchantCertification',
          },
        ],
      },
      {
        path: '/customer/archive',
        name: '归档信息管理',
        icon: 'smile',
        routes: [
          {
            path: '/customer/archive/enterprise-info',
            name: '企业信息管理',
            icon: 'smile',
            component: './Customer/Archive/EnterpriseInfo',
          },
          {
            path: '/customer/archive/business-info',
            name: '商家信息管理',
            icon: 'smile',
            component: './Customer/Archive/BusinessInfo',
          },
          {
            path: '/customer/archive/member-info',
            name: '会员信息管理',
            icon: 'smile',
            component: './Customer/Archive/MemberInfo',
          },
        ],
      },
    ],
  },
  {
    path: '/marketing',
    name: '营销管理',
    icon: 'fund',
    routes: [
      {
        path: 'marketing/announcement-info',
        name: '公告资讯管理',
        icon: 'table',
        routes: [
          {
            path: 'marketing/announcement-info/classification',
            name: '分类管理',
            icon: 'table',
            component: './Marketing/AnnouncementInfo/Classification',
          },
          {
            path: 'marketing/announcement-info/announcement',
            name: '公告管理',
            icon: 'table',
            component: './Marketing/AnnouncementInfo/Announcement',
          }
        ],
      },
      {
        path: 'marketing/coupon',
        name: '卡券管理',
        icon: 'table',
        routes: [
          {
            path: 'marketing/coupon/package-maintenance',
            name: '套餐维护',
            icon: 'table',
            component: './Marketing/Coupon/PackageMaintenance',
          },
          {
            path: 'marketing/coupon/coupon-production',
            name: '卡券制作',
            icon: 'table',
            component: './Marketing/Coupon/CouponProduction',
          },
        ],
      },
      {
        path: 'marketing/sharing-rules',
        name: '分享规则管理',
        icon: 'table',
        component: './Marketing/SharingRules',
      },
    ],
  },
  {
    path: '/operation',
    name: '运营管理',
    icon: 'robot',
    routes: [
      {
        path: '/operation/area',
        name: '省市区管理',
        component: './Operation/Area',
      },
      {
        path: '/operation/withdrawal',
        name: '提现管理',
        component: './Operation/Withdrawal',
      },
      {
        path: '/operation/operational-analysis',
        name: '运营分析',
        component: './Welcome',
      },
    ],
  },
  {
    path: 'log',
    icon: 'container',
    name: '操作日志',
    component: './Welcome',
  },
  {
    path: '/help',
    icon: 'questionCircle',
    name: '帮助中心',
    component: './Home',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
