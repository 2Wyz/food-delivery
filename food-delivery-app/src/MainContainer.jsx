import React from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft ,MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer'
import { useStateValue } from './contexts/StateProvider'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import MenuContainer from './MenuContainer'
import CartContainer from './CartContainer'

const MainContainer = () => {
const [{foodItems , cartShow}, dispatch] = useStateValue()

const [scrollValue, setscrollValue] = useState(0)

useEffect(() => {

  
}, [scrollValue, cartShow])


  return (
    <div className='flex  flex-col h-auto w-full items-center justify-center  '>
      <HomeContainer />

      

      <section className='w-full  p-4 my-6'>

        
        <div className='w-full flex items-start justify-between'>
          <p className='text-headingColor font-semibold relative md:text-xl capitalise 
          before:absolute before:content before:rounded-lg before:h-1 before:w-32
          before:-bottom-2 before:left-0 ease-in-out duration-1000 transition-all
           before:bg-gradient-to-tr from-orange-300 to-orange-600 lg:2xl text-sm sm-p-8'>
            our healthy & fresh fruits
          </p>

        <div className='hidden md:flex gap-3 items-center'>
          <motion.div onClick={()=>setscrollValue(-200)} whileTap={{scale:0.75}} className='w-8 h-8  rounded-lg bg-orange-300 flex items-center hover:shadow-lg justify-center cursor-pointer hover:bg-orange-500 transition-all ease-in-out duration-100'>
            <MdChevronLeft className='text-lg text-white'/>
          </motion.div >
          <motion.div  onClick={()=>setscrollValue(200)} whileTap={{scale:0.75}} className='w-8 h-8  rounded-lg bg-orange-300 flex items-center hover:shadow-lg justify-center cursor-pointer hover:bg-orange-500 transition-all ease-in-out duration-100'>
            <MdChevronRight className='text-lg text-white'/>
          </motion.div>
          </div>  
        </div>
        <RowContainer  scrollValue={scrollValue} flag ={true} data={foodItems ?.filter(n=>n.categories==="drink"
        
)} />
      </section>

    
   <MenuContainer/>
    
{ cartShow &&  <CartContainer/>}
    </div>  
  )
}

export default MainContainer