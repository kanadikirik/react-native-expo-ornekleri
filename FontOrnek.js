// Harici font dosyasını proje dosyanıza ekleyin.
// Önerilen dosya yolu : 'proje-adi/assets/fonts'
// Ufak bir not : Bir sayfada yüklediğiniz font'u diğer sayfalarda da tekrar yükleme işlemi yapmadan kullanabilirsiniz.
// Bu yüzden font yükleme işlemini projede görüntülenecek ilk sayfada yapmakta fayda var.

import React from 'react';
import { Text, View } from 'react-native';

// Expo kütüphanesinde bulunan "Font" u import etmemiz gerekiyor.
import { Font } from 'expo';

export default class FontOrnek extends React.Component {

  // 'fontLoaded' adında bir state tanımlıyoruz ve ilk başta false değerini atıyoruz.
  state = {
    fontLoaded : false,
  }

  // ComponentDidMount fonksiyonunun içerisinde proje dosyamızda bulunan font u yüklüyoruz.
  // Font yükleme işi bittikten sonra 'fontLoaded' stateimizin değerini 'true' yapıyoruz ve 'Text' componentimiz görüntüleniyor.
  // 'Font.loadAsync' fonksiyonu asenkronize çalıştığı için async/await yapısını kullanıyoruz.
  // Bu sayede font yüklenme işlemi tamamlanmadan 'Text' componentimiz görüntülenmiyor
  async componentDidMount() {
    await Font.loadAsync({
      'font-adi': require('./assets/fonts/font-adi.uzantisi'),
    });
    this.setState({ fontLoaded: true })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
        // Sayfada görüntülenecek olan 'Text' componenti, 'fontLoaded' true ise gösteriliyor false ise gösterilmiyor.
        this.state.fontLoaded ? (
          <Text style={{ fontFamily: 'font-adi', fontSize: 30 }}>
            Expo ile Font Örneği
          </Text>
        ) : null
        
      </View>
    );
  }
}


