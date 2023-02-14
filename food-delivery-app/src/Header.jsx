import React from 'react'
import {MdShoppingBasket , MdAdd , MdLogout} from 'react-icons/md'
 import Avatar from './foodImages/avatar.png'
import Logo from './foodImages/logo.png'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../src/firebase.config'
import { motion } from 'framer-motion'
import {  Link } from 'react-router-dom'
import { useStateValue } from './contexts/StateProvider';
import { actionType } from './contexts/reducer';
import { useState } from 'react';



const Header = () => {

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const[{user,cartShow,cartItems}, dispatch] = useStateValue()

  const [isMenu, setisMenu] = useState(false)



  const login = async () =>{
    
    if (!user) {
      
      const {user: {refreshToken, providerData}}= await signInWithPopup(firebaseAuth, provider)
     dispatch( 
      {
        type:actionType.SET_USER,
        user: providerData[0],
      }
    
     )
 localStorage.setItem('user', JSON.stringify(providerData[0]))

    }

    else{ 
      setisMenu(!isMenu)
    }
    
  }

  const clear =() =>{
    setisMenu(false)
  }

  const logout =()=>{
    setisMenu(false)
    localStorage.clear()
    dispatch({
      type:actionType.SET_USER,
      user:null
    })
  }

  const showCart =() =>{
    dispatch( 
      {
        type:actionType.SET_CART_SHOW,
        cartShow:!cartShow,
      }
    
     )
  }

  return (
    <header className='fixed z-50 w-screen md:px-16 md:p-6 p-3 px-4 bg-primary' >
     {/* desktop & tablet */}
       <div className='hidden md:flex w-full h-full items-center justify-between ' >
        <div className='bg-white h-full rounded-full text-white border-2'>
        <Link to={'/'} className='flex items-center gap-2'> <motion.img whileTap={{scale:0.6}} src={Logo} alt="LOGO" className='w-8
         object-cover ' />
        <p className='text-headingColor text-xl font-bold'> <span>i</span>EAT</p>
        </Link>
        </div>
      <div className=' flex item-center gap-8'>  
    <motion.ul initial={{opacity:0 , x:200}}
    animate={{opacity:1 , x:0}} 
    exit={{opacity:0 , x:200 }}  className='flex gap-8  items-center '>
      <li className='text-base text-textColor hover:text-headingColor  duration-100 transition-all ease-in-out cursor-pointer'onClick={clear}>Home</li>
      <li className='text-base text-textColor hover:text-headingColor  duration-100 transition-all ease-in-out cursor-pointer'onClick={clear}>Menu</li>
      <li className='text-base text-textColor hover:text-headingColor  duration-100 transition-all ease-in-out cursor-pointer'onClick={clear}>About Us</li>
      <li className='text-base text-textColor hover:text-headingColor  duration-100 transition-all ease-in-out cursor-pointer'onClick={clear}>Service</li>
    </motion.ul>
    
<div className='relative flex items-center justify-center 'onClick={showCart}><MdShoppingBasket className='text-textColor text-2xl 
 cursor-pointer'/>
{cartItems && cartItems.length > 0 && (
  <div className='w-6 h-6 bg-cartNumBg rounded-full flex items-center justify-center absolute -top-2 -right-2' >
  <p className='text-sm text-white font-semibold ' >{cartItems.length}</p>
</div>
)}
</div>
<div className='relative'>
<motion.img whileTap={{scale:0.6}} src={user ? user.photoURL : Avatar} alt="AVATAR" className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full'
onClick={login} />

{
  isMenu &&(
    <motion.div initial={{opacity:0, scale:0.6}}
    animate={{opacity:1, scale:0.8}}
    exit={{opacity:1, scale:0.6}}
    className='w-40 bg-primary shadow-xl rounded-lg absolute flex flex-col
px-4 py-4 top-12 right-0'
>
  {user && user.email ==='nanloknanzing@gmail.com'&&(
   <Link to={'/createItem'}>
 <p className='px-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100 first-letter:
  transition-all duration-100 ease-in-out text-textColor text-base' onClick={clear}>  New Item <MdAdd/></p>

   </Link> 
  )

  }
 
  <p className='px-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100 first-letter:
  transition-all duration-100 ease-in-out text-textColor text-base' onClick={logout}> Logout <MdLogout className='ml-5'/></p>
</motion.div>

  )

}

</div>
</div>
    </div>
    

    {/* mobile  */}
    <div className='flex md:hidden w-full h-full item-center justify-between'>
    
        <div className='relative flex items-center justify-center 'onClick={showCart}><MdShoppingBasket className='text-textColor text-2xl 
 cursor-pointer'/>
{cartItems && cartItems.length > 0 && (
  <div className='w-6 h-6 bg-cartNumBg rounded-full flex items-center justify-center absolute -top-2 -right-2' >
  <p className='text-sm text-white font-semibold ' >{cartItems.length}</p>
</div>
)}
</div>
<div className='bg-white h-full rounded-full text-white border-2'>
<Link to={'/'} className='flex items-center gap-2'> <motion.img whileTap={{scale:0.6}}  src={Logo} alt="LOGO" className='w-8 object-cover' />
        <p className='text-headingColor text-xl font-bold'> <span>i</span>EAT</p>
        </Link>
        </div>

        <div className='relative'>
<motion.img whileTap={{scale:0.6}} src={user ? user.photoURL : Avatar} alt="AVATAR" className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full'
onClick={login} />

{
  isMenu &&(
    <motion.div initial={{opacity:0, scale:0.6}}
    animate={{opacity:1, scale:0.8}}
    exit={{opacity:1, scale:0.6}}
    className='w-40 bg-primary shadow-xl rounded-lg absolute flex flex-col
px-4 py-4 top-12 right-0'
>
  {user && user.email ==='nanloknanzing@gmail.com'&&(
   <Link to={'/createItem'}>
 <p className='px-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100 first-letter:
  transition-all duration-100 ease-in-out text-textColor text-base'>  New Item <MdAdd/></p>

   </Link> 
  )
  }

  
   <ul  className='flex  flex-col '>
      <li className='text-base text-textColor hover:text-headingColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 py-3 px-4'>Home</li>
      <li className='text-base text-textColor hover:text-headingColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 py-3 px-4'>Menu</li>
      <li className='text-base text-textColor hover:text-headingColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 py-3 px-4'>About Us</li>
      <li className='text-base text-textColor hover:text-headingColor  duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 py-3 px-4'>Service</li>
    </ul>
 
  <p className='px-4 flex items-center gap-3 cursor-pointer 
  transition-all duration-100 ease-in-out text-textColor text-base 
  justify-center bg-gray-200 hover:bg-gray-400 m-2 p-2 rounded-md shadow-md'  onClick={logout}> Logout <MdLogout /></p>
</motion.div>

  )

}

</div>
    </div>
    </header>
  
  )
}

export default Header