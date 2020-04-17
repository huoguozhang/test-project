'use strict';

const Hapi = require('hapi');
const routes = require('./route')
const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

const init = async () => {

  await server.start();
  server.route(
    // 创建路由
    routes
  );
  await server.register(require('inert'));
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
