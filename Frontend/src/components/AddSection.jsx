import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import axios from 'axios';
const AddSection = ({setCards }) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);
  
    const handleSubmit = async(e) => {
      e.preventDefault();
  
      if (!text.trim().length) return;
  
      const newCard = {
        column: text,
        id: Math.random().toString(),
      };
      await axios.post('/api/createcard',newCard).then((res)=>console.log(res)).catch(error=>console.log(error))

      setCards((pv) => [...pv, newCard]);
  
      setAdding(false);
    };
  
    return (
      <>
        {adding ? (
          <motion.form layout onSubmit={handleSubmit}>
            <textarea
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-white p-3 text-sm text-neutral-700 placeholder-violet-300 focus:outline-0"
            />
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
            <span>Add Section</span>
            <FiPlus />
          </motion.button>
        )}
      </>
    );
  };

export default AddSection