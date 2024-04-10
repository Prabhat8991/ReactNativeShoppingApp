import { View, Text, FlatList, StyleSheet } from 'react-native'
import ProductImageContainer from '../components/ui/ProductImageContainer'
import ProductInfoTile from '../components/ui/ProductInfoTile'
import { getProducts } from '../utils/NetworkUtil'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addToFav, removeFromFav } from '../store/favproducts'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartproducts'


function ProductList() {

    const [productList, setProductList] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        let response = null;
        async function getProductList() {
            response = await getProducts()
            console.log("response...." + response)
            console.log("response...." + response)
            setProductList(response)
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
        dispatch(addToFav({
            id: productId
        }))
    }

    function addProductToCart(productId) {
        dispatch(addToCart({
            id: productId
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
