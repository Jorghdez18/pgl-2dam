import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Lista previa con llamadas estáticas a require (ajusta los nombres a los archivos reales de tu carpeta assets)
const imagenes = [
  { nombre: 'Icono App', source: require('../../assets/images/icon.png') },
  { nombre: 'React Logo', source: require('../../assets/images/react-logo.png') },
  { nombre: 'Splash Icon', source: require('../../assets/images/splash-icon.png') },
];

export default function Practica9_1Screen() {
  const [indice, setIndice] = useState(0);

  const elegirAleatoria = () => {
    const nuevoIndice = Math.floor(Math.random() * imagenes.length);
    setIndice(nuevoIndice);
  };

  const elegida = imagenes[indice];

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Práctica 9.1: Imagen Aleatoria</Text>

      <View style={styles.escenario}>
        <Image
          source={elegida.source}
          style={styles.imagen}
          resizeMode="contain"
        />
        <Text style={styles.nombreImagen}>
          Mostrando: {elegida.nombre} (Índice: {indice})
        </Text>

        <TouchableOpacity style={styles.boton} onPress={elegirAleatoria}>
          <Text style={styles.textoBoton}>Elegir imagen aleatoria</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  escenario: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    gap: 20,
  },
  imagen: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  nombreImagen: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  boton: {
    backgroundColor: '#1565c0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
