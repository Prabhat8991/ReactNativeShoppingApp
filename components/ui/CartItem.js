import { View, StyleSheet, Text } from "react-native"
import ProductImageContainer, { PRODUCT_IMAGE_TYPE } from "./ProductImageContainer"
import PriceContainer from "./PriceContainer"
import AddRemoveButton from "./AddRemoveButton"
import { Colors } from "../../colors/colors"

function CartItem({ id, image, price, title, quantity, onItemAdded, onItemRemoved }) {

    return (
        <View style={[styles.cartItemContainer]}>
            <ProductImageContainer id={id} image={image} productImageType={PRODUCT_IMAGE_TYPE.CART_ITEM} style={{
                marginHorizontal: 20
            }} />
            <View style={styles.cartItemDescContainer}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <PriceContainer price={price} />
            </View>
            <View style={styles.addRemoveContainer}>
                <AddRemoveButton buttonType='remove' color={Colors.primaryGray} onItemAdded={onItemAdded} onItemRemoved={onItemRemoved} />
                <Text style={{
                    marginVertical: 5
                }}>{quantity}</Text>
                <AddRemoveButton buttonType='add' color={Colors.primaryBlue} onItemAdded={onItemAdded} onItemRemoved={onItemRemoved} />
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItemContainer: {
        backgroundColor: Colors.primaryWhite,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        marginHorizontal: 20,
        marginVertical: 20,
        elevation: 10,
        borderColor: Colors.primaryPurple
    },
    addRemoveContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    button: {
        padding: 5,
        elevation: 10
    },
    cartItemDescContainer: {
        justifyContent: 'center',
    },
    title: {
        marginTop: 10,
        fontSize: 12,
        width: 80,
        textAlign: 'center',
    },
})

