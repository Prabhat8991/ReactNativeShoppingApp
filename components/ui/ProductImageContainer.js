import { View, StyleSheet, Image } from 'react-native'
import { TileRandomColors } from '../../colors/colors'
import { useEffect, useState } from 'react'

export const PRODUCT_IMAGE_TYPE = ['CART_ITEM', 'PRODUCT_LIST']


let BASE_SIZE = 100
let IMAGE_CONTAINER_SIZE = 60
let IMAGE_CONTAINER_OFFSET = 35

function ProductImageContainer({ image, productImageType, style }) {

    const [backGroundColor, setBackGroundColor] = useState(null);

    function getRandomColor() {
        const randomNumber = Math.floor(Math.random() * 4)
        return TileRandomColors[randomNumber]

    }
    useEffect(() => {
        setBackGroundColor(getRandomColor())
    }, [])

    if (productImageType === 'CART_ITEM') {
        BASE_SIZE = 70
        IMAGE_CONTAINER_SIZE = 40
        IMAGE_CONTAINER_OFFSET = 25
    }
    return (
        <View style={[styles.container, style]}>
            <View style={styles.circlesContainer}>
                <View style={[styles.circle_1, { backgroundColor: backGroundColor }]} />
                <View style={[styles.circle_2, { backgroundColor: backGroundColor }]} />
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={{ uri: image }}
                        resizeMode="cover"
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: BASE_SIZE,
        height: BASE_SIZE,
    },
    circlesContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        position: 'relative',
        width: '100%', // Increase size to extend beyond circles
        height: '100%', // Increase size to extend beyond circles
    },
    imageContainer: {
        position: 'absolute',
        width: IMAGE_CONTAINER_SIZE, // Increase size to extend beyond circles
        height: IMAGE_CONTAINER_SIZE, // Increase size to extend beyond circles
        top: IMAGE_CONTAINER_OFFSET,
        left: IMAGE_CONTAINER_OFFSET
    },
    circle_1: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: BASE_SIZE / 2,
    },
    circle_2: {
        position: 'absolute',
        width: '90%',
        height: '90%',
        borderRadius: (BASE_SIZE * 0.9) / 2,
        borderWidth: 2,
        borderColor: 'white'
    },
});


export default ProductImageContainer