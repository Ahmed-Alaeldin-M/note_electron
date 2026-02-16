import {noteInfoMock} from '@/store/mocks'
import { ComponentProps } from 'react'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'
export const NotePreviewList = ({className,...props}:ComponentProps<'ul'>)=>{
    if  (noteInfoMock.length === 0){
            return (<ul className={twMerge("pt-4 text-center",className)} {...props}>
                <span className=" text-zinc-500 text-sm">No notes yet</span>
        </ul>)
    }
    return(
               
        <ul {...props}>
            {noteInfoMock.map((note) => (
                <NotePreview key={note.title + note.lastEdited} {...note} />
            ))}
        </ul>
    )
}