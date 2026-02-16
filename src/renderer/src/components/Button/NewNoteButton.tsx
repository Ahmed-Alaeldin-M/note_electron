import { ActionButton,ActionButtonProps } from "./ActionButton"
import { LuBookPlus } from "react-icons/lu";

export const NewNoteButton = ({...props}:ActionButtonProps) => {
    return <ActionButton {...props}><LuBookPlus className="w-4 h-4 text-zinc-300" /></ActionButton>
}