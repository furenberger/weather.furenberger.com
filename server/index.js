const http = require('http');
const app = require('./server/app');

let port = process.env.PORT;
if (port === null || port === '') {
  port = 8080;
}

const httpServer = http.createServer(app).listen(port, () => {
  console.log(`app is listening at localhost:${port}`);
});

process.on('SIGTERM', () => {
  httpServer.close(() => {
    console.log('SIGTERM issued... app is shutting down');
    process.exit(0);
  });
});
