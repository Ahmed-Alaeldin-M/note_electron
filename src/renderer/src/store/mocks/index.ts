import { NoteInfo } from "@shared/models";
export const noteInfoMock:NoteInfo[] = [{
    title:"Note 1",
    lastEdited:Date.now()

},
{
    title:"Note 2",
    lastEdited:Date.now() - 100000
}
,
{
    title:"Note 3",
    lastEdited:Date.now() - 200000
}
]   