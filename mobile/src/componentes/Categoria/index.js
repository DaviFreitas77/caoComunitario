import React, { useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Context } from '../../contexto/provider';
import { useNavigation } from '@react-navigation/native';


const Categoria = () => {

    const navigation = useNavigation()
    const { urlApi } = useContext(Context)
    const [pets, setPets] = useState([]);
    const [botaoFiltro, setBotaoFiltro] = useState('')
    const corOriginal = '#dfdfdfdf';
    const corAtivada = '#ccf3dc'

    const filtroAtivo = (item) => {
        setBotaoFiltro(item)
    }

    const getFilteredPets = () => {
        return botaoFiltro ? pets.filter((pet) => pet.desc_tipo_pet === botaoFiltro)
            : pets;

    };


    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(`${urlApi}/api/pets`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();

                setPets(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPets();
    }, []);


    const renderItem = ({ item }) => {
        return (
            <Pressable

                onPress={() => navigation.navigate('PetInfo', { pet: item })}
                style={styles.card}>
                <Image
                    source={{ uri: item.imagem_pet }}
                    style={styles.imgPet}
                />
                <View style={styles.descPet}>
                    <Text style={styles.txtNome}>{item.nome_pet}</Text>
                    <Text style={styles.txtInfo}>{item.desc_tipo_pet}</Text>
                </View>

            </Pressable>
        );
    };
    return (

        <View style={styles.container}>
            <View style={styles.containerCategorias}>
                <Text style={styles.txtCtegoria}>
                    Categorias
                </Text>
                <View style={styles.containerBotaoFiltro}>
                    <Pressable
                        onPress={() => filtroAtivo('Cachorro')}
                        style={[styles.botaoFiltro, { backgroundColor: botaoFiltro === 'Cachorro' ? corAtivada : corOriginal }]}>
                        <Image
                            source={require("../../imagens/inicioUser/cachorro.jpg")}
                            style={styles.imgBotaoFiltro}
                        />
                        <Text>Cachorro</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => filtroAtivo('Gato')}
                        style={[styles.botaoFiltro, { backgroundColor: botaoFiltro === 'Gato' ? corAtivada : corOriginal }]}>
                        <Image
                            source={require("../../imagens/inicioUser/gato.jpg")}
                            style={styles.imgBotaoFiltro}
                        />
                        <Text>Gato</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('TodosPets')}
                        style={[styles.botaoFiltro]}>
                        <Image
                            source={require("../../imagens/inicioUser/todos.jpg")}
                            style={styles.imgBotaoFiltro}
                        />
                        <Text>Todos</Text>
                    </Pressable>
                </View>
            </View>

            <FlatList
                data={getFilteredPets()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_pet.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

        </View>

    );
};

const styles = StyleSheet.create({
    container: {


    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    containerCategorias: {
        width: "90%",
        flex: .1,
        gap: 20
    },
    txtCtegoria: {

        fontSize: 22,
        marginBottom: 10,
    },
    containerBotaoFiltro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10
    },
    botaoFiltro: {
        backgroundColor: "#dfdfdfdf",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10

    },
    imgBotaoFiltro: {
        width: 30,
        height: 30,
        borderRadius: 20
    },
    card: {
        backgroundColor: '#dfdfdfdf',
        borderRadius: 10,
        padding: 15,
        marginRight: 15,
        shadowColor: '#000',
        alignItems: "center",
        marginTop: 20,
        marginBottom: 80,


    },
    imgPet: {
        width: 210,
        height: 210,
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
    descPet: {
        width: "100%"
    }

});

export default Categoria;
