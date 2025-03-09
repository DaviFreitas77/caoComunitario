import React from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';



const Sobre = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../imagens/login/sobre.png')}
        style={styles.img}
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccf3dc',
    padding: 10,
  },
  img: {
  width:'100%',
  

  },
});

export default Sobre;
