import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  publicPath: './',
  history: {
    type: 'hash',
  },
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:7002',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
