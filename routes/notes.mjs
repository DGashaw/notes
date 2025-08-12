import {default as express} from 'express';
import { notesInMemoryStore as notes } from "../app.mjs";

const router = express.Router();

/* GET users listing. */
router.get("/add", async(request, response, next) => {
  response.status = 200;
  response.render("addNoteForm")
});
router.post("/add", async(request, response, next) => {
  const {key, title, body} = request.body;
  try{
    const note = await notes.create(key, title, body);
    //console.log(`note: ${JSON.stringify(note, undefined, 2)}`)
    response.redirect(303, "/");
  }
  catch(error){
    next(error);
  }
})

export {router};
