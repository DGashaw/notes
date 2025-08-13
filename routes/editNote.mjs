import {default as express} from 'express';
import { NotesStore as notes } from '../models/note-store.mjs';

export const router = express.Router();

/**
 * Handle notes edit POST request
 */
router.post("/edit", async(request, response, next) => {
    const {key, title, body} = request.body;
    try{
        const note = await notes.update(key, title, body);
        response.redirect(303, `view?key=${key}`);
    }
    catch(error){
        next(error);
    }

});

/**
 * Handle notes edit GET request
 */
router.get("/edit", async(request, response, next) => {
    try{
        const note = await notes.read(request.query.key);
        response.render("editNoteForm", {note});

    }
    catch(error){
        next(error);
    }
    
});
