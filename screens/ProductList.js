import { View, Text, FlatList, StyleSheet } from 'react-native'
import ProductImageContainer from '../components/ui/ProductImageContainer'
import ProductInfoTile from '../components/ui/ProductInfoTile'
import { getProducts } from '../utils/NetworkUtil'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addToFav, removeFromFav } from '../store/favproducts'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart, removeAllFromCart } from '../store/cartproducts'
import { addAllItems } from '../store/allproducts'
import { insertOrUpdateProduct } from '../utils/database'

function ProductList() {

    const [productList, setProductList] = useState([])

    const cartItems = useSelector((state) => state.cartItems.items)

    const favItems = useSelector((state) => state.favItems.ids)

    const dispatch = useDispatch()

    useEffect(() => {
        let response = null;
        async function getProductList() {
            response = await getProducts()
            setProductList(response)
            dispatch(addAllItems({
                items: response
            }))
            response.map(product => {
                insertOrUpdateProduct({ ...product, isFav: false, isAddedToCart: false })
            });
        }
        getProductList()
    }, [])

    //onFavPress={addToFavProducts}
    function ProductListItem({ item }) {
        return (<View style={styles.itemContainer}>
            <ProductInfoTile {...item} onFavPress={addToFavProducts} onAddToCartPress={addProductToCart} />
        </View>)
    }

    function addToFavProducts(productId) {
        if (favItems.includes(productId)) {
            dispatch(removeFromFav({
                id: productId
            }))
            return
        }
        dispatch(addToFav({
            id: productId
        }))
    }

    const isIdInCart = (idToCheck) => {
        // Check if the ID exists in the items array
        return cartItems.hasOwnProperty(idToCheck);
    };

    function addProductToCart(productId) {
        if (isIdInCart(productId)) {
            dispatch(removeAllFromCart({
                id: productId
            }))
            return
        }
        dispatch(addToCart({
            id: productId,
            quantity: 1
        }))
    }


    return <View>
        <FlatList keyExtractor={(item) => item.id} data={productList} numColumns={2} renderItem={({ item }) => <ProductListItem item={item} />} />
    </View>
}

export default ProductList

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        alignItems: 'center',
    }
})
