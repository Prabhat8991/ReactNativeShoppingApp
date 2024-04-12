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

function ProductInfoTile({ id, image, title, price, onFavPress, onAddToCartPress, rating }) {

    const favItems = useSelector((state) => state.favItems.ids)

    const cartItems = useSelector((state) => state.cartItems.ids)

    const navigation = useNavigation()


    const [backGroundColor, setBackGroundColor] = useState(null);

    function isFavProduct() {
        return favItems.includes(id)
    }

    function getRandomColor() {
        const randomNumber = Math.floor(Math.random() * 4)
        return TileRandomColors[randomNumber]

    }

    useEffect(() => {
        setBackGroundColor(getRandomColor())
    }, [])

    let cartTitle = 'Add to cart'
    if (cartItems.includes(id)) {
        cartTitle = 'Remove from cart'
    }

    return (
        <Pressable onPress={() => {
            navigation.navigate('ProductDetails')
        }}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.discountContainer}>
                        <Text style={styles.discountText}>30%</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <AntDesign onPress={() => {
                        onFavPress(id)
                    }} name='heart' color={isFavProduct() ? 'red' : 'gray'} />
                </View>
                <ProductImageContainer image={image} bgColor={backGroundColor} />
                <Text numberOfLines={1} style={styles.title}>{title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.dollar}>$</Text>
                    <Text style={styles.price}>{price}</Text>
                </View>
                <OutlinedButton title={cartTitle} onAddToCartPress={() => {
                    onAddToCartPress(id)
                }} />
                <Rating rating={rating.rate} />
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
        alignContent: 'center'
    },
    title: {
        marginTop: 10,
        fontSize: 10,
        width: 50
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryPurple
    }
})