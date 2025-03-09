import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable, } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Context } from '../contexto/provider';
import { FontAwesome } from '@expo/vector-icons'; 
import openWhats from '../functionAdocao';
import Toast from 'react-native-toast-message';

const PetInfo = () => {
  const route = useRoute();
  const { pet } = route.params;
  const { setIdUser, idUser, urlApi, setAdm, adm } = useContext(Context)
  const [isFavorited, setIsFavorited] = useState(false);

  const cuidadosArray = pet.cuidados.split(', ');
  const temperamentosArray = pet.temperamentos.split(', ');

  


  useEffect(() => {
    const dataFavoritos = async () => {
      try {
        const response = await fetch(`${urlApi}/api/favoritos?fk_usuario=${idUser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();


        const favoritePet = data.find(fav => fav.id_pet === pet.id_pet);

        if (favoritePet) {
          setIsFavorited(true);
        }

       
      } catch (error) {
        console.log(error);
      }
    };

    dataFavoritos();
  }, [idUser, pet.id_pet]);

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
    });
  };

  const toggleFavorite = async () => {
    try {
      if (!isFavorited) {
        const response = await fetch(`${urlApi}/api/favoritar`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fk_usuario: idUser,
            fk_pet: pet.id_pet
          })
        })



        const data = await response.json();
        setIsFavorited(true);
        showToast('Pet adicionado dos favoritos');
        console.log(data)
      } else {
        try {
          const response = await fetch(`${urlApi}/api/delete`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fk_pet: pet.id_pet
            })
          })



          const data = await response.json()
          setIsFavorited(false);
          showToast('Pet removido dos favoritos');
          console.log(data)
        } catch (error) {
          console.log(error)
        }

      }


    } catch (error) {
      console.log(error)
    }


  };

  return (
    <View style={styles.container}>
      {adm ? (
        <Image
          source={{ uri: pet.imagem_pet }}
          style={styles.imgPet}
        />

      ) : (
        <View>
          <Image
            source={{ uri: pet.imagem_pet }}
            style={styles.imgPet}
          />

          <Pressable
            style={styles.favoriteButton}
            onPress={toggleFavorite}
          >
            <FontAwesome
              name={isFavorited ? 'heart' : 'heart-o'}
              size={30}
              color={isFavorited ? 'red' : 'gray'}
            />
          </Pressable>
        </View>
      )}


      <View style={styles.containerInfoPet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <Text style={styles.nomePet}>
              {pet.nome_pet}
            </Text>
            <Text>
              ({pet.raca_pet})
            </Text>
          </View>
          <View style={styles.containerDescPet}>
            <View style={styles.descPet}>
              <Text style={styles.descIdade}>
                {pet.desc_tipo_pet}
              </Text>
            </View>
            <View style={styles.descPet}>
              <Text style={styles.descIdade}>
                {pet.desc_genero}
              </Text>
            </View>
            <View style={styles.descPet}>
              {pet.desc_idade === 'Jovem - 6 meses até 2 anos' ? (
                <Text style={styles.descIdade}>jovem</Text>
              ) : pet.desc_idade === 'Filhote - 6 meses ou menos' ? (
                <Text style={styles.descIdade}>Filhote</Text>
              ) : pet.desc_idade === 'Adulto - 2 a 7 anos' ? (
                <Text style={styles.descIdade}>adulto</Text>
              ) : (
                <Text style={styles.descIdade}>não especificado</Text>
              )}
            </View>
          </View>
          <View style={styles.tittle}>
            <Text style={styles.tittleTxt}>Cuidados Veterinarios:</Text>
          </View>
          <View style={styles.cuidadosContainer}>
            {cuidadosArray.map((cuidado, index) => (
              <Text key={index} style={[styles.descPet, { textAlign: "center" }]}>{cuidado}</Text>
            ))}
          </View>
          <View style={styles.tittle}>
            <Text style={styles.tittleTxt}>Personalidade:</Text>
          </View>
          <View style={styles.cuidadosContainer}>
            {temperamentosArray.map((temperamento, index) => (
              <Text key={index} style={[styles.descPet, { textAlign: "center" }]}>{temperamento}</Text>
            ))}
          </View>
          <View style={styles.tittle}>
            <Text style={styles.tittleTxt}>Sobre {pet.nome_pet}:</Text>
          </View>
          <View style={styles.cuidadosContainer}>
            <Text style={{ fontSize: 16, textAlign: 'justify', marginBottom: 20 }}>
              {pet.sobre_pet}
            </Text>
          </View>

          {adm ? null : (
            <View style={styles.containerBtn}>
              <Pressable
                onPress={() => openWhats(pet.nome_pet, pet.imagem_pet)}
                style={styles.btn}
              >
                <Text style={styles.txtBtn}>Quero adotar</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  imgPet: {
    width: '100%',
    height: 400,
    position: 'relative'
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  containerInfoPet: {
    padding: 20,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  nomePet: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  descPet: {
    backgroundColor: "#ccf3dc",
    width: '30%',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: "center"
  },
  descIdade: {
    fontSize: 15,
  },
  containerDescPet: {
    flexDirection: "row",
    gap: 10
  },
  tittle: {
    marginTop: 40
  },
  tittleTxt: {
    fontSize: 22
  },
  cuidadosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    gap: 10,
    alignItems: 'center'
  },
  containerBtn: {
    alignItems: "center",
  },
  btn: {
    backgroundColor: '#ccf3dc',
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  txtBtn: {
    fontWeight: 'bold',
    fontSize: 17
  }
});

export default PetInfo;
