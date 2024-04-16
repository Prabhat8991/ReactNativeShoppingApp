import { configureStore } from '@reduxjs/toolkit'
import favProductReducer from './favproducts'
import cartProductsReducer from './cartproducts'
import allItemsReducer from './allproducts'

export const store = configureStore({
    reducer: {
        favItems: favProductReducer,
        cartItems: cartProductsReducer,
        allItems: allItemsReducer
    }
})