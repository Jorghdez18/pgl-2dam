import { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardPersona from '../components/CardPersona';

export default function Practica17Screen() {
  const [ids, setIds] = useState<string[]>(['1']);
  const [contador, setContador] = useState(2);

  const anadirTarjeta = () => {
    setIds(actual => [...actual, String(contador)]);
    setContador(c => c + 1);
  };

  const eliminarTarjeta = (idEliminar: string) => {
    setIds(actual => actual.filter(id => id !== idEliminar));
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Práctica 17: Cálculo de IMC</Text>
        <TouchableOpacity style={styles.botonAnadir} onPress={anadirTarjeta}>
          <Text style={styles.textoAnadir}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ids}
        keyExtractor={item => item}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <CardPersona id={item} onEliminar={eliminarTarjeta} />
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>
            Pulsa el botón «+» para añadir una tarjeta de persona.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  botonAnadir: {
    backgroundColor: '#2e7d32',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoAnadir: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  lista: {
    padding: 16,
    gap: 14,
  },
  vacio: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 16,
    marginTop: 40,
  },
});
