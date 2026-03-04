import { noteAtom,selectednoteIndexAtom } from "@/store"
import { useAtom, useAtomValue } from "jotai"

export const useNoteList = ({ onSelect }: { onSelect?: () => void }) =>{
    const notes = useAtomValue(noteAtom)
    const [selectednoteIndex,setselectednoteIndex] = useAtom(selectednoteIndexAtom)
    const handleselecteNote = (index: number) => async () => {
    setselectednoteIndex(index)

    if (onSelect) {
      onSelect()
    }
  }
    return{
        notes,
        selectednoteIndex,
        handleselecteNote
    }
}