import { selectednoteAtom } from "@renderer/store"
import { useAtomValue } from "jotai"
import { Component, ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export const FloatingNotetitle = ({className,...props}:ComponentProps<'div'>)=>{
    const selectednote = useAtomValue(selectednoteAtom)
    if (!selectednote) return null
    return(
        <div className={twMerge('flex justify-center',className)} {...props}>
            <span className="text-gray-400">
                {selectednote.title}
            </span>
        </div>
    )
}