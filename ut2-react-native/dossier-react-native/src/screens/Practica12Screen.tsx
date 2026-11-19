import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORES = [
  { nombre: 'Azul Océano', valor: '#1565c0' },
  { nombre: 'Verde Esmeralda', valor: '#2e7d32' },
  { nombre: 'Rojo Carmesí', valor: '#c62828' },
  { nombre: 'Morado Intenso', valor: '#6a1b9a' },
  { nombre: 'Naranja Cálido', valor: '#ef6c00' },
  { nombre: 'Gris Pizarra', valor: '#37474f' },
];

export default function Practica12Screen() {
  const [fondo, setFondo] = useState('#f5f5f5');
  const [nombreFondo, setNombreFondo] = useState('Gris Claro (Inicial)');

  const proponerColor = () => {
    const indice = Math.floor(Math.random() * COLORES.length);
    const propuesto = COLORES[indice];

    Alert.alert(
      'Cambiar color',
      `¿Quieres aplicar el color "${propuesto.nombre}" (${propuesto.valor}) como nuevo fondo?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => {
            setFondo(propuesto.valor);
            setNombreFondo(propuesto.nombre);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.contenedor, { backgroundColor: fondo }]}>
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Práctica 12: Color con Confirmación</Text>
        <Text style={styles.info}>Fondo actual: {nombreFondo}</Text>

        <TouchableOpacity style={styles.boton} onPress={proponerColor}>
          <Text style={styles.textoBoton}>Cambiar de color</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tarjeta: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#212121',
  },
  info: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '600',
  },
  boton: {
    backgroundColor: '#212121',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginTop: 8,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
