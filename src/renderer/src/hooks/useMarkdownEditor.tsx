import { MDXEditorMethods } from "@mdxeditor/editor"
import { saveNoteAtom, selectednoteAtom } from "@renderer/store"
import { NoteContent } from "@shared/models"
import { useAtomValue, useSetAtom } from "jotai"
import { useRef } from "react"
import throttle from 'lodash/throttle';

import { AutoSavingTime } from "@shared/consts"
export const useMarkdownEditor = ()=>{
 const selectednote = useAtomValue(selectednoteAtom)
 const saveNote = useSetAtom(saveNoteAtom)
 const editorRef = useRef<MDXEditorMethods>(null)
 const handleAutoSaving = 
 throttle(
async (content:NoteContent)=>{
   if (!selectednote) return
   console.info(`Auto saving :`,selectednote.title)

   await saveNote(content)
 }
 ,AutoSavingTime,
{
   leading:false,
   trailing:true
})
 const handleBlur = async () => {
   if (!selectednote) return
   handleAutoSaving.cancel()
   const content = editorRef.current?.getMarkdown()
   if (content != null){
      await saveNote(content)
   }
 } 
 return{
   editorRef
   ,selectednote
   ,handleAutoSaving,
   handleBlur
 }
}