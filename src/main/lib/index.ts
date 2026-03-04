import { appDirname, fileEncoding, WelcomeFileName } from "@shared/consts";
import { NoteInfo } from "@shared/models";
import { GetNotes, ReadNotes } from "@shared/types";
import { dialog } from "electron";
import { ensureDir,readdir, readFile, remove, stat, writeFile } from "fs-extra";
import { homedir } from "os";
import path from "path";
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'


export const getRootDir = ()=>{
    return `${homedir()}\\${appDirname}`
    
}
export const getNotes:GetNotes = async ()=>{
    const rootDir = getRootDir()
    ensureDir(rootDir)
    const notesFileNames = await readdir(rootDir,
        {
            encoding:fileEncoding,
            withFileTypes:false
        }
    )
    const notes = notesFileNames.filter((fileName)=>fileName.endsWith(".md"))
    if(notes.length === 0){
        console.info("adding the welcome file")
        const content = await readFile(welcomeNoteFile,{encoding:fileEncoding})
        await writeFile(`${rootDir}\\${WelcomeFileName}`,content,{encoding:fileEncoding})
        notes.push(WelcomeFileName)
    }
    return Promise.all(notes.map(getFileInfoFromFIleName))
}
export const getFileInfoFromFIleName = async (filename:string):Promise<NoteInfo> => {
    const filestates = await stat(`${getRootDir()}/${filename}`)
return {
    title:filename.replace('/\.md$/',''),
    lastEdited: filestates.mtimeMs
}
}
export const readNotes:ReadNotes = async (filename)=>{
    const rootDir = getRootDir()
    return readFile(`${rootDir}/${filename}`,{encoding:fileEncoding})
}
export const writeNotes = async (filename,conetnt)=>{
    const rootDir = getRootDir()
    console.info(`Writing note ${filename}`)
    return writeFile(`${rootDir}/${filename}`,conetnt,{
        encoding:fileEncoding
    })
}
export const createNote = async () =>{
    const rootDir = getRootDir()
    ensureDir(rootDir)
    const {filePath,canceled} = await dialog.showSaveDialog(
        {
            title:"New note",
            defaultPath:`${rootDir}\\Untitled.md`,
            buttonLabel:'Create',
            properties:['showOverwriteConfirmation'],
            showsTagField:false,
            filters:[{name:'Markdown',extensions:['md']}]
        }
    )
    if (!filePath || canceled){
        console.info("File creation canceled")
        return false;
    }
    const {name:filename,dir:parentDir} = path.parse(filePath)
    if(parentDir !== rootDir){
        await dialog.showMessageBox({
            type:"error",
            title:'Creation failed',
            message:`All note must be under the ${rootDir}`
        })
        return false
    }
    console.info(`Creating notes ${filePath}`)
    await writeFile(filePath,'')
    return filename+'.md'
    
}
export const deletNote = async (filename:NoteInfo["title"])=>{
 const rootDir = getRootDir()
 ensureDir(rootDir)
 const {response} = await dialog.showMessageBox({
    type:"warning",
    title:"Delete Note",
    message:`you are going to delete the file ${filename}`,
    buttons:["Delete","Cancel"],
    defaultId:1,
    cancelId:1
 })
 if (response === 1){
    console.info("canceled deleteing file")
    return false
 }
 console.info(`deleting file : ${filename}`)
 await remove(`${rootDir}\\${filename}`)
 return true
}