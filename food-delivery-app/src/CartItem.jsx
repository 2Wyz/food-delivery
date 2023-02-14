import React from 'react'
import {BiMinus , BiPlus} from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useStateValue } from './contexts/StateProvider'
import { actionType } from './contexts/reducer'
import { useEffect } from 'react'
import {fetchCart} from './Utilitize/FetchLocalData'

let items =[]



const CartItem = ({item , setFlag, flag,}) => {

    const [qty, setQty] = useState(item.qty)

    const[{cartItems }, dispatch] = useStateValue()
    const [items, setItems] = useState([])

    const cartDispatch = () =>{
      localStorage.setItem('cartItem', JSON.stringify(items))
      dispatch({
        type:actionType.SET_CARTITEMS,
        cartItems:items

      })
    }

const updateQty = (action , id)=>{
  if(action === 'add'){
    setQty(qty + 1)
    cartItems.map((item)=>{
      if(item.id === id){
        item.qty +=  1
        setFlag(flag + 1)
      }
    })
    cartDispatch()
  }else{
  
   if (qty === 1 ){
    setItems(cartItems.filter((item)=>item.id !==id))
    setFlag(flag + 1)
    cartDispatch()
   }else{
    setQty(qty-1)
    cartItems.map((item)=>{
      if(item.id===id){
        item.qty -= 1
        setFlag(flag + 1)
      }
    })
    cartDispatch()
   }
  }

}

useEffect(() => {
  setItems(cartItems)
  
}, [qty , items])



  return (
    <div>
   <div key={item.id} className='w-full items-center px-2 rounded-lg bg-cartItem p-1 flex   gap-2'>
 <img src={item?.ImageURL} alt="" className='w-20 h-20
 max-w-[60px]rounded-full object-contain'/>
  
<div className='flex flex-col gap-2 '>  
 <p className='text-base text-gray-50 '>{item?.title}</p>
 <p className='text-sm text-gray-300 font-semibold '><span>$</span>{item?.price*qty}</p>
</div>
 {/* button section */}
<div className='group cursor-pointer flex items-center ml-auto gap-2'>

 <motion.div whileTap={{scale:0.75}} onClick={()=> updateQty('remove' ,item?.id)}>
 <BiMinus  className='text-gray-50'/>
 </motion.div>
 <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50
 flex items-center justify-center '>
{qty}
 </p>

 <motion.div whileTap={{scale:0.75}}  onClick={()=> updateQty('add' ,item?.id)}>
 <BiPlus className='text-gray-50'/>
 </motion.div>

</div>
 </div>

    </div>
  )
}

export default CartItem