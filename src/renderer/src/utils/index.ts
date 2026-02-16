import clsx,{ClassValue} from 'clsx'
import { twMerge } from 'tailwind-merge'
const DateTimeFormat = new Intl.DateTimeFormat(window.context.locale,{
    dateStyle:'short',
    timeStyle:'short',
    timeZone:'UTC'
})
export const formatDate = (ms:number)=>{
    return DateTimeFormat.format(ms)
}
export const cn = (...agrs:ClassValue[])=>{
    return twMerge(clsx(...agrs))
}