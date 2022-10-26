// load env variables
require('dotenv').config({ path: './config/.env' })

// Define the port form env Variable
const developmentPort = process.env.PORT;

// import of http Node package
const http = require('http');

// import of app.js
const app = require('./app');

// set port
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// set the port
const port = normalizePort(developmentPort);
app.set('port', port);

// search of errors and return approriate error 
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// create the server , call of app 
const server = http.createServer(app);

// event handler
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('The server is up and running on ' + bind + ' 🚀');
});

server.listen(port);

