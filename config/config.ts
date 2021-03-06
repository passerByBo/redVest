// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import routes from './routes';
const { SERVE_ENV = 'idc' } = process.env;
const serveUrlMap = {
  dev: 'http://10.10.10.54:8168',
  pre: '',
  test: '',
  idc: 'http://10.10.10.54:8168',
};

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: false,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: false,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/prod-api': {
      target: serveUrlMap[SERVE_ENV as string],
      changeOrigin: true,
    },
    '/profile': {
      target: serveUrlMap[SERVE_ENV as string],
      changeOrigin: true,
      pathRewrite: { '^/profile': '/prod-api/profile/' },
    },
  }, //proxy[REACT_APP_ENV || 'dev']
  manifest: {
    basePath: '/',
  },
  openAPI: {
    requestLibPath: "import { request } from 'umi'",
    // 或者使用在线的版本
    // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
    schemaPath: join(__dirname, 'oneapi.json'),
    mock: false,
  },
  //  chunks: ['vendors', 'umi'],
  //  chainWebpack: function (config, { webpack }) {
  //      config.merge({
  //        optimization: {
  //          splitChunks: {
  //            chunks: 'all',
  //            minSize: 30000,
  //            minChunks: 3,
  //            automaticNameDelimiter: '.',
  //            cacheGroups: {
  //              vendor: {
  //                name: 'vendors',
  //                test({ resource }) {
  //                  return /[\\/]node_modules[\\/]/.test(resource);
  //                },
  //                priority: 10,
  //              },
  //            },
  //          },
  //        },
  //      });
  //  },
});
