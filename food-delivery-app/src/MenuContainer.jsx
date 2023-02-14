import React from 'react'
import {IoFastFood } from 'react-icons/io5'
import { useState } from 'react'
import { Categories } from './Utilitize/data'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from './contexts/StateProvider'

const MenuContainer = () => {

    const [filter, setFilter] = useState('chicken')

    useEffect(() => {

      
    }, [filter])

    const[{foodItems}, dispatch] = useStateValue()
    
  return (
    <div>
         <section className='w-full  p-4 my-6' id='menu'>

        <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-headingColor font-semibold relative md:text-xl capitalise 
          before:absolute before:content before:rounded-lg before:h-1 before:w-32
          before:-bottom-2 before:left-3 right-auto ease-in-out duration-1000 transition-all
           before:bg-gradient-to-tr from-orange-300 to-orange-600 lg:2xl text-sm sm-p-8 '>
            Our Hot Dishes
          </p>
          <div className='flex justify-start items-center mt-6 py-6 w-full overflow-x-scroll
          gap-8 scrollbar-none  lg:justify-center'>
           {Categories && Categories.map(cat=>(

<motion.div
    whileTap={{scale:0.8}}
key={cat.id} className={`' group
 ${filter===cat.urlParamName ? 'bg-cartNumBg' :'bg-card'} 
 flex flex-col shadow-lg
 justify-center items-center rounded-lg cursor-pointer
min-w-[94px] h-28 2-24 transition-all drop-shadow-xl hover:bg-red-600
 duration-150 ease-in-out'`} onClick={() => setFilter(cat.urlParamName)}>

<div className={` shadow-lg w-10 h-10 rounded-full ${filter===cat.urlParamName ? 'bg-card' :'bg-cartNumBg'} group-hover:bg-card 
flex items-center justify-center`}>
<IoFastFood className={`${filter===cat.urlParamName ? 'text-textColor':'text-white'}  group-hover:text-textColor text-lg`}/>
</div>

<p className={`'text-sm ${filter===cat.urlParamName ? 'text-white' :'text-textColor'} group-hover:text-white`}>{cat.name}</p>

</motion.div>

           ))

           }
        
          </div>


        </div>
        <div className='w-full'>
            <RowContainer flag={false} data={foodItems?.filter(n=>n.categories===filter)}/>
        </div>
         </section>
        
      </div>
  )
}

export default MenuContainer