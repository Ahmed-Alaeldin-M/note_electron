import electronLogo from './assets/electron.svg'
import { Content, RootLayout, Sidebar,DraggableTopbar, ActionButtonRow, NotePreviewList } from '@/components'

const App = ()=> {
  return (
    <>
    <DraggableTopbar/>
    <RootLayout>
      <Sidebar className={'p-2 bg-zinc-700/80'}> 
      <ActionButtonRow className={'flex justify-between mt1'}/>
      <NotePreviewList className={'mt-3 space-y-1'}/>
      </Sidebar>
      <Content className={'border-l-2 bg-zinc-900/70 border-l-white/20'}> content</Content>
    </RootLayout>
    </>
    
  )
}

export default App
