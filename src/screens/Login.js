// Importación de bibliotecas y componentes necesarios
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import InputComponent from '../components/InputComponent';

// Definición del componente Login
const Login = ({ navigation }) => {
    // Definición del estado local para almacenar los valores de los campos de entrada
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        // Usar Firebase Authentication para iniciar sesión con el correo y contraseña
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Inicio de sesión exitoso
                const user = userCredential.user;
                navigation.replace('Home');
                Alert.alert("Autenticado");
            })
            .catch((error) => {
                // Error al iniciar sesión
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert('Error', errorMessage);
            });
    };

    const handleCreate = () => {
        navigation.replace('Register');
    }

    // Renderiza la interfaz del componente Login
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <InputComponent
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Email"
            />
            <InputComponent
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Contraseña"
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={handleCreate}>
                <Text style={[styles.buttonText, styles.registerButtonText]}>Registrar cuenta</Text>
            </TouchableOpacity>
        </View>
    );
};

// Exporta el componente Login como predeterminado
export default Login;

// Estilos para el componente Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
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
    button: {
        backgroundColor: '#0288d1',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: 'white',
        borderColor: '#0288d1',
        borderWidth: 2,
        marginTop: 10,
    },
    registerButtonText: {
        color: '#0288d1',
    },
});
