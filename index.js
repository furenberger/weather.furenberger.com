const http = require('http');
const app = require('./server/app');

const httpListenerPort = 8080;

const httpServer = http.createServer(app).listen(httpListenerPort, () => {
  console.log(`app is listening at localhost:${httpListenerPort}`);
});

process.on('SIGTERM', () => {
  httpServer.close(() => {
    console.log('SIGTERM issued... app is shutting down');
    process.exit(0);
  });
});
