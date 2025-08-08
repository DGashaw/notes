import {port} from '../app.mjs';
import {server} from '../app.mjs';

const normalizePort = function(portNumber){
    const port = parseInt(portNumber, 10);
    if(isNaN(port)){
        return portNumber;
    }

    if(port >= 0){
        return port;
    }

    return false;
}

const onError = function(error){
    if(error.syscall !== 'listen'){
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch(error.code){
        case 'EACCESS':
            console.error(`${bind} requires elevated privileges`);
            break;
        case 'EADDDRINUSE':
            console.error(`${bind} is already in use`);
            break;
        default:
            throw error;
    }

}

const onListening = function (){
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;

    console.log(`Listening on ${bind}`);
}

const handle404 = function(request, response, next){
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
}

const basicErrorHandler = function(error, request, response, next){
    //Defer to built-in error handler if headerSent
    //See: http://expressjs.com/en/guide/error-handling.html

    if(response.headerSent){
        return next(error);
    }

    //set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};

    //render the error page

    response.status(error.status || 500);
    response.render('error');
}

export {normalizePort, onError, onListening, handle404, basicErrorHandler};