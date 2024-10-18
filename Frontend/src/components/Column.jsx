import React, { useEffect, useState } from 'react'
import Card from './Card';
import AddCard from './AddCard';
import DropIndicator from './DropIndicator';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Column = ({ title, headingColor, cards, column, setCards }) => {
    const [active, setActive] = useState(false);
    const [filteredCards,setFilteredCards] = useState([])

    const getColumnCards= async ()=>{
      try {
        await axios.get(`/api/column/${column}`).then((res)=>{setFilteredCards(res.data)}).catch(error=>console.log(error))
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(()=>{
      
      getColumnCards()
    },[cards])
    const handleDragStart = (e, card) => {
      e.dataTransfer.setData("cardId1", card._id);
      e.dataTransfer.setData("cardId", card.id);
     
    };
  
    const handleDragEnd = async (e) => {
      console.log(e.dataTransfer)
      const cardId = e.dataTransfer.getData("cardId");
      const cardId1 = e.dataTransfer.getData("cardId1");
      console.log(cardId,"this is from card")
      setActive(false);
      clearHighlights();
      try {
        await axios.put(`/api/updatecolumn/${cardId1}/${column}`).then(()=>{
          getColumnCards()
          })
      } catch (error) {
        console.log(error)
      }
      
      const indicators = getIndicators();
      const { element } = getNearestIndicator(e, indicators);
  
      const before = element.dataset.before || "-1";
     
      if (before !== cardId) {
        let copy = [...cards];
       
        let cardToTransfer = copy.find((c) => c.id === cardId);
        console.log(cardToTransfer,"cared to transfer")
        if (!cardToTransfer) return;
        cardToTransfer = { ...cardToTransfer, column };
  
        copy = copy.filter((c) => c.id !== cardId);
  
        const moveToBack = before === "-1";
  
        if (moveToBack) {
          copy.push(cardToTransfer);
        } else {
          const insertAtIndex = copy.findIndex((el) => el.id === before);
          if (insertAtIndex === undefined) return;
  
          copy.splice(insertAtIndex, 0, cardToTransfer);
        }
        
        setCards(copy);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      highlightIndicator(e);
      setActive(true);
    };
  
    const clearHighlights = (els) => {
      const indicators = els || getIndicators();
  
      indicators.forEach((i) => {
        i.style.opacity = "0";
      });
    };
  
    const highlightIndicator = (e) => {
      const indicators = getIndicators();
  
      clearHighlights(indicators);
  
      const el = getNearestIndicator(e, indicators);
  
      el.element.style.opacity = "1";
    };
  
    const getNearestIndicator = (e, indicators) => {
      const DISTANCE_OFFSET = 50;
  
      const el = indicators.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
  
          const offset = e.clientY - (box.top + DISTANCE_OFFSET);
  
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
          element: indicators[indicators.length - 1],
        }
      );
  
      return el;
    };
  
    const getIndicators = () => {
      return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };
  
    const handleDragLeave = () => {
      clearHighlights();
      setActive(false);
    };

    const sectionDelete = async (column)=>{
      try {
        await axios.delete(`/api/deletecolumn/${column}`).then(()=>{
          getColumnCards()
          })
          const newCards = cards.filter((card)=>card.column !== column)
        setCards(newCards)
      } catch (error) {
        console.log(error)
      }
        
    }
  
    // const filteredCards = cards.filter((c) => c.column === column);
    const excludedTitles = ["To Do", "In Progress", "Review"]
    return (
      <div className="w-60 shrink-0 shadow-sm border pt-3 rounded-sm">
        <div className="mb-3 px-3 flex items-center justify-between">
          <h3 className={`font-medium ${headingColor}`}>{title}</h3>
          <div className='flex text-sm items-center gap-6'>
          <span className="rounded text-sm text-neutral-800">
            {filteredCards.length-1}
          </span>
          {!excludedTitles.includes(title) && <FaTrash className='text-sm cursor-pointer' onClick={()=>sectionDelete(column)}/>}
          </div>
        </div>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`h-full w-full p-3 transition-colors rounded-md ${
            active ? "bg-slate-400/50" : "bg-slate-400/0"
          }`}
        >
          {filteredCards.map((c) => {
            if(!c.formData)return
            return <Card key={c.id} {...c} cards={cards} getColumnCards={getColumnCards} setCards={setCards} handleDragStart={handleDragStart} />;
          })}
          <DropIndicator beforeId={null} column={column} />
          <AddCard column={column} setCards={setCards} />
        </div>
      </div>
    );
  };

export default Column