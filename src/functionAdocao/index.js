import * as Linking from 'expo-linking';

export default async function openWhats(nomePet, imagemPet) {
    const numero = '5511952041573';
    const mensagem = `Olá, tudo bem? Estou interessado(a) em adotar o ${nomePet}. Veja a foto dele aqui: ${imagemPet}`;
    
    try {
      const url = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensagem)}`;
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        alert('WhatsApp não está instalado.');
      }
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
    }
  }
  
  

