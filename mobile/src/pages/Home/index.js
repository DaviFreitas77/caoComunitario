import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, FlatList } from 'react-native';

import { Context } from '../../contexto/provider';
import Header from '../../componentes/Header';
import Categoria from '../../componentes/Categoria';

export default function Inicio() {
    const { imagemUser, nomeUser } = useContext(Context)

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 18, color: 'gray' }}>Olá,</Text>
                    <Text style={{ fontSize: 22 }}>{nomeUser}</Text>
                </View>
                <Image
                    source={{ uri: imagemUser }}
                    style={styles.imgPerfil}
                />
            </View>


            <Header />

            <View style={styles.cat}>
                <Categoria />
            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 55,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    imgPerfil: {
        width: 50,
        height: 50,
        borderRadius: 40,
    },
    searchContainer: {
        width: "100%",
        marginBottom: 20,
    },
    input: {
        padding: 10,
        width: "100%",
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderRadius: 10,
        paddingLeft: 40,
    },
    iconSearch: {
        position: "absolute",
        top: 10,
        left: 10,
    },
    wrapper: {
        height: 250,
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationStyle: {
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    card: {
        backgroundColor: '#ccf3dc',
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
        shadowColor: '#000',
        alignItems:"center",
        marginTop:20

    },
    imgPet: {
        width: 170,
        height: 170,
        borderRadius: 10,
    },
    txtNome: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 5,
    },
    txtInfo: {
        color: 'gray',
        fontSize: 14,
        marginTop: 2,
    },
    descPet:{

        width:"100%"
    }
});
