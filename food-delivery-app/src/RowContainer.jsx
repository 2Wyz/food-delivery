import React from 'react'
import {  MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useRef } from 'react'
import Notfound from './foodImages/NotFound.svg'
import { useStateValue } from './contexts/StateProvider'
import { actionType } from './contexts/reducer'
import { json } from 'react-router-dom'
import { useState } from 'react'
const RowContainer = ({flag , data, scrollValue}) => {
  
    const rowContainer = useRef()

    const [{cartItems}, dispatch] = useStateValue ()
    useEffect(() => {
      rowContainer.current.scrollLeft += scrollValue
    
    }, [scrollValue])

    const [items, setItems] = useState([])

    useEffect(() => {
    addtocart()  
    
    }, [items])
    
    

const addtocart =()=>{
 dispatch({
    type:actionType.SET_CARTITEMS,
    cartItems: items
 })
 localStorage.setItem('cartItems', JSON.stringify(cartItems))
}
 
  return (
 <div  className={`w-full my-12 gap-3  scroll-smooth flex items-center ${flag ? 'overflow-x-scroll scrollbar-none '
: ' overflow-x-hidden bg-cardOverlay justify-center flex-wrap'}`} 
ref={rowContainer}>
    
    {  data && data.length > 0 ? (
        data.map((item) => (
            <div  key={item?.id} className='w-275 min-w-[300px]  
             flex flex-col items-center justify-evenly relative md:min-w-[340px] md:w-340 my-12 h-auto bg-gray-100 rounded-lg p-2  
            hover:drop-shadow-xl backdrop-blur-lg ' >
                <div className='w-full justify-between  flex  items-center '>
                <motion.div  className='w-40 h-40 -mt-8 drop-shadow-2xl' whileHover={{scale:1.2}}>
                    <img  src={item?.ImageURL} alt="" className='w-full object-contain h-full'  />
                    <motion.div whileTap={{scale:0.5}} className='w-8 h-8 -mt-8 rounded-full bg-red-600 flex items-center 
                    justify-center hover:shadow-md cursor-pointer'  onClick={()=>setItems([...cartItems, item])}>
                        <MdShoppingBasket className='  text-white'/>
                    </motion.div>
                    </motion.div>
                </div>
                <div className='w-full flex-end justify-end flex-col gap-4'>
                    <p className='text-orange-500  font-bold  text-base md:text-lg'>{item?.title}</p>
                     <div className='w-auto h-auto border-none'> <h5 className='text-sm font-semibold'>Nutritional Value</h5><p className='text-xs text-orange-700 '>{item?.nutrition}</p></div> 
                    <p className='mt-1 text-sm  text-gray 500'>Calories: {item?.calories}</p>
                    
                    <div className='flex items-center gap-8'>
                       
                    <p className='text-lg font-semibold  text-headingColor'> <span className='text-red-600 text-sm'>$</span>{item?.price}</p>
                    </div>
                    
                </div>
            </div>    
            ) )
    


    ):(<div className='w-full  items-center justify-center flex-col flex'>
  <img src={Notfound}alt="" className='h-340' />
    <p className='text-xl text-textColor font-semibold my-2'>Item not available</p>

    </div>)
    }
</div>)
}
export default RowContainer