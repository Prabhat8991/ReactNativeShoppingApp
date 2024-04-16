import { createSlice } from '@reduxjs/toolkit';

const cartItemsSlice = createSlice({
    name: 'cart',
    initialState: {
        items: {}, // Object to hold items with their quantities
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity } = action.payload;
            if (state.items[id]) {
                state.items[id].quantity += quantity; // Increase quantity if item already exists
            } else {
                state.items[id] = { quantity }; // Add new item to cart
            }
        },
        removeFromCart: (state, action) => {
            const { id, quantity } = action.payload;
            if (state.items[id]) {
                state.items[id].quantity -= quantity; // Decrease quantity
                if (state.items[id].quantity <= 0) {
                    delete state.items[id]; // Remove item if quantity becomes zero or negative
                }
            }
        },
        removeAllFromCart: (state, action) => {
            const { id } = action.payload;

            // Check if the item with the specified ID exists in the cart
            if (state.items.hasOwnProperty(id)) {
                // Remove the item with the specified ID from the cart
                delete state.items[id];
            } else {
                console.log(`Item with ID ${id} does not exist in the cart.`);
            }
        },
        clearCart: (state) => {
            state.items = {}; // Clear the entire cart
        }
    }
});

export const { addToCart, removeFromCart, removeAllFromCart, clearCart } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
