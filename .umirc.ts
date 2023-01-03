import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [{ path: '/', component: '@/pages/home' }],
    },
  ],
  history: {
    type: 'hash',
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      // target: 'http://localhost:7001',
      target: 'http://43.143.38.230:7001', // 服务器地址
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
