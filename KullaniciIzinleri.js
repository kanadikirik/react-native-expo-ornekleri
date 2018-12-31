import React from 'react';
import { View, Alert, Button } from 'react-native';

// Expo kütüphanesinde bulunan 'Permissions' modülünü import etmemiz gerekiyor.
import { Permissions } from 'expo';

export default class KullaniciIzinleri extends React.Component {

  constructor(props){
    super(props);
    this._izinIste = this._izinIste.bind(this);
  }

  // 'Permissions' modülünün fonksiyonları asenkron çalıştığı için yazacağımız fonksiyonlarda 'async/await' yapısını kullanacağız.

  _izinIste = async () => {
    // 'CAMERA_ROLL' yani galeriye erişim izni istiyoruz ve oradan gelecek cevabı 'status' değişkenine atıyoruz.
    // Eğer izin verilirse 'status' değişkenimiz 'granted' değerini alıyor ve fonksiyonumuz 'true' dönüyor.
    // İzin verilmezse bir uyarı mesajı gösteriyoruz ve fonksiyonumuz 'false' dönüyor.
    // NOT : Eğer izin verilmezse tekrardan izin isteme işlemi yapılamaz. Bir kez izin verilmedikten sonra fonksiyon tekrar çağırılırsa otomatik olarak 'false' dönecektir.
    
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    if (status === 'granted')
      return true;
    else {
      Alert.alert('Galeriye erişim izni verilmedi!');
      return false;
    }
  }

  _izinKontrolEt = async () => {
    // Daha önce galeriye erişim izni verilip verilmediğini kontrol ediyoruz.
    // Eğer izin verilmişse 'status' değişkenimiz 'granted' değerini alıyor ve fonksiyonumuz 'true' dönüyor.
    // Daha önce izin verilmemişse veya hiç izin isteme işlemi yapılmamışsa uyarı mesajı gösteriyoruz ve fonksiyonumuz 'false' dönüyor.
    
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      console.log(status);
      return true;
    } else {
      Alert.alert('Galeriye erişim izni verilmemiş!')
      return false;
    }
  } 


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button 
          title   = 'İzin iste'
          onPress = {this._izinIste}
        />
        <Button 
          title   = 'İzin kontrol et'
          onPress = {this._izinKontrolEt}
        />
      </View>
    );
  }
}
