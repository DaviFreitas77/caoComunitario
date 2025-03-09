import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from 'react';
import { Context } from '../../contexto/provider';
import * as Notifications from 'expo-notifications';


export default function Start() {
    const navigation = useNavigation();
       const { setToken, token } = useContext(Context)

       useEffect(() => {
        const getPermission = async () => {
          try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
              const token = await Notifications.getExpoPushTokenAsync();
              setToken(token.data);
            } else {
              console.log('Permissão para notificações negada!');
            }
          } catch (error) {
            console.error('Erro ao obter token:', error);
          }
        };
        getPermission();
      }, []);
    
    console.log(token)
    return (
        <View style={styles.container}>
            <View style={styles.ViewRedonda}>
                <Image
                    source={require('../../imagens/start/dog.png')}
                    style={styles.imgDog}
                />
            </View>
            <View style={styles.containerTitulo}>

                <Image
                    source={require('../../imagens/start/comunitario.png')}
                    style={styles.logo}
                />

                <View style={styles.containerBotao}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn')}
                        style={styles.botao}>
                        <Text style={styles.txtBotao}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.botao}>
                        <Text style={styles.txtBotao}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    ViewRedonda: {
        backgroundColor: "#ccf3dc",
        flex: .6,
        width: '100%',
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        alignItems: "center",
        justifyContent: "flex-end",
        overflow: 'hidden',
    },
    imgDog: {
        width: 450,
        height: 450,
        position: 'absolute',
    },
    titulo: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    containerTitulo: {
        alignItems: "center",
        flex: .4,
        justifyContent: 'space-around',
        width: "100%"
    },
    logo: {
        width: 310,
        height: 120
    },
    containerBotao: {
        width: "100%",
        gap: 10,
        alignItems: "center",
        paddingBottom: 10
    },
    botao: {
        backgroundColor: "#ccf3dc",
        width: '80%',
        alignItems: "center",
        padding: 20,
        borderRadius: 10
    },
    txtBotao: {
        fontWeight: 'bold',
        fontSize: 17,
    }
});