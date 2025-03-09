// App.js

import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import { Context } from '../../contexto/provider';
import RNPickerSelect from 'react-native-picker-select';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../service/conexaoFirebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalPetCadastrado from '../../componentes/Modal';
import * as Notifications from 'expo-notifications';


const SobrePet = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
    const { urlApi, nomePet, generoPet, idadePet, tipoPet, racaPet, cuidadoPet, temperamentoPet, setGeneroPet, setIdadePet, setRacaPet, setCuidadoPet, setTemperamentoPet, setNomePet, urlImage, setUrlImage,setImage,image } = useContext(Context)
    const [sobrePet, setSobrePet] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    
   
    const sendNotificationToUser = async (message) => {
        try {
            const response = await fetch(`${urlApi}/api/notificacao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,  
                }),
            });
    
            const data = await response.json();
          
        } catch (error) {
            console.error('Erro ao enviar notificação:', error);
        }
    };
  


    const fecharModal = () => {
        setModalVisible(false);
    };

    const cadastrarPet = async () => {
        try {
            const response = await fetch(`${urlApi}/api/cadastroPet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomePet: nomePet,
                    tipoPet: tipoPet,
                    idadePet: idadePet,
                    generoPet: generoPet,
                    racaPet: racaPet,
                    cuidadoPet: cuidadoPet,
                    temperamentoPet: temperamentoPet,
                    imagemPet: urlImage,
                    sobrePet: sobrePet,
                })
            });




            const data = await response.json();
            console.log('Pet cadastrado com sucesso:', data);
            sendNotificationToUser('Você tem um novo pet disponivel para adoção');
            setModalVisible(true);
            setNomePet('')
            setGeneroPet('')
            setImage('')
            setIdadePet('')
            setRacaPet('')
            setCuidadoPet('')
            setTemperamentoPet('')
            setUrlImage('')
            setSobrePet('')


        } catch (error) {
            console.error('Erro ao cadastrar o pet:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../imagens/fundoPet.png")}
                style={styles.img}
            />

            <View style={styles.innerContainer}>
                <View style={styles.containerBtnCuidado}>


                        <Image
                            source={{ uri: urlImage }}
                            style={styles.image}
                        />
                   
                    <Text style={styles.text}>Escreva sobre {nomePet}</Text>

                    <View>
                        <TextInput
                            placeholder='Digite...'
                            style={styles.input}
                            onChangeText={(text) => setSobrePet(text)}
                            multiline={true}
                            textAlignVertical="top"
                            maxLength={500}
                        />


                    </View>

                </View>
                {sobrePet === '' ? (
                    <Pressable style={[styles.button, { backgroundColor: '#dfdfdf' }]}>
                        <EvilIcons name="arrow-right" size={24} color="black" />
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={cadastrarPet}
                        style={[styles.button, { backgroundColor: '#ccf3dc' }]}>
                        <EvilIcons name="arrow-right" size={24} color="black" />
                    </Pressable>
                )}

            </View>
            <ModalPetCadastrado isVisible={modalVisible} onClose={fecharModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        justifyContent: "center",
        borderRadius: 10,
        padding: 20,
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
    image: {
        width: 400,
        height: 400,
        borderRadius: 5,
        marginTop: 40
    },
    btnCamera: {
        backgroundColor: '#ccf3dc',
        padding: 80,
        borderRadius: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        paddingLeft: 10,
        fontSize: 18,
        height: 150,
        paddingRight: 10
    }
});

export default SobrePet;