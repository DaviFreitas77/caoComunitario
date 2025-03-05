// App.js

import React, { useContext, useEffect, useState,useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable,TextInput  } from 'react-native';
import { Context } from '../../contexto/provider';
import RNPickerSelect from 'react-native-picker-select';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

const RacaPet = () => {
    const navigation = useNavigation()
    const { urlApi, nomePet, setRacaPet } = useContext(Context)
    
   

   
    return (
        <View style={styles.container}>
            <Image
                source={require("../../imagens/fundoPet.png")}
                style={styles.img}
            />
            <View style={styles.innerContainer}>
          
            <Text style={styles.text}>{nomePet} tem alguma raça?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a raça ou deixe em branco"
                    placeholderTextColor="#ccc"
                    onChangeText={(text) => setRacaPet(text)}
                />
           
            <Pressable onPress={()=>navigation.navigate('CuidadoPet')} style={[styles.button, { backgroundColor: '#ccf3dc' }]}>
                    <EvilIcons name="arrow-right" size={24} color="black" />
                </Pressable>

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
    input: {
        borderBottomWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '100%',
    },
});

export default RacaPet;