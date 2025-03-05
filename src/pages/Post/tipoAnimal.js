// App.js

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Context } from '../../contexto/provider';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import Picker from 'react-native-picker-select';

const TipoAnimal = () => {
    const navigation = useNavigation()
    const { urlApi, nomePet, setTipoPet, tipoPet } = useContext(Context)
    const [tipo, setTipo] = useState([])


    useEffect(() => {
        const fetchTipo = async () => {
            try {
                const response = await fetch(`${urlApi}/api/tipoPet`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const data = await response.json();
                setTipo(data)

            } catch (error) {
                console.log(error)
            }

        }
        fetchTipo()
    }, [])

    const pickerItems = tipo.map(g => ({
        label: g.desc_tipo_pet,
        value: g.id_tipo,
    }));

    console.log(tipoPet)


    return (
        <View style={styles.container}>
            <Image
                source={require("../../imagens/fundoPet.png")}
                style={styles.img}
            />

            <View style={styles.innerContainer}>
                <Text style={styles.text}>Que Animal é {nomePet}?</Text>
                {tipo.length > 0 ? (
                    <Picker
                        placeholder={{
                            label: "selecione",
                            value: null,
                        }}
                        selectedValue={tipoPet}
                        onValueChange={(itemValue) => setTipoPet(itemValue)}
                        items={pickerItems} 
                    ></Picker>
                ) : (
                    <Text> Aguarde, buscando os tipos de pets...</Text>
                )}

                {tipoPet === null ? (
                    <Pressable style={styles.button}>
                        <EvilIcons name="arrow-right" size={24} color="black" />
                    </Pressable>
                ) : (
                    <Pressable onPress={() => navigation.navigate('IdadePet')} style={[styles.button, { backgroundColor: '#ccf3dc' }]}>
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
});

export default TipoAnimal;