import { configureStore } from '@reduxjs/toolkit'
import favProductReducer from './favproducts'
import cartProductsReducer from './cartproducts'


export const store = configureStore({
    reducer: {
        favItems: favProductReducer,
        cartItems: cartProductsReducer
    }
})