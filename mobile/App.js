import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Provider from './src/contexto/provider';
import Start from './src/pages/Start'
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Favorito from './src/pages/favoritos';
import Doacao from './src/pages/Doacao';
import Sobre from './src/componentes/Sobre';
import PetInfo from './src/componentes/petInfo';
import TodosPets from './src/pages/TodosPets';
import Inicio from './src/pages/Home';
import Perfil from './src/pages/Perfil';
import EditarPerfil from './src/pages/Perfil/editar';
import Post from './src/pages/Post';
import CuidadoPet from './src/pages/Post/cuidadoPet';
import IdadePet from './src/pages/Post/idadePet';
import ImagemPet from './src/pages/Post/imagemPet';
import RacaPet from './src/pages/Post/racaPet';
import SobrePet from './src/pages/Post/sobrePet';
import TemperamentoPet from './src/pages/Post/temperamentoPet';
import TipoAnimal from './src/pages/Post/tipoAnimal';




function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
        }
      }}
    >
      <Tab.Screen
        name="HomeTabs"
        component={Inicio}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color='black' size={26} />
          ),
        }}
      />
      <Tab.Screen name='Post' component={Post} options={{
        headerShown: false,

        tabBarLabel: () => null,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle" size={40} color="#ccf3dc" />
        ),

        tabBarStyle: { display: 'none' }
      }} />
      <Tab.Screen name='Favorito' component={Favorito} options={{
        headerShown: true,
        headerTitle: "Favoritos",
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ccf3dc',

        },

        tabBarLabel: () => null,
        tabBarIcon: ({ color, size }) => (
          <Feather name="heart" size={26} color="black" />
        ),
      }} />

      <Tab.Screen name='Perfil' component={Perfil} options={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarIcon: ({ color, size }) => (
          <Feather name="user" size={26} color="black" />
        ),
      }} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Inicio" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }} />
      <Stack.Screen name="Doacao" component={Doacao} options={{
        headerShown: true, headerTitle: "Ajude o projeto", headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ccf3dc',
        }
      }} />
      <Stack.Screen name="Sobre" component={Sobre} options={{
        headerShown: true, headerTitle: "Sobre nós", headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ccf3dc',
        }
      }} />
      <Stack.Screen name="PetInfo" component={PetInfo} options={{ headerShown: false }} />
      <Stack.Screen name="TodosPets" component={TodosPets} options={{
        headerShown: true,
        headerTitle: "Todos Pets",
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ccf3dc',

        }
      }} />
      <Stack.Screen name="tipoAnimal" component={TipoAnimal} options={{ headerShown: false }} />
      <Stack.Screen name="IdadePet" component={IdadePet} options={{ headerShown: false }} />
      <Stack.Screen name="RacaPet" component={RacaPet} options={{ headerShown: false }} />
      <Stack.Screen name="CuidadoPet" component={CuidadoPet} options={{ headerShown: false }} />
      <Stack.Screen name="TemperamentoPet" component={TemperamentoPet} options={{ headerShown: false }} />
      <Stack.Screen name="ImagemPet" component={ImagemPet} options={{ headerShown: false }} />
      <Stack.Screen name="sobrePet" component={SobrePet} options={{ headerShown: false }} />

    </Stack.Navigator>

  )
}


export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
