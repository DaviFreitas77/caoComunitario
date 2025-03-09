import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Image,  Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Context } from '../../contexto/provider';


const Post = () => {
    const navigation = useNavigation()
    const { urlApi, setNomePet, nomePet } = useContext(Context)
    const [loading, setLoading] = useState(false);
   



 

    return (
        <View style={styles.container}>
            <Image
                source={require("../../imagens/fundoPet.png")}
                style={styles.img}
            />
            <View style={{
                width: '90%', marginTop: 120

            }}>
            </View>
            <View style={styles.innerContainer}>

              
                    <Text style={styles.text}>Qual o nome do  pet?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setNomePet(text)}
                        placeholder="Digite o nome"
                        placeholderTextColor="#ccc"
                    />
             
                {nomePet === '' ? (
                    <Pressable style={styles.button}>
                        <EvilIcons name="arrow-right" size={24} color="black" />
                    </Pressable>
                ) : (
                    <Pressable onPress={() => navigation.navigate('tipoAnimal')} style={[styles.button, { backgroundColor: '#ccf3dc' }]}>
                        <EvilIcons name="arrow-right" size={24} color="black" />
                    </Pressable>
                )}

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 70,
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'relative',
    },
    innerContainer: {
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    img: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        width: "100%",
    },
    input: {
        borderBottomWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '100%',
    },
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 20,
    },
    progressBar: {
        height: 7,
        borderColor: 'white',
        marginTop: 10,
        width: '100%'
    },

    selectCuidado: {
        backgroundColor: '#ccf3dc',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 7
    },
    cuidadoSelecionado: {
        backgroundColor: 'white',
        borderColor: 'gray'
    },
    btnCamera: {
        backgroundColor: '#ccf3dc',
        padding: 80,
        borderRadius: 5
    },

});

export default Post;