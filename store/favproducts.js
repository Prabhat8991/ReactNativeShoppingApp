import { createSlice } from '@reduxjs/toolkit'

const favItemsSlice = createSlice({
    name: 'favproducts',
    initialState: {
        ids: []
    },
    reducers: {
        addToFav: (state, action) => {
            state.ids.push(action.payload.id)
        },

        removeFromFav: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1)
        }
    }
})

export const addToFav = favItemsSlice.actions.addToFav
export const removeFromFav = favItemsSlice.actions.removeFromFav

export default favItemsSlice.reducer