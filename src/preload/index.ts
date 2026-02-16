import { contextBridge } from 'electron'


if (!process.contextIsolated){
  throw new Error("Context Isolation is not enabled. Please enable it in the main process.")
}
 try {
  contextBridge.exposeInMainWorld('context',{
    locale:navigator.language
  })
 }
 catch (error) {
  console.error("Failed to execute code in main world:", error)
 }
