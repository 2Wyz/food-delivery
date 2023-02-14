import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdAttachMoney, MdBarChart, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from 'react-icons/md'
import { Categories } from './Utilitize/data'
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from './firebase.config'
import { saveItem } from './firebaseFunctions'
import { useStateValue } from './contexts/StateProvider'
import { getAllFoodItems } from './firebaseFunctions'
import { actionType } from './contexts/reducer'


const CreateContainer = () => {

  const[title , setTitle] = useState('')
  const[calories , setCalories] = useState('')
  const[price  , setPrice] = useState('')
  const[categories , setCategories] = useState('')
  const[imageAsset, setImageAsset] = useState(null) 
  const[fields, setFields] = useState(false)
  const[alertStatus , setAlertStatus] = useState('danger')
  const[msg, setMsg] = useState(null)
  const[isLoading, setIsLoading] = useState(false)
  const[nutrition, setNutrition] = useState('')
  const [{foodItems}, dispatch] = useStateValue('')

  
  
  const uploadImage = (e) =>{
      setIsLoading(true)
      const imageFile = e.target.files[0]
      

      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)

      const uploadTask = uploadBytesResumable(storageRef , imageFile) 
      uploadTask.on(
        'state_changed',
        (snapshot) =>{
          const uploadProgress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        },
        (error)=> {
          
          console.log(error);
          setFields(true)

          setMsg('Error while loading')

          setAlertStatus('danger')
          
          setTimeout(() => {
            setFields(false)
            setIsLoading(false)
            
          }, 4000);

        },
        () =>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            setImageAsset(downloadURL)
            setIsLoading(false)
            setFields(true)
            setMsg('Image upload successful')
            setAlertStatus('success')

            setTimeout(() => {
              setFields(false)
            }, 4000);
          })
        }
      )
  }

  const deleteImage = ()=>{
   
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject (deleteRef).then(()=>{
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
      setMsg('Image deleted successfully')
      setAlertStatus('success')

      setTimeout(() => {
        setFields(false)
      },4000);
    })
  }


  const saveDetails =() =>{
setIsLoading(true)

try { if ((!title||!price||!nutrition||!categories||!calories||!imageAsset)) {

  setFields(true)

  setMsg('empty field most be filled')
  clearData()
  

  setAlertStatus('danger')
  setTimeout(() => {
    setFields(false)
    setIsLoading(false)
    
  }, 4000);


  
}

else{
 const data = {
  id: `${Date.now()}`,
  title: title,
  calories:calories,
  ImageURL : imageAsset,
  categories:categories,
  qty: 1, 
  price: price,
  nutrition:nutrition 
 }
 saveItem(data)
setIsLoading(false)
 setFields(true)

 setMsg('Data uploaded successfully')
 clearData()

 setAlertStatus('success')
 
 setTimeout(() => {
   setFields(false)  
 }, 4000);


}
  
} catch (error) {

  setFields(true)

  setMsg('Error while loading')

  setAlertStatus('danger')
  
  setTimeout(() => {
    setFields(false)
    setIsLoading(false)
    
  }, 4000);

  
}
fetchData()

  }



 const clearData = ()=>{
   setCalories('')
   setNutrition('')
   setImageAsset(null)
   setPrice('')
   setTitle('')
   setCategories('select catategory')
 }

 const fetchData = async () => {
  await getAllFoodItems().then(data =>{
    dispatch({
      type:actionType.SET_FOOD_ITEMS,
      foodItems: data
    })
  })
}




  return (
    <div className='w-full min-h-screen  flex items-center justify-center '>
   <div className=' gap-4 w-[90%] p-4 md:w-[75%] border border-gray-300 rounded-lg flex flex-col items-center justify-center'>
  { fields &&
    <motion.p initial= {{opacity:0}}
  animate={{opacity:1}}
  exit={{opacity:0}}
   className={` w-auto  p-2  fixed rounded-lg text-center text-lg font-semibold ${alertStatus ==='danger' ? ' text-red-400 bg-red-800':
'text-emerald-400 bg-emerald-800'}`}>{msg}</motion.p>
  }

  <div className='w-full items-center border-b py-2 flex border-gray-300
  gap-2'>
    <MdFastfood className='texy-xl text-gray-700'/> 
    <input type="text" required value={title} placeholder='Give me a title...'  className='w-full h-full bg-transparent 
   outline-none border-none placeholder:text-gray-400 text-textColor' onChange={(e) =>setTitle (e.target.value)}/>
  </div>
  <div className='w-full '>
    <select  onChange={(e)=>setCategories(e.target.value)} className=" border-b-2
    outline-none w-full h-auto cursor-pointer border-gray-200 p-2 rounded-md">
      <option value="other" className='bg-white'>select category </option>
      {Categories && Categories.map(cat=>(
        <option key={cat.id} className='text-base border-0 text-capitalize outline-none bg-white text-textColor
      ' value={cat.urlParamName} > {cat.name}</option>
      ))}
    </select>
  
  </div>
  <div className='border-dotted border-2 group flex justify-center items-center
  flex-col border-gray-300 w-full md:h-420 rounded-lg h-225 cursor-pointer'>

 {isLoading ? (<Loader/>) :<>
 
 {!imageAsset ? (<>
 <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
<div className='w-full h-full flex flex-col items-center justify-center gap-2'>

  <MdCloudUpload className='text-gray-500 hover:text-gray-700 text-3xl'/>
  <p className='text-gray-500 hover:text-gray-700'> Click here to upload</p>
</div>
<input type="file"  name="uploadimage" accept='image/*' className='h-0 w-0' onChange={uploadImage} /> 
 </label>
 
 </>) 
 
 :<>
 <div className='relative h-full'>
  <img src={imageAsset} alt="" className='w-full h-full object-cover' />
  <button type='button' className='bottom-3 absolute right-3 p-3 rounded-full bg-red-500 text-xl
   cursor-pointer hover:shadow-md transition-all ease-in-out duration-500 ' onClick={deleteImage}>{<MdDelete className='text-white'/>}</button>
 </div>
 
 </>}
 </>}

  </div>

  <div className='w-full flex flex-col md:flex-row items-center gap-3 '>
    <div className='w-full py-2  border-b border-gray-300 flex items-center gap-2 '>
      <MdFoodBank  className='text-gray-700 text-2xl'/>
      <input type="text" required 
      placeholder='calories'
      value={calories}
      onChange={(e)=>setCalories(e.target.value)}
      className='w-full h-full  text-lg bg-transparent outline-non border-none placeholder:text-gray-400
      text-textColor' />
    </div>

    <div className='w-full py-2  border-b border-gray-300 flex items-center gap-2 '>
      <MdAttachMoney  className='text-gray-700 text-2xl'/>
      <input type="text" required 
      onChange={(e)=>setPrice (e.target.value)}
        placeholder='prices'
        value={price}
      className='w-full h-full  text-lg bg-transparent outline-non border-none placeholder:text-gray-400
      text-textColor' />
    </div>

    

    <div className='w-full py-2  border-b border-gray-300 flex items-center gap-2 '>
      <MdBarChart  className='text-gray-700 text-2xl'/>
      <textarea type="text" required 
      onChange={(e)=>setNutrition (e.target.value)}
        placeholder='add nutritional value..'
        value={nutrition}
      className='w-full h-full  text-lg bg-transparent outline-non border-none placeholder:text-gray-400
      text-textColor' ></textarea>
    </div>




  </div>
  <div className='flex items-center w-full'>
<button type='button' className='ml-0 md:ml-auto  w-full md:w-auto  border-none rounded-lg
bg-emerald-500 text-white py-2 px-12 font-semibold  ' onClick={saveDetails}> Save</button>

  </div>
</div>
    </div>
  )
}

export default CreateContainer