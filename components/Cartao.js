import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';

const Cartao = (props) => {
  return (
    <View style={styles.cartao}>
        <Text style={styles.textoCartao}>Cidade:  {props.city}</Text>
        <Text style={styles.textoCartao}>Nascer do sol:  {props.sunset}</Text>
        <Text style={styles.textoCartao}>Pôr do sol:  {props.sunrise}</Text>
        <Text style={styles.textoCartao}>Sensação Térmica: {props.feels_like}ºC</Text>
        <Image
            style={styles.imagem}
            source={{ uri: "https://openweathermap.org/img/wn/" + props.icon + ".png" }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: 0.32,
    elevation: 4,
    padding: 15,
    borderRadius: 12,
    margin: 5,
    backgroundColor: '#BB96F3'
  },
  textoCartao: {
    color: '#FFF'
  },
  imagem: {
    alignSelf: 'center',
    margin: 2,
    width: 50,
    height: 50,
  },
})

export default Cartao;