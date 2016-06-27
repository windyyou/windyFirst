module.exports = process.env.NODE_ENV === 'production' ?
  require('./Root.prod.jsx') : require('./Root.dev.jsx');
