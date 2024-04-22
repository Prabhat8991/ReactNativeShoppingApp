import { View, StyleSheet, Image } from 'react-native'
import { TileRandomColors } from '../../colors/colors'
import { useEffect, useState } from 'react'

export const PRODUCT_IMAGE_TYPE = {
    CART_ITEM: 'cart_item',
    PRODUCT_LIST_ITEM: 'product_list_item',
    PRODUCT_DETAIL_ITEM: 'product_detail_item'
}

function ProductImageContainer({ image, productImageType, style }) {

    const [imageState, setImageState] = useState({
        baseSize: 100,
        imageContainerSize: 60,
        imageContainerOffset: 35,
        backGroundColor: null
    });


    const [backGroundColor, setBackGroundColor] = useState(null);

    function getRandomColor() {
        const randomNumber = Math.floor(Math.random() * 4)
        return TileRandomColors[randomNumber]

    }
    useEffect(() => {
        let newSize = 100;
        let newImageContainerSize = 60;
        let newImageContainerOffset = 35;

        if (productImageType === PRODUCT_IMAGE_TYPE.CART_ITEM) {
            newSize = 70;
            newImageContainerSize = 40;
            newImageContainerOffset = 25;
        } else if (productImageType === PRODUCT_IMAGE_TYPE.PRODUCT_DETAIL_ITEM) {
            newSize = 200;
            newImageContainerSize = 100;
            newImageContainerOffset = 50;
        }

        setImageState({
            ...imageState,
            baseSize: newSize,
            imageContainerSize: newImageContainerSize,
            imageContainerOffset: newImageContainerOffset,
        });

        setBackGroundColor(getRandomColor())
    }, [])

    const { baseSize, imageContainerSize, imageContainerOffset } = imageState;


    return (
        <View style={[styles.container, { width: baseSize, height: baseSize }, style]}>
            <View style={styles.circlesContainer}>
                <View style={[styles.circle_1, { backgroundColor: backGroundColor, borderRadius: baseSize / 2 }]} />
                <View style={[styles.circle_2, { backgroundColor: backGroundColor, borderRadius: (baseSize * 0.9) / 2, }]} />
                <View style={[styles.imageContainer, { width: imageContainerSize, height: imageContainerSize, top: imageContainerOffset, left: imageContainerOffset }]}>
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
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        position: 'absolute',
    },
    circle_1: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    circle_2: {
        position: 'absolute',
        width: '90%',
        height: '90%',
        borderWidth: 2,
        borderColor: 'white',
    },
});


export default ProductImageContainer