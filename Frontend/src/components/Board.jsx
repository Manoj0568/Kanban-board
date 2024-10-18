import React, { useEffect, useState } from 'react'
import Column from './Column';
import AddSection from './AddSection';
import axios from 'axios';
const Board = () => {
  const [cards, setCards] = useState([]);
  // let uniqueColumns = [...new Set(cards.map(card => card.column))]
  const [uniqueColumns,setUniqueColumns] = useState([])
  const getUniqueColumn= async ()=>{
    try {
      await axios.get("/api/uniquecards").then((res)=>{setUniqueColumns(res.data)}).catch(error=>console.log(error))
      await axios.get("/api/getcards").then((res)=>{setCards(res.data)}).catch(error=>console.log(error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    
    getUniqueColumn()
  },[cards.length])
 
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