import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateNote, DeleteNote, GetNotes, ReadNotes, WriteNote } from '@shared/types'

declare global {
  interface Window {
   context:{
    loacle:string
    getNotes:GetNotes
    readNotes:ReadNotes
    writeNotes:WriteNote
    createNotes:CreateNote
    deleteNotes:DeleteNote
   }
  }
}
