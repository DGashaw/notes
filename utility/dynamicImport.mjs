import { __dirname } from "../appRootDirectory.mjs";
import path from 'node:path';
import { pathToFileURL } from "node:url";

/**
 * 
 * @param {string} relativePath - the relative path of the module from the cllaer file
 * @returns {Promise<any>} The imported module
 */
export async function dynamicImport(relativePath){
    const absolutePath = path.resolve(__dirname, relativePath);

    return import(pathToFileURL(absolutePath).href);
}