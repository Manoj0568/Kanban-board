import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import DatePicker from 'tailwind-datepicker-react';
import axios from 'axios';
const AddCard = ({ column, setCards }) => {
    const [formData, setFormData] = useState({
        taskname:"",
        person:"",
        description:"",
        date:""
    });
    const [adding, setAdding] = useState(false);
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      const newCard = {
        column,
        formData,
        id: Math.random().toString(),
        image:`https://i.pravatar.cc/150?u=${Math.floor(Math.random().toString() * 100)}`
      };
      await axios.post('/api/createcard',newCard).then((res)=>console.log(res)).catch(error=>console.log(error))

      console.log(newCard)
      setCards((pv) => [...pv, newCard]);
      setFormData(
        {
            taskname:"",
            person:"",
            description:"",
            date:""
        }
      )
      setAdding(false);
    };

    const [show, setShow] = useState(false)
	const handleChange = (selectedDate) => {
        setFormData({...formData,date:selectedDate})
		console.log(selectedDate)
	}
	const handleClose = (state) => {
		setShow(state)
	}
    const onChangeHandler=(e)=>{
       const {id,value} = e.target
       setFormData({...formData,[id]:value})
    }
    const {taskname,person,description,date} = formData
    return (
      <>
        {adding ? (
          <motion.form layout onSubmit={handleSubmit} className='flex flex-col gap-2 '>
            <input type="text" autoFocus value={taskname} id="taskname" onChange={onChangeHandler} className='w-full rounded border border-violet-400 bg-white p-1 text-sm text-neutral-700 placeholder-violet-300 focus:outline-0' placeholder='Add new task..'/>
            <input type="text" value={person} id="person" onChange={onChangeHandler} className='w-full rounded border border-violet-400 bg-white p-1 text-sm text-neutral-700 placeholder-violet-300 focus:outline-0' placeholder='Person name'/>
            <textarea
              value={description}
              id="description"
              onChange={onChangeHandler}
              placeholder="Add task description..."
              className="w-full rounded border border-violet-400 bg-white p-3 text-sm text-neutral-700 placeholder-violet-300 focus:outline-0"
            />
            <DatePicker onChange={handleChange} show={show} setShow={handleClose} />
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add</span>
                <FiPlus />
              </button>
            </div>
          </motion.form>
        ) : (
            <motion.button
            layout
            onClick={() => setAdding(true)}
            className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-900 transition-colors hover:text-neutral-400"
          >
            <span>Add card</span>
            <FiPlus />
          </motion.button>
        )}
      </>
    );
  };

export default AddCard