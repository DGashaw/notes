import {default as express} from 'express';
import { NotesStore as notes } from '../models/note-store.mjs';

export const router = express.Router();

router.get("/remove", async(request, response, next) => {
    const notekey = request.query.key;
    try{
        const note = await notes.read(notekey);
        response.render('confirmRemove', {title:`${note.title}`, key: `${notekey}`});
    }
    catch(error){
        next(error);
    }

});

