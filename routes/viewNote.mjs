import {default as express} from 'express';
const router = express.Router();
import { notesInMemoryStore as notes } from '../app.mjs';

router.get('/view', async(request, response, next) => {
    const key = request.query.key;
    try{
        const note = await notes.read(key);
        response.render('noteView', {note, title:`${note.title}`})
    }
    catch(error){
        next(error);
    }
    
})

export {router};