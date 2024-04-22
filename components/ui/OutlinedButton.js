import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Colors } from '../../colors/colors'

function OutlinedButton({ title, onAddToCartPress, style }) {
    return (
        <View style={[styles.cartParentContainer, style]}>
            <TouchableOpacity style={styles.cartContainer} onPress={() => {
                onAddToCartPress()
            }}>
                <Text style={styles.cartButton}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OutlinedButton

const styles = StyleSheet.create({
    cartParentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 80,
        height: 50
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
})