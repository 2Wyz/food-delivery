
import Header from './Header';
import {Route , Routes } from 'react-router-dom'
import CreateContainer from './CreateContainer';
import { AnimatePresence } from 'framer-motion';
import MainContainer from './MainContainer';
import { useStateValue } from './contexts/StateProvider';
import { getAllFoodItems } from './firebaseFunctions';
import { useEffect } from 'react';
import { actionType } from './contexts/reducer';

function App() {
  
  const [{foodItems}, dispatch] = useStateValue()

  const fetchData = async () => {
    await getAllFoodItems().then((data) =>{
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }

  useEffect(( ) => {
    fetchData()

  }, [])
  

  return (
    <AnimatePresence mode='wait' >
    <div className='w-screen h-auto flex  flex-col  bg-primary' >
     
      <Header/>
      <main className='mt-14 md:mt-20 md:px-16 py-4  px-8 w-full'>
        <Routes>
           <Route path='/*' element={<MainContainer/>} />
           <Route path='/createItem' element={<CreateContainer/>} />
        </Routes>
      </main>
    </div>
    </AnimatePresence>
  );
}

export default App;
