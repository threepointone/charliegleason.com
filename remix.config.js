/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['**/*.css'],
  server: './server.ts',
  serverBuildPath: 'functions/[[path]].js',
  serverConditions: ['workerd', 'worker', 'browser'],
  serverDependenciesToBundle: 'all',
  serverMainFields: ['browser', 'module', 'main'],
  serverMinify: true,
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  serverBuildTarget: 'cloudflare-pages',
  devServerBroadcastDelay: 2000,
  future: {
    v2_dev: true,
    unstable_cssModules: true,
    unstable_tailwind: true,
    unstable_postcss: true,
  },
}
