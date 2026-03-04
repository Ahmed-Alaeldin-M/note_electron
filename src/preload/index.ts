
import { CreateNote, DeleteNote, GetNotes, ReadNotes,WriteNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'


if (!process.contextIsolated){
  throw new Error("Context Isolation is not enabled. Please enable it in the main process.")
}
 try {
  contextBridge.exposeInMainWorld('context',{
    locale:navigator.language,
    getNotes: (...args:Parameters<GetNotes>) => ipcRenderer.invoke('getNotes',...args),
    readNotes: (...args:Parameters<ReadNotes>) => ipcRenderer.invoke('readNotes',...args),
    writeNotes: (...args:Parameters<WriteNote>) => ipcRenderer.invoke('writeNotes',...args),
    createNotes: (...args:Parameters<CreateNote>) => ipcRenderer.invoke('createNotes',...args), 
    deleteNotes: (...args:Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNotes',...args)      
  })
 }
 catch (error) {
  console.error("Failed to execute code in main world:", error)
 }
