import { View, Switch, Settings, StyleSheet, Text } from 'react-native'
import { useState, useContext } from 'react'
import { ThemeContext } from '../theme/ThemeContext';

function SettingsScreen() {
    const [isEnabled, setEnabled] = useState(false)

    const { appTheme, toggleTheme } = useContext(ThemeContext);


    function toggleSwitch() {
        setEnabled(!isEnabled)
        toggleTheme()
    }

    return (
        <View style={{ flex: 1, backgroundColor: appTheme.backgroundColor }}>
            <View style={[styles.container, { backgroundColor: appTheme.backgroundColor }]}>
                <Text style={{ color: appTheme.textColor }}>Change Theme</Text>
                <Switch trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f4f3f4' : '#000000'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                        toggleSwitch()
                    }}
                    value={isEnabled} />
            </View>
        </View>)
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})