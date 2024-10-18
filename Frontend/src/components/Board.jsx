import React, { useEffect, useState } from 'react'
import Column from './Column';
import AddSection from './AddSection';
const Board = () => {
  const [cards, setCards] = useState([]);
  let uniqueColumns = [...new Set(cards.map(card => card.column))]

  // useEffect(()=>{
  //   uniqueColumns = [...new Set(cards.map(card => card.column))]
  // },[cards])
  console.log(uniqueColumns)
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {uniqueColumns.length>0 ?(uniqueColumns.map((column)=>{
        return <Column
         key={column}
         title= {column}
         column= {column}
         headingColor="text-neutral-500"
         cards={cards}
         setCards={setCards}
       />
      })):<p>no data</p>}
      <div className="w-56 shrink-0">
       <AddSection setCards={setCards}/>
      </div>
    </div>
  );
}

export default Board