// CustomFlecha.js

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomFlecha = ({ onPress, style, iconStyle }) => {
    const navigation = useNavigation(); 

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity style={[styles.backButton, style]} onPress={handlePress}>
            <MaterialIcons name="arrow-back" size={24} style={[styles.icon, iconStyle]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
        borderWidth: 0,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        padding: 10,
    },
    icon: {
        color: '#000',
    },
});

export default CustomFlecha;
