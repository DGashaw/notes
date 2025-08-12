import {default as express} from 'express';
import {notesInMemoryStore as notes} from '../app.mjs';

export const router = express.Router();

router.post("/remove/confirm", async(request, response, next) => {
    const notekey = request.body.notekey;
    try{
        await notes.destroy(notekey);
        response.redirect(303, "/");

    }
    catch(error){
        next(error);
    }
})