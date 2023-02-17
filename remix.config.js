/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server.js',
  ignoredRouteFiles: ['**/.*'],
  devServerBroadcastDelay: 2000,
  future: {
    unstable_cssModules: true,
    unstable_tailwind: true,
    unstable_postcss: true,
  },
}
