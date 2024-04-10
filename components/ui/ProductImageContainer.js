import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'

function ProductImageContainer({ bgColor, image }) {
    return (
        <View style={styles.container}>
            <View style={styles.circlesContainer}>
                <View style={[styles.circle_1, { backgroundColor: bgColor }]} />
                <View style={[styles.circle_2, { backgroundColor: bgColor }]} />
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

const BASE_SIZE = 100

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
        width: 60, // Increase size to extend beyond circles
        height: 60, // Increase size to extend beyond circles
        top: 35,
        left: 35
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