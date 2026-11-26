import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type OpcionEmoticono = {
  id: string;
  icono: keyof typeof Ionicons.glyphMap;
  secuencia: string;
  color: string;
};

const EMOTICONOS: OpcionEmoticono[] = [
  { id: '1', icono: 'happy-outline', secuencia: ' :-)', color: '#2e7d32' },
  { id: '2', icono: 'sad-outline', secuencia: ' :-(', color: '#c62828' },
  { id: '3', icono: 'heart-outline', secuencia: ' <3', color: '#ef6c00' },
  { id: '4', icono: 'thumbs-up-outline', secuencia: ' (y)', color: '#1565c0' },
  { id: '5', icono: 'alert-circle-outline', secuencia: ' :-O', color: '#6a1b9a' },
];

export default function Practica19Screen() {
  const [texto, setTexto] = useState('');

  const insertarEmoticono = (secuencia: string) => {
    setTexto(actual => actual + secuencia);
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Práctica 19: Insertar Emoticonos</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.instruccion}>
          Pulsa un icono para añadir su emoticono al texto:
        </Text>

        <View style={styles.filaIconos}>
          {EMOTICONOS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.botonIcono}
              onPress={() => insertarEmoticono(item.secuencia)}
            >
              <Ionicons name={item.icono} size={32} color={item.color} />
              <Text style={styles.etiquetaSecuencia}>{item.secuencia.trim()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje o pulsa un icono..."
          value={texto}
          onChangeText={setTexto}
          multiline
        />

        <TouchableOpacity
          style={styles.botonLimpiar}
          onPress={() => setTexto('')}
        >
          <Text style={styles.textoLimpiar}>Limpiar texto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#212121',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    gap: 14,
    elevation: 2,
  },
  instruccion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
  },
  filaIconos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 6,
  },
  botonIcono: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  etiquetaSecuencia: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#424242',
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    minHeight: 110,
    backgroundColor: '#fafafa',
    textAlignVertical: 'top',
  },
  botonLimpiar: {
    backgroundColor: '#757575',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  textoLimpiar: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
