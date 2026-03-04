import {noteInfoMock} from '@/store/mocks'
import { ComponentProps } from 'react'
import { NotePreview } from '@/components/NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNoteList } from '@/hooks/useNotesList'
export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}
export const NotePreviewList = ({className,onSelect,...props}:NotePreviewListProps)=>{
    const {notes,selectednoteIndex,handleselecteNote} = useNoteList({onSelect})
    if(!notes) return null
    if  (notes.length === 0){
            return (<ul className={twMerge("pt-4 text-center",className)} {...props}>
                <span className=" text-zinc-500 text-sm">No notes yet</span>
        </ul>)
    }
    return(
               
        <ul className={className} {...props}>
            {notes.map((note,index) => (
                <NotePreview key={note.title + note.lastEdited} {...note} 
                isActive={selectednoteIndex === index}
                onClick={handleselecteNote(index)}
                />
            ))}
        </ul>
    )
}