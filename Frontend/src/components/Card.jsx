import React from 'react'
import { motion } from 'framer-motion';
import DropIndicator from './DropIndicator';
import DisplayDate from './DisplayDate';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
const Card = ({ formData, id, column, handleDragStart,image,_id, cards, setCards,getColumnCards }) => {

  const cardDelete = async ()=>{
    
    try {
      await axios.delete(`/api/delete/${_id}`).then(()=>{
        getColumnCards()
        })
        const newCards = cards.filter((card)=>card._id !== _id)
      setCards(newCards)
    } catch (error) {
      console.log(error)
    }
      
  }
    return (
      <>
        <DropIndicator beforeId={id} column={column} />
        <motion.div
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) =>handleDragStart(e, { formData, id, column,image,_id })}
          className="cursor-grab w-full rounded border shadow-md bg-white p-3 active:cursor-grabbing"
        >
          <div className='flex flex-row items-center justify-between'>
            <p className='text-base font-medium overflow-hidden whitespace-nowrap overflow-ellipsis mb-2'>{formData.taskname}</p>
             <FaTrash className='cursor-pointer' onClick={cardDelete}/>
          </div>
          <div className='flex gap-2 items-center justify-between'>
             <img className='h-10 w-10 rounded-full' src={image} alt="random avatar" />
             <DisplayDate date={formData.date}/>
             <p className='p-1 w-40 text-center overflow-hidden whitespace-nowrap overflow-ellipsis bg-neutral-300 text-neutral-600 rounded-lg text-sm'>{formData.person}</p>
          </div>
        </motion.div>
      </>
    );
  };

  export default Card