import  { default as express } from 'express';
import { NotesStore as notes } from '../models/note-store.mjs';
const router = express.Router();

/* GET home page. */
router.get('/', async(request, response, next) => {
  try{
    const keylist = await notes.keylist();
    const keyPromises = keylist.map(key => {
      return notes.read(key);
    });

    const notesList = await Promise.all(keyPromises);
    //console.log(`notesList:\n${JSON.stringify(notesList, undefined, 2)}`);
    response.render("index", {"title" : "Notes-App", "notesList": notesList});

  }
  catch(error)
  {
    next(error);
  }

});

export {router};
