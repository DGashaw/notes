/**
 * This module is used to dynamically select a data store based on 
 * the enviroment variable
 */
import {default as DEBUG} from 'debug';

const debug = DEBUG("notes:note-store");
const debugError = DEBUG("notes:error-store")

let _NotesStore = null;
/**
 * 
 * @param {*} model represent the data store model that is going to be used
 * @returns an instances of a NotesStore class based on the dynamic selected model
 */
export async function useModel(model){
    try{
        const NotesStoreModule = await import(`./notes-${model}-database.mjs`);
        const NoteStoreClass = NotesStoreModule.default;
        _NotesStore = new NoteStoreClass();
        return _NotesStore;
    }
    catch(error){
        throw new Error(`No recognized NoteStore in ${model}.\nError: ${error}`);
    }
}

export {_NotesStore as NotesStore};