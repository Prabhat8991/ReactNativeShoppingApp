import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
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
import { useContext } from 'react'
import { ThemeContext } from '../theme/ThemeContext'
import { MaterialIcons } from '@expo/vector-icons'
import { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { lightTheme } from '../theme/theme'
import { Colors } from '../colors/colors'

function ProductList() {

    const [productList, setProductList] = useState([])

    const cartItems = useSelector((state) => state.cartItems.items)

    const favItems = useSelector((state) => state.favItems.ids)

    const dispatch = useDispatch()

    const navigation = useNavigation()

    const { appTheme, toggleTheme } = useContext(ThemeContext);

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <Pressable onPress={() => {
    //                 toggleTheme()
    //             }}>
    //                 <MaterialIcons name={'dark-mode'} color={appTheme === lightTheme ? "#000000" : "#ffffff"} size={30} />
    //             </Pressable>
    //         ),
    //         headerStyle: {
    //             backgroundColor: appTheme.backgroundColor
    //         },
    //         headerTintColor: appTheme === lightTheme ? '#000000' : '#FFFFFF', // Change the title color based on the theme
    //     });
    // }, [navigation, appTheme]);

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
        const newItem = {
            ...item,
            rate: item.rating ? item.rating.rate : item.rate
        };
        return (<View style={[styles.itemContainer, { backgroundColor: appTheme.backgroundColor }]}>
            <ProductInfoTile {...newItem} onFavPress={addToFavProducts} onAddToCartPress={addProductToCart} />
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
