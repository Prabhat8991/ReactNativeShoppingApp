import { View, Text, FlatList, StyleSheet } from 'react-native'
import ProductImageContainer from '../components/ui/ProductImageContainer'
import ProductInfoTile from '../components/ui/ProductInfoTile'
import { getProducts } from '../utils/NetworkUtil'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addToFav, removeFromFav } from '../store/favproducts'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../store/cartproducts'
import CartItem from '../components/ui/CartItem'


function CartScreen() {

    const cartItems = useSelector((state) => state.cartItems.items)

    const allProducts = useSelector((state) => state.allItems.items)

    console.log('All Products  ... ' + allProducts[0].id)

    let itemsWithDetails = [];

    Object.keys(cartItems).forEach((key) => {
        const item = cartItems[key];
        console.log(`Item ID: ${key}`);
        console.log(`Quantity: ${item.quantity}`);
        const product = allProducts.find((product) => product.id == key);

        if (product) {
            // If product is found, push an object with both cart item and product details
            itemsWithDetails.push({
                id: key,
                quantity: item.quantity,
                // Include other properties from cart item and product as needed
                title: product.title,
                price: product.price,
                image: product.image
                // Add more properties as needed
            });
        } else {
            console.log(`Product with ID ${key} not found.`);
        }
    });


    const dispatch = useDispatch()


    function onRemoveFromCart(productId) {
        dispatch(removeFromCart({
            id: productId,
            quantity: 1
        }))
    }

    function onAddToCart(productId) {
        dispatch(addToCart({
            id: productId,
            quantity: 1
        }))
    }

    function CartListItem({ item }) {
        return (
            <CartItem {...item} onItemAdded={() => {
                onAddToCart(item.id)
            }} onItemRemoved={() => {
                onRemoveFromCart(item.id)
            }} />
        )
    }

    return (<View>
        <FlatList keyExtractor={(item) => item.id} data={itemsWithDetails} numColumns={1} renderItem={({ item }) => <CartListItem item={item} />} />
    </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: 'center',
    }
})
