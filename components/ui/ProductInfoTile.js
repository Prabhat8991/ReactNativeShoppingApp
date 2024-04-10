import { View, Text, StyleSheet, Button, Pressable, TouchableOpacity } from 'react-native'
import ProductImageContainer from './ProductImageContainer'
import { Colors, TileRandomColors } from '../../colors/colors'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function ProductInfoTile({ id, image, title, price, onFavPress, onAddToCartPress }) {

    const favItems = useSelector((state) => state.favItems.ids)

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


    return (
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
            <TouchableOpacity style={styles.cartContainer} onPress={() => {
                onAddToCartPress(id)
            }}>
                <Text style={styles.cartButton}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductInfoTile

const styles = StyleSheet.create({
    cartContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.primaryPurple,
        padding: 5
    },
    cartButton: {
        color: Colors.primaryPurple,
        fontSize: 12,
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