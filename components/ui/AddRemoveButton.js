import { TouchableHighlight, StyleSheet, Text } from 'react-native'

const ADD_REMOVE = {
    ADD: 'add',
    REMOVE: 'remove'
}

function AddRemoveButton({ onItemAdded, onItemRemoved, buttonType, color }) {
    let { action, buttonSign } = getAddRemoveButtonSign(buttonType, onItemAdded, onItemRemoved)
    return (
        <TouchableHighlight onPress={() => action()} style={[styles.buttonContainer, {
            backgroundColor: color
        }]}>
            <Text>{buttonSign}</Text>
        </TouchableHighlight>
    )
}

export default AddRemoveButton

const styles = StyleSheet.create({
    buttonContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
})

export function getAddRemoveButtonSign(buttonType, onItemAdded, onItemRemoved) {
    let buttonSign
    let action
    if (buttonType == ADD_REMOVE.ADD) {
        buttonSign = '+'
        action = onItemAdded
    } else {
        buttonSign = '-'
        action = onItemRemoved
    }
    return { action, buttonSign }
}
