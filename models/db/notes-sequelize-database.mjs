import { Note, AbstractNotesStore } from "../notes-store-class/notes.mjs";
import { connectToDatabaseWithSequilize, close as closeSequelize } from "./sequelize.mjs";
import { SQNote } from "./sequelize_model.mjs";
import { default as DEBUG } from 'debug';

const debug = DEBUG('notes:notes-sequelize');
const debugError = DEBUG('notes:error-sequelize');

let initialize = false;

//Since we define a Note class, we call this as SQNote - SequelizeNote

async function connectAndInitialize() {
    const sequelize = await connectToDatabaseWithSequilize();
    
    if(!initialize){
        SQNote.initModel(sequelize);
        await SQNote.sync();
        initialize = true;
    }
    
    return sequelize;
}
export default class SequelizeNotesStore extends AbstractNotesStore{
    async close() {
        await closeSequelize();
        initialize = false;
    }

    async update(key, title, body) {
    }
    async create(key, title, body) {
        await connectAndInitialize();
        const sqnote = await SQNote.create({
            notekey: key,
            title: title,
            body: body
        });

        return new Note(sqnote.notekey, sqnote.title, sqnote.body);
    }
    async read(key) {
        await connectAndInitialize();
        const note = await SQNote.findOne({where: {notekey: key}});

        if(!note){
            throw new Error(`No note found with key:${key}`);
        }
        else{
            return new Note(note.notekey, note.title, note.body);
        }
    }
    async destroy(key) {}
    async keylist() {
        await connectAndInitialize();
        const notes = await SQNote.findAll({ attributes: ['notekey'] });
        const noteKeys = notes.map(note => note.notekey);

        return noteKeys;
    }
    async count() {}
}