import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { motion } from 'framer-motion'
import  {RiRefreshFill} from 'react-icons/ri'
 import { useEffect } from 'react'
import { useStateValue } from './contexts/StateProvider'
import { actionType } from './contexts/reducer'
import EmptyCart  from './foodImages/emptyCart.svg'
import CartItem from './CartItem'
import { useState } from 'react'




const CartContainer = ( ) => {

  let qty =[]
  let price =[]
  

  const[{cartShow , cartItems, user}, dispatch] = useStateValue()

  const showCart =() =>{
    dispatch( 
      {
        type:actionType.SET_CART_SHOW,
        cartShow:!cartShow,
      }
    
     )
  }


  const clearCart = () =>{
    dispatch({
      type:actionType.SET_CARTITEMS,
      cartItems:[]
    })
    localStorage.setItem('cartItems', JSON.stringify([]))
  }

  const [total, setTotal] = useState()

  const [flag, setFlag] = useState()


useEffect(() => {
  let totalPrice = cartItems.reduce(function(accumulator, item){
    return accumulator + item.qty * item.price
  }, 0)
  setTotal(totalPrice)
}, [total ,flag])








console.log(cartItems);
  return (
    <motion.div 
    initial={{opacity:0 ,x:200}}
    animate={{opacity:1,x:0}}
    exit={{opacity:0, x:200}}
    className='w-full h-screen flex flex-col md:w-375 bg-white drop-shadow-md
    fixed right-0 top-0 z-[101] '>
      <div className='w-full flex items-center justify-between cursor-pointer p-4'>
        <motion.div whileTap={{scale:0.75}} onClick={showCart}><MdOutlineKeyboardBackspace className='text-textColor text-3xl '/> </motion.div>
        <p className='text-textColor font-semibold  text-lg'></p>

        <motion.p  onClick={clearCart} whileTap={{scale:0.75}} className='flex items-center p-1 gap-2 px-2 my-2 bg-gray-100
        rounded-md hover:shadow-md   cursor-pointer
        text-textColor text-base'>clear <RiRefreshFill/>{''}</motion.p>
      </div>

      {/* bottom section */}
      {  cartItems && cartItems.length > 0 ? (
<div className='w-full flex h-full bg-cartBg rounded-t-[2rem] flex-col'>

  <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-x-scroll
  overflow-y-scroll scrollbar-none'>

    {/* each item */}

   {cartItems && cartItems.map((item)=>(
   <CartItem key={item?.id} item={item} flag={flag} setFlag={setFlag} />

   ))}
  </div>
{/* cart total */}
<div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col 
items-center justify-evenly px-8 py-2'>
  <div className='w-full flex items-center justify-between'>
    <p className='text-gray-400 text-lg'>Sub Total</p>
    <p className='text-gray-400 text-lg'><span>$</span>8.5</p>
  </div>

  <div className='w-full flex items-center justify-between'>
    <p className='text-gray-400 text-lg'>Delivery</p>
    <p className='text-gray-400 text-lg'><span>$</span>2.5</p>
  </div>

  <div className='w-full border-b border-gray-600 my-2'></div>

  <div className='w-full flex justify-between items-center'>
    <p className='text-gray-200 text-xl font-semibold'>Total</p>
    <p className='text-gray-200 text-xl font-semibold'> <span>$</span>11</p>
  </div>

{
  user ? (
    <motion.button type='button' whileTap={{scale:0.8}} className="w-full p-2 rounded-full
bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg 
duration-150">
 check out

</motion.button>
  ):(
    <motion.button type='button' whileTap={{scale:0.8}} className="w-full p-2 rounded-full
bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg 
duration-150">
 Login to check out

</motion.button>
  )
}
</div>

</div>
      ) :(<div className='w-full h-full flex flex-col items-center justify-center gap-6'>
        <img src={EmptyCart}alt="" className='w-300' />
        <p className='text-xl text-textColor font-semibold'>Add something to in the cart</p>
      </div>)
}
    </motion.div>
  )
}

export default CartContainer