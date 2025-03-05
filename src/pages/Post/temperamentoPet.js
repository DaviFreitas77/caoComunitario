// App.js

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Context } from '../../contexto/provider';
import RNPickerSelect from 'react-native-picker-select';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

const TemperamentoPet = () => {
    const navigation = useNavigation()
    const { urlApi, nomePet,setTemperamentoPet,temperamentoPet } = useContext(Context)

    const [arrayTemperamento, setArrayTemperamento] = useState([])
  


    const handleTempePress = (item) => {
        if (temperamentoPet.includes(item.id_temperamento)) {
            setTemperamentoPet(temperamentoPet.filter(temperamento => temperamento !== item.id_temperamento));
        } else {
            setTemperamentoPet([...temperamentoPet, item.id_temperamento]);
        }
    };


    useEffect(() => {
        const fetchTemperamento = async () => {
            try {
                const response = await fetch(`${urlApi}/api/temperamento`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()
                setArrayTemperamento(data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchTemperamento()
    }, [])

    return (
        <View style={styles.container}>
            <Image
                source={require("../../imagens/fundoPet.png")}
                style={styles.img}
            />

                <View style={styles.innerContainer}>
                    <Text style={styles.text}>temperamento de {nomePet}</Text>
                    <View style={styles.containerBtnCuidado}>

                        {arrayTemperamento.map((item, index) => (
                            <View key={index}>
                                <Pressable
                                    onPress={() => handleTempePress(item)}
                                    style={[
                                        styles.selectCuidado,
                                        temperamentoPet.includes(item.id_temperamento) ? styles.cuidadoSelecionado : null,
                                    ]}
                                >
                                    <Text>
                                        {item.desc_temperamento}
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </View>
                    {temperamentoPet.length === 0 ? (
                        <Pressable style={[styles.button, { backgroundColor: '#dfdfdf' }]}>
                            <EvilIcons name="arrow-right" size={24} color="black" />
                        </Pressable>

                    ) : (
                        <Pressable onPress={()=>navigation.navigate("ImagemPet")} style={[styles.button, { backgroundColor: '#ccf3dc' }]}>
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

export default TemperamentoPet;