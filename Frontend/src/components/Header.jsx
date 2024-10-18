import { Input } from '@mui/material';
import React from 'react'
import { FaApple, FaSearch } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { GoGraph } from "react-icons/go";
const Header = () => {
  return (
    <div className='h-20 w-full bg-white flex justify-between px-12 shadow-sm border' >
       <div className='flex gap-3 items-center'>
        <FaApple className='text-5xl text-white bg-black rounded-md'/>
        <div className='flex flex-col'>
            <p className='text-slate-950 font-bold text-xl'>Apple</p>
            <span className='text-neutral-600 text-sm font-light'>5 boards . 24 members</span>
        </div>
       </div>
       <div className='flex flex-row gap-3 items-center'>
         <div className='relative'>
         <Input className='border rounded-md pl-3' placeholder='Search'/>
         <FaSearch className='absolute right-3 font-light text-neutral-500 top-2 text-xl'/>
         </div>
         <div className='bg-slate-100 shadow-sm text-2xl p-2 text-neutral-400 rounded-md'><GoGraph/></div>
         <div className='bg-slate-100 shadow-sm text-2xl p-2 text-neutral-400 rounded-md'><IoMdSettings/></div>
       </div>
    </div>
  )
}

export default Header