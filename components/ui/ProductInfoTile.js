import { View, Text, StyleSheet } from 'react-native'
import ProductImageContainer from './ProductImageContainer'
import { Colors, TileRandomColors } from '../../colors/colors'
import { AntDesign } from '@expo/vector-icons'

function ProductInfoTile({ image, isFav, title, price }) {

    function getRandomColor() {
        const randomNumber = Math.floor(Math.random() * 4)
        return TileRandomColors[randomNumber]

    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.discountContainer}>
                    <Text style={styles.discountText}>30%</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <AntDesign name='heart' color="gray" />
            </View>
            <ProductImageContainer image={image} bgColor={getRandomColor()} />
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.dollar}>$</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
        </View>
    )
}

export default ProductInfoTile

const styles = StyleSheet.create({
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