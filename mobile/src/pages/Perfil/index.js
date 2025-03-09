// App.js

import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable,Linking  } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../../contexto/provider';

const Perfil = () => {
  
  const {setAdm,imagemUser,nomeUser,numeroAdmin,emailUser} = useContext(Context)
  const navigation = useNavigation(); 

  const openGmail=()=>{
    const email = "dfreitas.developer@gmail.com"; 
    const subject = "Aplicativo Cão comunitário"; 
    const body = "Olá,"; 
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(()=>{
      alert( "O Gmail não está instalado ou não pode ser aberto no momento.")
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri:imagemUser}}
          style={styles.imgPerfil}
        />
        <View >
          <Text style={styles.nome}>{nomeUser}</Text>
          <Text style={styles.email}>{emailUser}</Text>
        </View>

      </View>

      <View style={{width:"100%",alignItems:"center",gap:50,flex:.8}}>
        <View style={styles.containerBotao}>
          <Pressable 
            onPress={()=>navigation.navigate('EditarPerfil')}
          style={styles.botao}>
            <View style={{ flexDirection: "row", gap: 10 }}>
            <FontAwesome name="user" size={24} color="black" />
              <Text style={styles.txtBotao}>Editar Perfil</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="#dfdfdf" />
          </Pressable>
          <Pressable 
          onPress={()=>navigation.navigate('Doacao')}
          style={styles.botao}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <FontAwesome name="paw" size={24} color="black" />
              <Text style={styles.txtBotao}>Faça uma doação</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="#dfdfdf" />
          </Pressable>
          <Pressable 
           onPress={()=>navigation.navigate('Sobre')}
          style={styles.botao}>
            <View style={{ flexDirection: "row", gap: 10 }}>
            <AntDesign name="exclamationcircle" size={24} color="black" />
              <Text style={styles.txtBotao}>Sobre nós</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="#dfdfdf" />
          </Pressable>
          <Pressable style={[styles.botao, { borderBottomColor: "white" }]}>
            <View style={{ flexDirection: "row", gap: 10 }}>
            <Ionicons name="notifications" size={24} color="black" />
              <Text style={styles.txtBotao}>Notificações</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="#dfdfdf" />
          </Pressable>
        </View>

        <View style={styles.containerBotao}>
          <Pressable 
          onPress={openGmail}
          style={styles.botao}>
            <View style={{ flexDirection: "row", gap: 10 }}>
            <Entypo name="message" size={24} color="black" />
              <Text style={styles.txtBotao}>Nos ajude a melhorar</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="#dfdfdf" />
          </Pressable>
          <Pressable style={styles.botao}>
            <View style={{ flexDirection: "row", gap: 10 }}>
            <AntDesign name="star" size={24} color="black" />
              <Text style={styles.txtBotao}>Avaliar aplicativo</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="#dfdfdf" />
          </Pressable>
          <Pressable
            onPress={()=>{
              navigation.navigate('Start')
              setAdm(false)
            }}
          style={[styles.botao, { borderBottomColor: "white" }]}>
            <View style={{ flexDirection: "row", gap: 10 }}>
            <MaterialIcons name="logout" size={24} color="red" />
              <Text style={styles.txtBotao}>Sair</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="#dfdfdf" />
          </Pressable>
        </View>
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
    padding: 10,
    gap: 40
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imgPerfil: {
    width: 80,
    height: 80,
    borderRadius: 50
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold"
  },
  email: {
    color: "gray"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    paddingLeft:20
  },
  containerBotao: {
    width: "90%",
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 20


  },
  botao: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 18,
    borderBottomColor: '#dfdfdf'

  },
  txtBotao: {
    fontSize: 18
  }
});

export default Perfil;