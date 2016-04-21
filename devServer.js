const express = require('express');
const webpack = require('webpack');
const jsonServer = require('json-server');
const historyApiFallback = require('connect-history-api-fallback');
const webpackDevMiddle = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.dev');

const PORT = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

const router = jsonServer.router('./src/api/mock/db.json');
app.use(jsonServer.rewriter({
  '/api/monitors/instance/:id/cpu': '/api/instanceCpuMonitor',
  '/api/monitors/instance/:id/memory': '/api/instanceMemoryMonitor',
  '/api/monitors/instance/:id/disk-write': '/api/instanceDiskWriteMonitor',
  '/api/monitors/instance/:id/disk-read': '/api/instanceDiskReadMonitor',
  '/api/monitors/instance/:id/network-in': '/api/instanceNetworkInMonitor',
  '/api/monitors/instance/:id/network-out': '/api/instanceNetworkOutMonitor',
  '/api/floating-ips': '/api/floatingIps',
  '/api/virtual-nics': '/api/virtualNics',
  '/api/subnets/count': '/api/subnetsCount',
  '/api/bare-metals': '/api/bareMetals',
  '/api/security-groups': '/api/securityGroups',
  '/api/notification-lists': '/api/notificationLists',
}));
app.use('/api', router);

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

