import { View, Text, FlatList, StyleSheet } from 'react-native'
import ProductImageContainer from '../components/ui/ProductImageContainer'
import ProductInfoTile from '../components/ui/ProductInfoTile'
import { getProducts } from '../utils/NetworkUtil'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addToFav, removeFromFav } from '../store/favproducts'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../store/cartproducts'
import { insertOrUpdateProduct, updateProductIsAddedToCart, updateProductIsFav } from '../utils/database'
import { ThemeContext } from '../theme/ThemeContext'
import { useContext } from 'react'


function FavouriteProductsScreen() {

    const [productList, setProductList] = useState([])

    const favitems = useSelector((state) => state.favItems.ids)

    const cartItems = useSelector((state) => state.cartItems.items)

    const { appTheme, toggleTheme } = useContext(ThemeContext);



    console.log("Fav items" + favitems)

    const isIdInCart = (idToCheck) => {
        // Check if the ID exists in the items array
        return cartItems.hasOwnProperty(idToCheck);
    };


    const dispatch = useDispatch()

    useEffect(() => {
        let response = null;
        async function getProductList() {
            response = await getProducts()
            response = response.filter((item) => favitems.includes(item.id))
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
        if (isIdInCart(productId)) {
            dispatch(removeFromCart({
                id: productId,
                quantity: 1
            }))
            return
        }
        dispatch(addToCart({
            id: productId,
            quantity: 1
        }))
    }

    return <View style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor
    }}>
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
