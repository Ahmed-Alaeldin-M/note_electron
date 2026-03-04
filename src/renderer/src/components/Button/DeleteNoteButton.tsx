import { LuTrash } from "react-icons/lu"
import { ActionButton, ActionButtonProps } from "./ActionButton"
import { useSetAtom } from "jotai"
import {deteleNoteAtom} from '@/store'
export const DeleteNoteButton = ({...props}:ActionButtonProps) => {
    const deletenote = useSetAtom(deteleNoteAtom)
        const handledeletetenote = async()=>{
           await deletenote()
        }
    return <ActionButton onClick={handledeletetenote} {...props}><LuTrash className="w-4 h-4 text-zinc-300" /></ActionButton>
}