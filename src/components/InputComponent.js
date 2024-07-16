// Importación de bibliotecas y componentes necesarios
import React from 'react';
import { TextInput, StyleSheet} from 'react-native';

const InputComponent = ({ value, onChangeText, placeholder, secureTextEntry = false, keyboardType, autoCapitalize }) => {
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 1,
    },
});


export default InputComponent;
