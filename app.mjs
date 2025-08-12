
import {__dirname} from './appRootDirectory.mjs'
import {default as express} from 'express';
import {default as path} from 'path';
import {default as cookieParser} from 'cookie-parser';
import {default as logger} from 'morgan';
import * as http from 'http';
import {normalizePort, onError, onListening, handle404, basicErrorHandler} from './utility/appSupport.mjs';
import {default as hbs} from 'hbs';

import {router as indexRouter} from './routes/index.mjs';
import { router as noteRouter } from "./routes/notes.mjs";
import {router as singleNoteRouter} from "./routes/viewNote.mjs";
import {router as deleteNoteRouter} from "./routes/deleteNote.mjs";
import {router as deleteConfirmRouter} from "./routes/deleteConfirmNote.mjs";
import {router as editNoteRouter} from "./routes/editNote.mjs";

import { InMemoryNotesStore } from './models/notes-memory-database.mjs';

export const notesInMemoryStore = new InMemoryNotesStore();


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials/'));

hbs.registerHelper('getCurrentYear',  function(){
            return (new Date()).getFullYear();
        });

app.use('/', indexRouter);
app.use("/notes", noteRouter);
app.use("/notes", singleNoteRouter);
app.use("/notes", deleteNoteRouter);
app.use("/notes", deleteConfirmRouter);
app.use("/notes", editNoteRouter);

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
