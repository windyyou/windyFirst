const path = require('path');
const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const proxy = require('http-proxy-middleware');
const jsonServer = require('json-server');
const historyApiFallback = require('connect-history-api-fallback');

const distPath = path.join(__dirname, './dist');

const PORT = process.env.PORT || 3000;
const app = express();

// Enable various security helpers.
app.use(helmet());

const proxyServer = 'http://193.160.31.31:8080';

app.use(proxy('/api', {
  logLevel: 'debug',
  target: 'http://localhost:3000', // target host
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  pathRewrite: {
    '^/api/instances': '/api/instances',
    '^/api/snapshots': '/api/snapshots',
    '^/api/images': '/api/images',
    '^/api/networks': '/api/networks',
    '^/api/subnets': '/api/subnets',
    '^/api/ports': '/api/ports',
    '^/api/security-groups': '/api/security-groups',
    '^/api/keypairs': '/api/keypairs',
    '^/api/volumes': '/api/volumes',
    '^/api/routers': '/api/routers',
    '^/api/floating-ips': '/api/floating-ips',
    '^/api/backups': '/api/backups',
    '^/api/notifications': '/api/notifications',
    '^/api/notification-lists': '/api/notification-lists',
    '^/api/pools': '/api/pools',
    '^/api/stacks': '/api/stacks',
    '^/api/operations': '/api/operations',

    // proxy to fake api by default
    '^/api': '/fake-api',
  },
  proxyTable: {
    '/api/instances': proxyServer,
    '/api/snapshots': proxyServer,
    '/api/images': proxyServer,
    '/api/networks': proxyServer,
    '/api/subnets': proxyServer,
    '/api/ports': proxyServer,
    '/api/security-groups': proxyServer,
    '/api/keypairs': proxyServer,
    '/api/volumes': proxyServer,
    '/api/routers': proxyServer,
    '/api/floating-ips': proxyServer,
    '/api/backups': proxyServer,
    '/api/notifications': proxyServer,
    '/api/notification-lists': proxyServer,
    '/api/pools': proxyServer,
    '/api/stacks': proxyServer,
    '/api/operations': proxyServer,
  },
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
  '/fake-api/auth/sign-up': '/fake-api/signup',
}));
app.use('/fake-api', router);

// Allow HTML5 mode routing.
app.use(historyApiFallback({
  index: '/',
  verbose: true,
}));

app.use(express.static(distPath));

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}`);
});

