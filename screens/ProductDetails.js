import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../colors/colors';
import ProductImageContainer, { PRODUCT_IMAGE_TYPE } from '../components/ui/ProductImageContainer';
import PriceContainer from '../components/ui/PriceContainer';
import OutlinedButton from '../components/ui/OutlinedButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addToCart, removeAllFromCart } from '../store/cartproducts';


const ProductDetails = ({ route }) => {

    const dispatch = useDispatch()

    const { productId } = route.params

    const allItems = useSelector((state) => state.allItems.items)

    const cartItems = useSelector((state) => state.cartItems.items)

    const item = allItems.find(item => item.id === productId)

    const { title, description, image, price } = item

    isIdInCart = (idToCheck) => {
        // Check if the ID exists in the items array
        return cartItems.hasOwnProperty(idToCheck);
    };


    let cartTitle = 'Add to cart'
    if (isIdInCart(productId)) {
        cartTitle = 'Remove from cart'
    }

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


    return (
        <View style={styles.container}>

            <ProductImageContainer image={image} productImageType={PRODUCT_IMAGE_TYPE.PRODUCT_DETAIL_ITEM} style={styles.image} />

            <View style={[styles.overlay, styles.container1]}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.desc}>{description}</Text>
            </View>

            {/* View 2 */}
            <View style={[styles.overlay, styles.container2]}>
                <PriceContainer price={price} textStyle={{
                    fontSize: 30,
                }} dollarStyle={{
                    fontSize: 15,
                    marginLeft: 30
                }} />
                <OutlinedButton style={styles.button} title={cartTitle} onAddToCartPress={() => {
                    addProductToCart(productId)
                }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryWhite,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'blue',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    container1: {
        backgroundColor: '#F1F1F1',
        zIndex: 1, // Higher zIndex will be stacked on top
        width: '100%',
        height: '50%',
        top: '60%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.primaryWhite,
        zIndex: 2,
        width: '100%',
        height: '20%',
        top: '90%', // Adjusted to overlap by 50%
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    },

    image: {
        position: 'absolute',
        top: '20%'
    },
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 25,
        color: Colors.primaryPurple
    },

    desc: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 15,
        color: Colors.primaryPurple
    },
    button: {
        marginRight: 60,
        marginTop: 5,
        textAlign: 'center'
    }
});

export default ProductDetails;
