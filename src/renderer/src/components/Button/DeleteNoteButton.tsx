import { LuTrash } from "react-icons/lu"
import { ActionButton, ActionButtonProps } from "./ActionButton"
export const DeleteNoteButton = ({...props}:ActionButtonProps) => {
    return <ActionButton {...props}><LuTrash className="w-4 h-4 text-zinc-300" /></ActionButton>
}