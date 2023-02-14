import { fetchCart, fetchUser } from "../Utilitize/FetchLocalData"

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState ={
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems:cartInfo
}