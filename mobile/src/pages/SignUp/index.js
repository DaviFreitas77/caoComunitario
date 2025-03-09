import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Toast from 'react-native-toast-message';
import Entypo from '@expo/vector-icons/Entypo';
import { TextInputMask } from 'react-native-masked-text';
import { Context } from '../../contexto/provider';

export default function SignUp() {  
    const navigation = useNavigation(); 

    const [numero, setNumero] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const{urlApi,token} = useContext(Context)
    const [mostrarSenha,setMostrarSenha] = useState(false)


   
    const showToast = (message,type) => {
        Toast.show({
          type: type, 
          text1:message,
          position: 'top', 
        });
      };


      const cadastrar = async () => {
        if(!email || !nome || !numero || !senha ){
            showToast("Preencha todos os campos",'error');
            return;
        }
        try {
            const response = await fetch(`${urlApi}/api/cadastroUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome_usuario: nome,
                    email_usuario: email,
                    senha_usuario: senha,
                    telefone_usuario: numero,
                    imagem_usuario:
                        'https://firebasestorage.googleapis.com/v0/b/caocomunitario-14068.appspot.com/o/usuario%2Ffoto.jpg?alt=media&token=9a11cf8b-5188-4d54-a30c-38e1d67b7696',
                    token: token,
                }),
            });
    
            const data = await response.json();

            if(response.status === 201){
                showToast(data.message,'success');
                setTimeout(() => {
                    navigation.replace('SignIn')
                }, 2000);
            }else {
                showToast(data.message,'error');
            }
    
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Erro de conexão',
                text2: 'Verifique sua internet e tente novamente.',
                position: 'bottom',
            });
        }
    };
    
    return (
        <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={20}
        >


            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <TouchableOpacity
                onPress={() => navigation.navigate('Start')}
                style={{ width: "90%", marginHorizontal:10,
                    height:90,justifyContent:"flex-end"
                }}
                >
                <Toast/>
                <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
            <Image
                source={require('../../imagens/start/dog.png')}
                style={styles.imgDog}
            />
                <View style={styles.containerLogin}>
                    <View style={styles.inputsContainer}>
                        <TextInput
                            placeholder='Digite seu nome'
                            onChangeText={(text) => setNome(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Digite seu melhor email'
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Digite sua senha'
                            onChangeText={(text) => setSenha(text)}
                            style={styles.input}
                            secureTextEntry={!mostrarSenha}
                           
                        />
                        
                        <TouchableOpacity 
                        onPress={()=>setMostrarSenha(!mostrarSenha)}
                        style={styles.eye}>
                            
                            <Entypo  name={mostrarSenha ? "eye":"eye-with-line"} size={24} color="black" />
                        </TouchableOpacity>
                        <TextInputMask
                         type={'cel-phone'}
                         options={{
                           maskType:'BRL',
                           withDDD: true,
                           dddMask:'(99)'
                         }}
                            placeholder='Digite seu número/whatsapp'
                            onChangeText={(text) => setNumero(text)}
                            value={numero}
                            style={styles.input}
                            keyboardType='number-pad'
                        />

                        <TouchableOpacity
                        onPress={cadastrar}
                        style={styles.botao}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Cadastrar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <StatusBar style="auto" />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccf3dc',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    containerLogin: {
        backgroundColor: "#fff",
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    inputsContainer: {
        width: "100%",
        alignItems: "center",
        gap: 15,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccf3dc',
        padding: 10,
        paddingLeft: 15,
        width: '80%',
    },
    botao: {
        backgroundColor: '#ccf3dc',
        padding: 20,
        width: '80%',
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
    },
    imgDog: {
        width: 300,
    

    },
    eye:{
        position:"absolute",
        top:120,
        right: 60,
    }
});
