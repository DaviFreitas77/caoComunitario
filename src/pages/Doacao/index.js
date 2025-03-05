import { useContext } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Context } from "../../contexto/provider";
import { useState } from "react";
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

const Doacao = () => {
const { nomeUser, adm } = useContext(Context);
const [copiedText, setCopiedText] = useState('');

const copyToClipboard = async () => {
    await Clipboard.setStringAsync('317f7541-b8be-4fd5-b20d-3cd110c896a8');
    showToast();
};


const showToast = () => {
    Toast.show({
      type: 'success', 
      text1: 'pix copiado com sucesso!',
      position: 'bottom', 
    });
  };

return (
    <View style={styles.container}>
    
        <Image
                source={require("../../imagens/fundoPet.png")}
                style={styles.img}
            />
    <View style={styles.containerQr}>
    <Text style={styles.txt}>Faça uma doação</Text>
        <Image  style={styles.imgQr} source={require('../../imagens/qrcode.png')} />
        <Text style={styles.txt}>Leia o Qr code</Text>
        <TouchableOpacity 
        onPress={copyToClipboard }
        style={styles.btn}>
            <Text style={styles.txtBtn}>Copiar link</Text>
        </TouchableOpacity>
        <Toast />
    </View>
    
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
containerQr: {
    backgroundColor: '#1E1E2C',
    width: "100%",
    height: 600, 
    position: 'absolute',
    bottom: 0, 
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap:40,

},
txt:{
    fontSize:22,
    color:'#ccf3dc',
    fontWeight:'500'
},
btn:{
    backgroundColor:"#ccf3dc",
    width:'80%',
    padding:15,
    borderRadius:5

},
txtBtn:{
    textAlign:"center",
    fontSize:18
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
imgQr:{
    borderRadius:8
}

});

export default Doacao;
