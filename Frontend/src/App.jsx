import React from 'react'
import Board from './components/Board'
import Header from './components/Header'

const App = () => {
  return (
    <div  className="h-screen w-full bg-slate-100 text-neutral-900">
    <Header/>
    <Board/>
    </div>
    
  )
}

export default App