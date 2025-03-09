import { StyleSheet, View, Text, FlatList, Pressable, Image, ActivityIndicator } from "react-native";

import { useContext, useEffect, useState, } from "react";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../../contexto/provider";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

export default function TodosPets() {
    const { urlApi } = useContext(Context);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(false)
    const [placeholderCount,setPlaceholderCount] = useState(3)
    const navigation = useNavigation();
    useEffect(() => {
        setLoading(true)
        const fetchPets = async () => {
            try {
                const response = await fetch(`${urlApi}/api/pets`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                setPlaceholderCount(data.length)
                setPets(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        };
        fetchPets();
    }, []);



    const renderShimmerPlaceholder =()=>{
        return(
            <View
            style={styles.card}>
            <ShimmerPlaceholder
               autoRun={true}
                style={styles.imgPet}
            />
            <View style={styles.descPet}>
                <ShimmerPlaceholder 
                autoRun={true}
                style={styles.shimmerText}
                />
                <ShimmerPlaceholder 
                autoRun={true}
                style={styles.shimmerText}
                />
            </View>
        </View>
        )
    }

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
            {loading ? (
                <FlatList
                 data={[...Array(placeholderCount)]}
                renderItem={renderShimmerPlaceholder}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
            />
            ) : (
                <FlatList
                    data={pets}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_pet}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
        justifyContent: "center",

    },
    card: {
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
        padding: 15,
        margin: 5,
        shadowColor: 'black',
        alignItems: 'center',
        flex: 1,
        maxWidth: '45%',
        margin: 10
    },
    imgPet: {
        width: '100%',
        height: 140,
        borderRadius: 10,
    },
    txtNome: {
        fontWeight: 'bold',
    },
    txtInfo: {
        color: 'gray',
        fontSize: 14,
        marginTop: 2,
    },
    descPet: {
        width: '100%',
        marginTop: 10,
    },
    shimmerText: {
        height: 20,
        width: '80%',
        marginTop: 10,
        borderRadius: 4,
      },
})