import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import Swiper from 'react-native-swiper';
export default function Header() {

    const data = [
        { id: 1, image: require('../../imagens/carrossel/carrossel.jpg') },
        { id: 2, image: require('../../imagens/carrossel/cat.jpg') },
        { id: 3, image: require('../../imagens/carrossel/dog.jpg') },
    ];
  return (
    <View style={styles.container}>
   <Swiper paginationStyle={styles.paginationStyle} style={styles.wrapper} showsPagination loop>
                {data.map((item) => (
                    <View key={item.id} style={styles.slide}>
                        <Image source={item.image} style={styles.image} />
                    </View>
                ))}
            </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: .5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  text: {
    fontSize: 24,
    color: '#333',
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
});
