import { useAtomValue, useSetAtom } from "jotai";
import { ActionButton,ActionButtonProps } from "./ActionButton"
import { LuBookPlus } from "react-icons/lu";
import {createNoteAtom} from '@/store'

export const NewNoteButton = ({...props}:ActionButtonProps) => {
    const createnote = useSetAtom(createNoteAtom)
    const handlecraetenote = async ()=>{
       await createnote()
    }
    return <ActionButton onClick={handlecraetenote} {...props}><LuBookPlus className="w-4 h-4 text-zinc-300" /></ActionButton>
}