import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../../colors/colors"

function PriceContainer({ price }) {
    return (
        <View style={styles.priceContainer}>
            <Text style={styles.dollar}>$</Text>
            <Text style={styles.price}>{price}</Text>
        </View>
    )
}

export default PriceContainer

const styles = StyleSheet.create({
    priceContainer: {
        marginTop: 10,
        flexDirection: 'row',
    },
    dollar: {
        fontSize: 10,
        paddingRight: 3,
        fontWeight: 'bold',
        color: Colors.primaryPurple
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryPurple
    }
})