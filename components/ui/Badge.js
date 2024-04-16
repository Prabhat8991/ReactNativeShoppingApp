import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Colors } from '../../colors/colors'

function Badge() {

    const cartItems = useSelector((state) => state.cartItems.items)

    let totalQuantity = 0;

    Object.keys(cartItems).forEach((key) => {
        const item = cartItems[key];
        totalQuantity += item.quantity;
    });


    return (<View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{totalQuantity}</Text>
    </View>)
}

export default Badge

const styles = StyleSheet.create({
    badgeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'red',
        position: 'absolute',
        top: -15,
        left: 30
    },
    badgeText: {
        textAlign: 'center',
        color: Colors.primaryWhite
    }
})