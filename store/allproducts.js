import { createSlice } from '@reduxjs/toolkit'

const allItemsSlice = createSlice({
    name: 'allItems',
    initialState: {
        items: []
    },
    reducers: {
        addAllItems: (state, action) => {
            state.items = action.payload.items
        },
    }
})

export const addAllItems = allItemsSlice.actions.addAllItems

export default allItemsSlice.reducer