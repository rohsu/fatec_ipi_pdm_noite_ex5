import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Button,
  Keyboard
}
  from 'react-native';
import Cartao from './components/Cartao';

export default function App() {

  const [cidade, setCidade] = useState('');
  const [cidadesStatus, setCidadesStatus] = useState([]);
  const [previsoes, setPrevisoes] = useState([]);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obterCidadeStatus = (city, lat, lon) => {
    const target = cityStatusEndPoint + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(target)
      .then((dados) => {
        return dados.json()
      })
      .then((dados) => {
        const status = { 
          city: city, 
          sunrise: dados.current.sunrise, 
          sunset: dados.current.sunset, 
          feels_like: dados.current.feels_like,
          icon: dados.current.weather[0].icon
        };
        setCidadesStatus([...cidadesStatus, status]);
        Keyboard.dismiss();
      });
  };

  const obterCoordenada = () => {
    const target = cityEndPoint + cidade + "&appid=" + apiKey;
    fetch(target)
      .then((dados) => {
        return dados.json()
      })
      .then((dados) => {
        if(dados.cod == 200) {
          const name = dados.city.name;
          const lat = dados.city.coord.lat;
          const lon = dados.city.coord.lon;
          obterCidadeStatus(name, lat, lon);
        } 
      });
  };

  const cityEndPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q=";
  const cityStatusEndPoint = "https://api.openweathermap.org/data/2.5/onecall?lang=pt_br&units=metric&";
  const apiKey = 'YOUR_API_KEY';
  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button
          title="ok"
          onPress={obterCoordenada}
        />
      </View>
      <FlatList
        data={cidadesStatus}
        renderItem={
          city => (
            <Cartao 
              city={city.item.city}
              sunset={new Date(city.item.sunset).toTimeString()}
              sunrise={new Date(city.item.sunrise).toTimeString()}
              feels_like={city.item.feels_like}
              icon={city.item.icon}
            />
          )
        } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF'
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  nomeCidade: {
    padding: 12,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
});
