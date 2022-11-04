import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // treeShaking: true,

  // plugins: [
  //   // ref: https://umijs.org/plugin/umi-plugin-react.html
  //   [
  //     'umi-plugin-react',
  //     {
  //       antd: true,
  //       dva: true,
  //       dynamicImport: false,
  //       title: 'umi',
  //       dll: false,
  //     },
  //   ],
  // ],
  // routes: [{ path: '/', component: '@/pages/index' }],
  publicPath: './',
  history: {
    type: 'hash',
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      // target: 'http://43.143.38.230:7001', // 服务器地址
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
