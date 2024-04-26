import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity } from 'react-native'
import ProductImageContainer from './ProductImageContainer'
import { Colors, TileRandomColors } from '../../colors/colors'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import OutlinedButton from './OutlinedButton'
import Star from './Star'
import Rating from './RatingComponent'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { ThemeContext } from '../../theme/ThemeContext'
import { darkTheme, lightTheme } from '../../theme/theme'

function ProductInfoTile({ id, image, title, price, onFavPress, onAddToCartPress, rate }) {

    const { appTheme, toggleTheme } = useContext(ThemeContext);

    const favItems = useSelector((state) => state.favItems.ids)

    const cartItems = useSelector((state) => state.cartItems.items)

    console.log('Cart items ...' + cartItems)

    const navigation = useNavigation()

    function isFavProduct() {
        return favItems.includes(id)
    }

    isIdInCart = (idToCheck) => {
        // Check if the ID exists in the items array
        return cartItems.hasOwnProperty(idToCheck);
    };


    let cartTitle = 'Add to cart'
    if (isIdInCart(id)) {
        cartTitle = 'Remove from cart'
    }

    return (
        <Pressable onPress={() => {
            navigation.navigate('ProductDetails', {
                productId: id
            })
        }}>
            <View style={[styles.container, { backgroundColor: appTheme === darkTheme ? '#A9A9A9' : Colors.primaryWhite }]}>
                <View style={styles.headerContainer}>
                    <View style={styles.discountContainer}>
                        <Text style={[styles.discountText, { color: appTheme.textColor }]}>30%</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <AntDesign onPress={() => {
                        onFavPress(id)
                    }} name='heart' color={isFavProduct() ? 'red' : 'gray'} />
                </View>
                <ProductImageContainer image={image} id={id} />
                <Text numberOfLines={2} style={[styles.title, { color: appTheme.textColor }]}>{title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.dollar}>$</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
                <OutlinedButton title={cartTitle} onAddToCartPress={() => {
                    onAddToCartPress(id)
                }} />
                <Rating rating={rate} />
            </View>
        </Pressable>
    )
}

export default ProductInfoTile

const styles = StyleSheet.create({
    cartParentContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cartContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.primaryPurple,
        padding: 5,
    },
    cartButton: {
        color: Colors.primaryPurple,
        fontSize: 12,
        width: 110,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    priceContainer: {
        marginTop: 20,
        flexDirection: 'row',
    },
    dollar: {
        fontSize: 10,
        paddingRight: 3,
        fontWeight: 'bold',
        color: Colors.primaryPurple

    },
    discountText: {
        fontSize: 10,
    },
    discountContainer: {
        width: 25,
        height: 20,
        borderRadius: 5,
        backgroundColor: "#a3dff9",
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryWhite,
        borderRadius: 10,
        margin: 30,
        padding: 20,
        alignContent: 'center',
        shadowColor: '#000',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        marginTop: 10,
        fontSize: 10,
        width: 70,
        textAlign: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryPurple
    }
})