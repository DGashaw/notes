/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
*/

import {__dirname} from './appRootDirectory.mjs'
//import {default as createError} from 'http-errors';
import {default as express} from 'express';
import {default as path} from 'path';
import {default as cookieParser} from 'cookie-parser';
import {default as logger} from 'morgan';
import * as http from 'http';
import {normalizePort, onError, onListening, handle404, basicErrorHandler} from './utility/appSupport.mjs';
import {router as indexRouter} from './routes/index.mjs';

import {default as hbs} from 'hbs';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials/'));

hbs.registerHelper('getFullYear',  function(){
            return (new Date()).getFullYear();
        });

app.use('/', indexRouter);
//custom 404
app.use(handle404);
//custom 500
app.use(basicErrorHandler);

export const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

export const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
