const express = require('express');
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const jsonServer = require('json-server');
const historyApiFallback = require('connect-history-api-fallback');
const webpackDevMiddle = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.dev');

const PORT = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(proxy('/api', {
  logLevel: 'debug',
  target: 'http://localhost:3000', // target host
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  pathRewrite: {
    //'^/api/instances': '/api/instances',
    //'^/api/snapshots': '/api/snapshots',
    //'^/api/images': '/api/images',
    //'^/api/networks': '/api/networks',
    //'^/api/subnets': '/api/subnets',
    //'^/api/ports': '/api/ports',
    //'^/api/security-groups': '/api/security-groups',
    //'^/api/keypairs': '/api/keypairs',
    //'^/api/volumes': '/api/volumes',
    //'^/api/routers': '/api/routers',
    //'^/api/floating-ips': '/api/floating-ips',
    //'^/api/backups': '/api/backups',
    //'^/api/notifications': '/api/notifications',
    //'^/api/notification-lists': '/api/notification-lists',
    //'^/api/pools': '/api/pools',
    //'^/api/stacks': '/api/stacks',
    //'^/api/users': '/api/users',

    // proxy to fake api by default
    '^/api': '/fake-api',
  },
  //proxyTable: {
  //  '/api/instances': 'http://193.160.31.31:8080',
  //  '/api/snapshots': 'http://193.160.31.31:8080',
  //  '/api/images': 'http://193.160.31.31:8080',
  //  '/api/networks': 'http://193.160.31.31:8080',
  //  '/api/subnets': 'http://193.160.31.31:8080',
  //  '/api/ports': 'http://193.160.31.31:8080',
  //  '/api/security-groups': 'http://193.160.31.31:8080',
  //  '/api/keypairs': 'http://193.160.31.31:8080',
  //  '/api/volumes': 'http://193.160.31.31:8080',
  //  '/api/routers': 'http://193.160.31.31:8080',
  //  '/api/floating-ips': 'http://193.160.31.31:8080',
  //  '/api/backups': 'http://193.160.31.31:8080',
  //  '/api/notifications': 'http://193.160.31.31:8080',
  //  '/api/notification-lists': 'http://193.160.31.31:8080',
  //  '/api/pools': 'http://193.160.31.31:8080',
  //  '/api/stacks': 'http://193.160.31.31:8080',
  //  '/api/users': 'http://193.160.31.31:8080',
  //},
}));

const router = jsonServer.router('./src/api/mock/db.json');
app.use(jsonServer.rewriter({
  '/fake-api/monitors/instance/:id/cpu': '/fake-api/instanceCpuMonitor',
  '/fake-api/monitors/instance/:id/memory': '/fake-api/instanceMemoryMonitor',
  '/fake-api/monitors/instance/:id/disk-write': '/fake-api/instanceDiskWriteMonitor',
  '/fake-api/monitors/instance/:id/disk-read': '/fake-api/instanceDiskReadMonitor',
  '/fake-api/monitors/instance/:id/network-in': '/fake-api/instanceNetworkInMonitor',
  '/fake-api/monitors/instance/:id/network-out': '/fake-api/instanceNetworkOutMonitor',
  '/fake-api/floating-ips': '/fake-api/floatingIps',
  '/fake-api/virtual-nics': '/fake-api/virtualNics',
  '/fake-api/subnets/count': '/fake-api/subnetsCount',
  '/fake-api/bare-metals': '/fake-api/bareMetals',
  '/fake-api/security-groups': '/fake-api/securityGroups',
  '/fake-api/notification-lists': '/fake-api/notificationLists',
  '/fake-api/instances/config': '/fake-api/instanceConfig',
  '/fake-api/alarms/config': '/fake-api/alarmConfig',
  '/fake-api/volumes/config': '/fake-api/volumeConfig',
  '/fake-api/pools/config': '/fake-api/poolConfig',
  '/fake-api/stacks/config': '/fake-api/stackConfig',
  '/fake-api/auth/tokens': '/fake-api/tokens',
}));
app.use('/fake-api', router);

// Allow HTML5 mode routing, MUST be last.
app.use(historyApiFallback({
  verbose: false,
}));

app.use(webpackDevMiddle(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
}));

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening on port ${PORT}`);
});

