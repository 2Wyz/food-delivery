import React from 'react'
import Delivery from './foodImages/delivery.png'
import HeroBg from './foodImages/heroBg.png'
import { HeroData } from './Utilitize/data'
import {CiSearch} from 'react-icons/ci'

const HomeContainer = () => {
  return (

    <section className=' md:grid-cols-2 gap-2 w-full bg-orange-50' id='HOME' >
     <div className=' flex items-center flex-row mt-14'>
     <video autoplay="autoplay" loop="loop" muted="muted" width="281" height="252" ><source src="https://res.cloudinary.com/glovoapp/video/upload/website_assets/images/landing/address-container-animation.webm" preload="auto" type="video/webm" data-v-61a7698f=""/>
  </video>
<div className='flex justify-between'>
    <input type="text" className=' relative w-full h-10 rounded-full border-2 text-center shadow-lg ' placeholder='search for a restaurant near you or your favorite restaurant' />  <CiSearch className='absolute'/>
    
    </div>
  </div>

     
     
     
      {/* <div className='  py-2 flex-1 flex flex-col items-start justify-center  gap-6'>
        <div className='flex items-center  justify-center gap-2 bg-orange-200 px-3 py-1 rounded-full'>
          <p className='text-base text-orange-500 font-semibold'>Bike Delivery
        </p>
        <div className='w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl'>
          <img src={Delivery} className='w-full h-full object-contain ' alt="" />
          </div>
        </div>
      
      
      <p className='text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-textColor'>
        The Best Online
        <video autoplay="autoplay" loop="loop" muted="muted" width="281" height="252" ><source src="https://res.cloudinary.com/glovoapp/video/upload/website_assets/images/landing/address-container-animation.webm" preload="auto" type="video/webm" data-v-61a7698f=""/>
  </video>
         Restaurant In <span className='text-orange-600 lg:text-[5rem] text-[3rem]'>
          
          
          Your City</span></p>
        <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione harum 
          illum commodi sunt recusandae quos dicta, totam repellat dolorem quo doloribus placeat illo 
          reiciendis architecto sequi incidunt. A magnam optio praesentium repudiandae molestias fugiat illo,
           exercitationem deserunt illum ipsum nam sit vitae nostrum voluptate dolore vero nobis! Error illum
            placeat rem ratione similique voluptatem? Vel iure doloremque miexped</p>

            

           <button type='button'className='bg-gradient-to-br from-orange-400 to-orange-500 w-full
           px-4 py-2 md:w-auto rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-gray-100 font-bold '> ORDER NOW</button>
      </div> */}

      <div className='py-2 flex-1 flex items-center justify-center relative '>


      
       {/* <img src={HeroBg} alt="" className='ml-auto lg:h-650 h-420 w-full  lg:w-auto ' />
      */}
     <div className='w-full h-full md:grid md:grid-cols-2  lg:grid-cols-2 items-center top-0 left-0 absolute flex flex-wrap 
     drop-shadow-2lg justify-center max-sm:grid max-sm:grid-cols-2  py-4 gap-2 lg:grid lg:drop-shadow-lg '>
        {/* {HeroData && HeroData.map(item =>(
            <div key={item.id} className=' max-sm:px-2 lg:w-190 min-w-[190px]  p-2 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-wrap items-center flex-col'>
            <img src={item.imgSRC} alt="" className=' max-sm:w-12 lg:-mt-20  lg:w-40 w-20  -mt-6' />
            <p className=' max-xsm:text-sm lg:text-xl text-lg text-textColor font-semibold mt-2  my-2 lg:mt-4'> {item.name}</p>
     
            <p className=' max-xsm:text-xs text-gray-600 lg:text-sm  text-sm-[14px] lg:my-3 my-1'>{item.desc}</p>
     
            <p className='text-headingColor font-semibold text-sm max-sm:text-xs'> <span className='bg-red lg:text-xs text-xs[8px] '>$</span> {item.price}</p>
     
             </div>
     
        ))}
         */}
     </div>
     

      </div>

     


    </section>
    )
}

export default HomeContainer