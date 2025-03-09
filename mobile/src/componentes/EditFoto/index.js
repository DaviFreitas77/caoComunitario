import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { storage } from '../../service/conexaoFirebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Context } from '../../contexto/provider';
export default function EditImage() {
    const { imagemUser, idUser, urlApi, setImagemUser, idAdm, adm,setImagemAdm,imagemAdm} = useContext(Context);

    

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissões para acessar a galeria.');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });



            if (!result.canceled) {
                const url = await uploadImage(result.assets[0].uri);

                if (url) {

                    try {
                        const response = await fetch(`${urlApi}/api/atualizar`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                adm === true ? {
                                idAdm: idAdm,
                                urlImagem: url
                            } : {
                                id: idUser,
                                urlImagem: url
                            }
                    
                  )
                    });

                    const data = await response.json();
                    adm === true ? setImagemAdm(url) : setImagemUser(url);

                } catch (error) {
                    console.log(error);
                }
            }
        }
        } catch (error) {
        console.error("Erro ao escolher a imagem:", error);

    }
};

const uploadImage = async (uri) => {
    try {
        const filename = uri.split('/').pop();
        const storageRef = ref(storage, `images/${filename}`);
        const response = await fetch(uri);
        if (!response.ok) throw new Error('Falha ao buscar imagem');
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        return null;
    }
};

return (
    <View style={styles.container}>
        <View>
           {adm === true ?(

               <Image
                   source={{ uri: imagemAdm }}
                   style={styles.imgPerfil}
               />
           ):(
            <Image
            source={{ uri: imagemUser }}
            style={styles.imgPerfil}
        />
           )}
            <Pressable
                onPress={pickImage}
                style={styles.iconCamera}>
                <MaterialCommunityIcons name="camera-plus" size={20} color="black" />
            </Pressable>
        </View>

    </View>
);
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    imgPerfil: {
        width: 120,
        height: 120,
        borderRadius: 80,
    },
    iconCamera: {
        position: "absolute",
        top: 70,
        left: 100,
        backgroundColor: "#ccf3dc",
        padding: 5,
        borderRadius: 40,
    },
});
