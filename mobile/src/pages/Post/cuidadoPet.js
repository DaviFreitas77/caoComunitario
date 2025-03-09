// App.js

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Context } from '../../contexto/provider';
import RNPickerSelect from 'react-native-picker-select';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

const CuidadoPet = () => {
    const navigation = useNavigation()
    const { urlApi, nomePet, setCuidadoPet, cuidadoPet } = useContext(Context)

    const [arrayCuidado, setArrayCuidado] = useState([])


    const handleCuidadoPress = (item) => {
        if (cuidadoPet.includes(item.id_cuidado)) {
            setCuidadoPet(cuidadoPet.filter(cuidado => cuidado !== item.id_cuidado));
        } else {
            // Caso contrário, adiciona-o
            setCuidadoPet([...cuidadoPet, item.id_cuidado]);
        }
    }


    useEffect(() => {
        const fetchCuidados = async () => {
            try {
                const response = await fetch(`${urlApi}/api/cuidado`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const data = await response.json()
                setArrayCuidado(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCuidados()
    }, [])

    return (
        <View style={styles.container}>
            <Image
                source={require("../../imagens/fundoPet.png")}
                style={styles.img}
            />


            <View style={styles.innerContainer}>
                <Text style={styles.text}>Cuidados veterinarios de {nomePet}</Text>
                <View style={styles.containerBtnCuidado}>

                    {arrayCuidado.map((item, index) => (
                        <View key={index}>
                            <Pressable
                                onPress={() => handleCuidadoPress(item)}
                                style={[
                                    styles.selectCuidado,
                                    cuidadoPet.includes(item.id_cuidado) ? styles.cuidadoSelecionado : null,
                                ]}
                            >
                                <Text>
                                    {item.desc_cuidado}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
                {cuidadoPet.length === 0 ? (
                    <Pressable style={[styles.button, { backgroundColor: '#dfdfdf' }]}>
                        <EvilIcons name="arrow-right" size={24} color="black" />
                    </Pressable>

                ) : (
                    <Pressable onPress={() => navigation.navigate("TemperamentoPet")} style={[styles.button, { backgroundColor: '#ccf3dc' }]}>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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
    innerContainer: {
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 20,
        width: '90%',
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
    containerBtnCuidado: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
        alignItems: "center",
        justifyContent: 'center',

    },
});

export default CuidadoPet;