import { createSlice } from '@reduxjs/toolkit'

const cartItemsSlice = createSlice({
    name: 'cartproducts',
    initialState: {
        ids: []
    },
    reducers: {
        addToCart: (state, action) => {
            state.ids.push(action.payload.id)
        },

        removeFromCart: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1)
        }
    }
})

export const addToCart = cartItemsSlice.actions.addToCart
export const removeFromCart = cartItemsSlice.actions.removeFromCart

export default cartItemsSlice.reducer