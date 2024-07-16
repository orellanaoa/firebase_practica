import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import InputComponent from '../components/InputComponent'; 
import CustomFlecha from '../components/ButtonBack';
import { validateName, validatePhone, validatePassword } from '../utils/Validation';

const Register = ({ navigation }) => {
    const initialUserState = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    };

    const [user, setUser] = useState(initialUserState);

    const handleRegister = async () => {
        const { firstName, lastName, phone, email, password } = user;

        if (!validateName(firstName)) {
            Alert.alert('Error', 'El nombre solo puede contener letras.');
            return;
        }

        if (!validateName(lastName)) {
            Alert.alert('Error', 'El apellido solo puede contener letras.');
            return;
        }

        if (!validatePhone(phone)) {
            Alert.alert('Error', 'El número de teléfono debe tener 8 dígitos.');
            return;
        }

        if (!validatePassword(password)) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = userCredential.user;

            await addDoc(collection(database, 'Usuarios'), {
                uid: currentUser.uid,
                firstName,
                lastName,
                phone,
                email,
            });

            Alert.alert('Cuenta creada', 'La cuenta se creó correctamente', [
                { text: 'Ok', onPress: () => navigation.navigate('Login') },
            ]);
        } catch (error) {
            console.log(error);
            let errorMessage = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
            if (error.code === 'auth/network-request-failed') {
                errorMessage = 'Error de red. Por favor, verifica tu conexión a Internet.';
            }
            Alert.alert('Error', errorMessage);
        }
    };

    const clearInputs = () => {
        setUser(initialUserState);
    };

    const handleBackToLogin = () => {
        clearInputs();
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <CustomFlecha onPress={handleBackToLogin} />
                <Text style={styles.title}>Registrar</Text>
                <Text style={styles.label}>Nombre:</Text>
                <InputComponent
                    value={user.firstName}
                    onChangeText={text => setUser({ ...user, firstName: text })}
                    placeholder="Nombre"
                />
                <Text style={styles.label}>Apellido:</Text>
                <InputComponent
                    value={user.lastName}
                    onChangeText={text => setUser({ ...user, lastName: text })}
                    placeholder="Apellido"
                />
                <Text style={styles.label}>Teléfono:</Text>
                <InputComponent
                    value={user.phone}
                    onChangeText={text => setUser({ ...user, phone: text })}
                    keyboardType="phone-pad"
                    placeholder="Teléfono"
                />
                <Text style={styles.label}>Correo electrónico:</Text>
                <InputComponent
                    value={user.email}
                    onChangeText={text => setUser({ ...user, email: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Correo electrónico"
                />
                <Text style={styles.label}>Contraseña:</Text>
                <InputComponent
                    value={user.password}
                    onChangeText={text => setUser({ ...user, password: text })}
                    placeholder="Contraseña"
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrar cuenta</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
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
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: '#ddd',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    }
});

export default Register;
