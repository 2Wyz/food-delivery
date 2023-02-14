import {getApp, getApps, initializeApp} from 'firebase/app'
import{getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyA-6IZiXO6enlmp5Dbviprbe4H17hI-jWo",
    authDomain: "food-delivery-app-4d438.firebaseapp.com",
    databaseURL: "https://food-delivery-app-4d438-default-rtdb.firebaseio.com",
    projectId: "food-delivery-app-4d438",
    storageBucket: "food-delivery-app-4d438.appspot.com",
    messagingSenderId: "871882683181",
    appId: "1:871882683181:web:35c8be667485ccbb6659a4",
   
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

  const firestore = getFirestore(app)

  const storage = getStorage(app)

  export{app , firestore, storage}