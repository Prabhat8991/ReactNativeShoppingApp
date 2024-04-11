import { View, Text, FlatList, StyleSheet } from 'react-native'
import ProductImageContainer from '../components/ui/ProductImageContainer'
import ProductInfoTile from '../components/ui/ProductInfoTile'
import { getProducts } from '../utils/NetworkUtil'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addToFav, removeFromFav } from '../store/favproducts'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../store/cartproducts'


function FavouriteProductsScreen() {

    const [productList, setProductList] = useState([])

    const favitems = useSelector((state) => state.favItems.ids)

    const cartItems = useSelector((state) => state.cartItems.ids)


    console.log("Fav items" + favitems)


    const dispatch = useDispatch()

    useEffect(() => {
        let response = null;
        async function getProductList() {
            response = await getProducts()
            console.log("Fav response...." + response)
            response = response.filter((item) => favitems.includes(item.id))
            console.log("Fav response...." + response)
            setProductList(response)
        }
        getProductList()
    }, [favitems])

    //onFavPress={addToFavProducts}
    function ProductListItem({ item }) {
        return (<View style={styles.itemContainer}>
            <ProductInfoTile {...item} onFavPress={removeFromFavorite} onAddToCartPress={addProductToCart} />
        </View>)
    }

    function removeFromFavorite(productId) {
        dispatch(removeFromFav({
            id: productId
        }))
    }

    function addProductToCart(productId) {
        if (cartItems.includes(productId)) {
            dispatch(removeFromCart({
                id: productId
            }))
            return
        }
        dispatch(addToCart({
            id: productId
        }))
    }

    return <View>
        <FlatList keyExtractor={(item) => item.id} data={productList} numColumns={2} renderItem={({ item }) => <ProductListItem item={item} />} />
    </View>
}

export default FavouriteProductsScreen

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: 'center',
    }
})
