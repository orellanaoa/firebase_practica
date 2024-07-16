// Importación de bibliotecas y componentes necesarios
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { signOut } from 'firebase/auth'; // Importa la función de cerrar sesión de Firebase
import { auth, database } from '../config/firebase'; // Importa la configuración de la base de datos de Firebase
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; // Importa funciones de Firestore para consultas en tiempo real
import CardProductos from '../components/CardProductos'; // Importa el componente de tarjeta de producto

// Definición del componente principal Home
const Home = ({ navigation }) => {
    // Definición del estado local para almacenar los productos
    const [productos, setProductos] = useState([]);

    // useEffect se ejecuta cuando el componente se monta
    useEffect(() => {
        // Define una consulta a la colección 'productos' en Firestore, ordenada por el campo 'creado' en orden descendente
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));
        
        // Escucha cambios en la consulta de Firestore en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                // Empuja cada documento con su ID a la lista de docs
                docs.push({ id: doc.id, ...doc.data() });
            });
            // Actualiza el estado de productos con los datos recibidos
            setProductos(docs);
        });

        // Limpieza de la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    // Función para navegar a la pantalla 'Add'
    const goToAdd = () => { 
        navigation.navigate('Add');
    };

    // Función para cerrar la sesión y navegar a la pantalla de inicio de sesión
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.replace('Login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Función que renderiza cada item de la lista
    const renderItem = ({ item }) => (
        <CardProductos
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            vendido={item.vendido}
            imagen={item.imagen}
        />
    );

    // Renderiza la interfaz del componente Home
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Productos Disponibles</Text>

            {/* Muestra la lista de productos si hay elementos, de lo contrario muestra un mensaje */}
            {
                productos.length !== 0 ?
                <FlatList
                    data={productos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
                : 
                <Text style={styles.Subtitle}>No hay productos disponibles</Text>
            }

            {/* Botones para agregar producto y cerrar sesión */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={goToAdd}>
                    <Text style={styles.ButtonText}>Agregar Producto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Button2}
                    onPress={handleLogout}>
                    <Text style={styles.ButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos para el componente Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    Subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#ff9800',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 30,
    },
    Button: {
        backgroundColor: '#0288d1',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        paddingVertical: 20,
    },
    Button2: {
        backgroundColor: '#0D1F2D',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        paddingVertical: 20,
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flexGrow: 1,
    },
});

// Exporta el componente Home como predeterminado
export default Home;