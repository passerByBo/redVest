export default [
  {
    //登录管理
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
          {
            name: 'register',
            path: '/user/register',
            component: './User/register',
          },
          {
            name: 'register',
            path: '/user/register-result',
            component: './User/register-result',
          },
        ],
      },
    ],
  },
  {
    //我的店铺
    path: '/home',
    name: '我的店铺',
    icon: 'shop',
    // access: 'canAdmin',
    component: './Home',
  },
  {
    //商品管理
    path: '/merchandise',
    name: '商品管理',
    icon: 'shopping',
    // access: 'canAdmin',
    routes: [
      {
        path: '/merchandise/thematic-group',
        name: '专题组管理',
        component: './Merchandise/ThematicGroup',
      },
      {
        path: '/merchandise/thematic',
        name: '专题管理',
        component: './Merchandise/Thematic',
      },
      {
        path: '/merchandise/brand',
        name: '品牌管理',
        component: './Merchandise/Brand',
      },
      {
        path: '/merchandise/type',
        name: '商品分类管理',
        component: './Merchandise/MerchandiseType',
      },
      {
        path: '/merchandise/product',
        name: 'SPU商品',
        component: './Merchandise/ProductList',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/merchandise/product',
            redirect: '/merchandise/product/list',
          },
          {
            path: '/merchandise/product/list',
            name: '商品列表',
            component: './Merchandise/ProductList/list',
          },
          {
            path: '/merchandise/product/add',
            name: '商品新增',
            component: './Merchandise/ProductList/productForm',
          },
          {
            path: '/merchandise/product/edit',
            name: '商品编辑',
            component: './Merchandise/ProductList/productForm',
          },
          {
            path: '/merchandise/product/list/:id',
            name: '商品详情',
            component: './Merchandise/ProductList/productDetail',
          }
        ],
      },
      {
        path: '/merchandise/model',
        name: '规格模板库',
        component: './Merchandise/SpecificationModel',
      },
      {
        path: '/merchandise/label',
        name: '标签管理',
        component: './Merchandise/Label',
      },
      {
        path: '/merchandise/recycle',
        name: '商品回收站',
        component: './Merchandise/Recycle',
      },
    ],
  },
  {
    //订单管理
    path: '/order',
    name: '订单管理',
    icon: 'orderedList',
    component: './Order',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/order/:id',
        name: '商品详情',
      },
    ],
  },
  {
    //SKU台账
    path: '/sku',
    name: 'SKU台账',
    icon: 'orderedList',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/sku',
        redirect: '/sku/list'
      },
      {
        path: '/sku/list',
        name: 'SKU台账列表',
        component: './SKULedger/List',
        routes: [
          {
            path: '/sku/list/stock-logger',
            name: '库存日志',
            component: './SKULedger/StockLoger',
          },
          {
            path: '/sku/list/checklist',
            name: '出库清单',
            component: './SKULedger/OutStockCount',
          }
        ]
      }
    ]
  },
  {
    //客户管理
    path: '/customer',
    name: '客户管理',
    icon: 'user',
    // access: 'canAdmin',
    routes: [
      {
        path: '/customer/certification',
        name: '商家认证信息',
        icon: 'smile',
        routes: [
          // {
          //   path: '/customer/certification/enterprise-certification',
          //   name: '企业认证申请',
          //   icon: 'smile',
          //   component: './Customer/Certification/EnterpriseCertification',
          //   // hideChildrenInMenu: true,
          //   routes: [
          //     {
          //       path: '/customer/certification/enterprise-certification/enterprise-application',
          //       name: '企业认证申请新增',
          //       component: './Customer/Certification/EnterpriseCertification/EnterpriseApplication',
          //       hideInMenu: true,
          //     },
          //   ],
          // },
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
          // {
          //   path: '/customer/archive/enterprise-info',
          //   name: '企业信息管理',
          //   icon: 'smile',
          //   component: './Customer/Archive/EnterpriseInfo',
          // },
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
    //营销管理
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
            name: '文章分类管理',
            icon: 'table',
            component: './Marketing/AnnouncementInfo/Classification',
          },
          {
            path: 'marketing/announcement-info/announcement',
            name: '公告管理',
            icon: 'table',
            component: './Marketing/AnnouncementInfo/Announcement',
          },
        ],
      },
      {
        path: 'marketing/coupon',
        name: '卡券管理',
        icon: 'table',
        routes: [
          {
            path: 'marketing/coupon/package-maintenance',
            name: '卡券套餐管理',
            icon: 'table',
            component: './Marketing/Coupon/PackageMaintenance',
          },
          {
            path: 'marketing/coupon/coupon-production',
            name: '卡券制作管理',
            icon: 'table',
            component: './Marketing/Coupon/CouponProduction',
          },
        ],
      },
      {
        path: 'marketing/recommend',
        name: '首页推荐管理',
        icon: 'table',
        routes: [
          {
            path: 'marketing/recommend/topic',
            name: '专题精选管理',
            icon: 'table',
            component: './Marketing/HomepageRecommend/Topic',
          },
          {
            path: 'marketing/recommend/banner',
            name: '轮播精选管理',
            icon: 'table',
            component: './Marketing/HomepageRecommend/Banner',
          }, {
            path: 'marketing/recommend/product',
            name: '产品推荐管理',
            icon: 'table',
            component: './Marketing/HomepageRecommend/Product',
          }
        ],
      },
    ],
  },
  {
    //运营管理
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
      // {
      //   path: '/operation/operational-analysis',
      //   name: '运营分析',
      //   component: './Welcome',
      // },
      {
        path: '/operation/order-setting',
        name: '订单设置',
        component: './Operation/OrderSetting',
      },
      {
        path: '/operation/express-model',
        name: '快递模板',
        component: './Operation/ExpressModel',
      },
    ],
  },
  {
    //系统管理
    path: '/system',
    icon: 'container',
    name: '系统管理',
    routes: [
      {
        path: '/system/login-log',
        name: '登录日志',
        component: './System/LoginLog',
      },
      {
        path: '/system/operation-log',
        name: '操作日志',
        component: './System/OperationLog',
      },
    ],
  },
  {
    //帮助中心
    path: '/help',
    icon: 'questionCircle',
    name: '帮助中心',
    routes: [
      {
        path: '/help/document',
        name: '平台帮助文档',
        component: './Welcome',
      },
      {
        path: '/help/contact',
        name: '联系我们',
        component: './TableList',
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
