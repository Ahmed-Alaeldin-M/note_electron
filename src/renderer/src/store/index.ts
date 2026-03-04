import { NoteContent, NoteInfo } from "@shared/models";
import { atom } from "jotai";
import { noteInfoMock } from "@/store/mocks";
import { unwrap } from "jotai/utils";
const loadNotes = async()=>{
    const notes = await window.context.getNotes()
    return notes.sort((a,b)=>b.lastEdited-a.lastEdited)
}
const noteAtomAsync = atom<NoteInfo[]|Promise<NoteInfo[]>>(loadNotes())
export const noteAtom = unwrap(noteAtomAsync,(prev) => prev)
export const selectednoteIndexAtom = atom<number|null>(null)
const selectednoteAtomAsync = atom(async (get)=>
{
    const notes = get(noteAtom)
    const selectednoteIndex = get(selectednoteIndexAtom)
    if (selectednoteIndex == null || !notes) return null
    const selectednote = notes[selectednoteIndex]
    const content = await window.context.readNotes(selectednote.title)
    return{
        ...selectednote,
        content:content
        }
}
)
export const selectednoteAtom = unwrap(selectednoteAtomAsync,(prev)=>prev ?? {
    title:"",
    lastEdited:Date.now(),
    content:""
})
export const saveNoteAtom = atom(null,async (get,set,newConent:NoteContent)=>{
    const notes = get(noteAtom)
    const selectedNote = get(selectednoteAtom)
    if (!selectedNote || !notes) return
    await window.context.writeNotes(selectedNote.title,newConent)
   set(noteAtom,
    notes.map((note) => {
        if(note.title == selectedNote.title){
            return {
                ...note,
                lastEdited: Date.now()
            }
        }
        return note
    })
   ) 
})
export const createNoteAtom = atom(null,async (get,set)=>{
 const notes = get(noteAtom)
 if(!notes) return
 const title = await window.context.createNotes()
 if(!title) return
 const newNote:NoteInfo = {
    title:title,
    lastEdited:Date.now()
 }
 set(noteAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
 set(selectednoteIndexAtom,0)

})

export const deteleNoteAtom = atom(null,async (get,set)=>{
    const notes = get(noteAtom)
    const selectednote = get(selectednoteAtom)
    if (!selectednote) return
    if(!notes) return
    const isDeleted = await window.context.deleteNotes(selectednote.title)
    if(!isDeleted) return
    set(noteAtom,notes.filter((note)=>note.title !== selectednote.title))
    set(selectednoteIndexAtom,null)
})

