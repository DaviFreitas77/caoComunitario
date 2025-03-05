import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
const ModalPetCadastrado = ({ isVisible, onClose }) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Pet cadastrado!</Text>
                        <LottieView
                            source={require('../../lottie/animacao.json')}
                            autoPlay={true}
                            loop={false}
                            style={{ width: 280, height: 280 }}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                navigation.navigate('Inicio');
                                onClose();
                            }}
                        >
                            <Text style={styles.textStyle}>Voltar à tela inicial</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flex: 0.5,
        width: '90%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        width: '80%',
        height: 70,
        justifyContent: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 25,
        textAlign: 'center',
        fontSize: 25,
    },
});

export default ModalPetCadastrado;
