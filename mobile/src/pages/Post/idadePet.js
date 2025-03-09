// App.js

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Context } from '../../contexto/provider';
import RNPickerSelect from 'react-native-picker-select';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

const IdadePet = () => {
    const navigation = useNavigation()
    const { urlApi, nomePet,setIdadePet,idadePet,setGeneroPet,generoPet } = useContext(Context)

    const [idade, setIdade] = useState([])

    const [genero, setGenero] = useState([])

    useEffect(() => {
        const fetchIdade = async () => {
            try {
                const response = await fetch(`${urlApi}/api/idade`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const data = await response.json();

                setIdade(data)

            } catch (error) {
                console.log(error)
            }
        }
        const fetchGenero = async () => {
            try {
                const response = await fetch(`${urlApi}/api/genero`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const data = await response.json();
                setGenero(data)

            } catch (error) {
                console.log(error)
            }

        }
        fetchIdade()
        fetchGenero()
    }, [])

    return (
        <View style={styles.container}>
            <Image
                source={require("../../imagens/fundoPet.png")}
                style={styles.img}
            />


                <View style={{ width: "100%", alignItems: "center", gap: 20 }}>

                    <View style={styles.innerContainer}>
                        <Text style={styles.text}>Qual a idade de {nomePet}?</Text>

                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecione',
                                value: null,
                            }}
                            onValueChange={(value) => setIdadePet(value)}
                            items={idade.map(g => ({
                                label: g.desc_idade,
                                value: g.id_idade,
                            }))}

                        />

                    </View>

                    <View style={styles.innerContainer}>
                        <Text style={styles.text}>Qual gênero de  {nomePet}?</Text>

                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecione',
                                value: null,
                            }}
                            onValueChange={(value) => setGeneroPet(value)}
                            items={genero.map(g => ({
                                label: g.desc_genero,
                                value: g.id_genero,
                            }))}

                        />

                    </View>
                    {(generoPet && idadePet) === null ? (
                        <Pressable style={styles.button}>
                            <EvilIcons name="arrow-right" size={24} color="black" />
                        </Pressable>
                    ) : (
                        <Pressable onPress={()=>navigation.navigate('RacaPet')} style={[styles.button, { backgroundColor: 'white' }]}>
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

export default IdadePet;