import { useRef } from 'react'
import electronLogo from './assets/electron.svg'
import { Content, RootLayout, Sidebar,DraggableTopbar, ActionButtonRow, NotePreviewList, MarkDownEditor, FloatingNotetitle } from '@/components'

const App = ()=> {
  const contentConteinr = useRef<HTMLDivElement>(null)
  const resetscroll = ()=>{
    contentConteinr.current?.scrollTo(0,0)
  }
  return (
    <>
    <DraggableTopbar/>
    <RootLayout>
      <Sidebar className={'p-2 bg-zinc-700/80'}> 
      <ActionButtonRow className={'flex justify-between mt1'}/>
      <NotePreviewList className={'mt-2 space-y-1'} onSelect={resetscroll}/>
      </Sidebar>
      <Content ref={contentConteinr} className={'border-l-2 bg-zinc-900/70 border-l-white/20'}> 
      <FloatingNotetitle className='pt-2'/>
      <MarkDownEditor/></Content>
    </RootLayout>
    </>
    
  )
}

export default App
