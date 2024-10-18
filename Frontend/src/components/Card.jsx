import React from 'react'
import { motion } from 'framer-motion';
import DropIndicator from './DropIndicator';
import DisplayDate from './DisplayDate';
const Card = ({ formData, id, column, handleDragStart }) => {
    console.log(formData)
    return (
      <>
        <DropIndicator beforeId={id} column={column} />
        <motion.div
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, { formData, id, column })}
          className="cursor-grab w-full rounded border shadow-md bg-white p-3 active:cursor-grabbing"
        >
          <p className='text-base font-medium overflow-hidden whitespace-nowrap overflow-ellipsis mb-2'>{formData.taskname}</p>
          <div className='flex gap-2 items-center justify-between'>
             <img className='h-10 w-10 rounded-full' src={`https://i.pravatar.cc/${Math.floor(id * 100)}`} alt="random avatar" />
             <DisplayDate date={formData.date}/>
             <p className='p-1 max-w-40 overflow-hidden whitespace-nowrap overflow-ellipsis bg-neutral-300 text-neutral-600 rounded-lg text-sm'>{formData.person}</p>
          </div>
        </motion.div>
      </>
    );
  };

  export default Card