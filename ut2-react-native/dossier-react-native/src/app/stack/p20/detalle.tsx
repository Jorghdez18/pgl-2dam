import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalleScreen() {
  const router = useRouter();

  return (
    <View style={styles.contenedor}>
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Segunda Pantalla (Detalle)</Text>
        <Text style={styles.descripcion}>
          Has navegado dentro de la pila Stack de la Práctica 20.
        </Text>

        <TouchableOpacity
          style={styles.botonVolver}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBoton}>Volver atrás</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 14,
    width: '100%',
    elevation: 2,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d47a1',
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 15,
    color: '#424242',
    textAlign: 'center',
  },
  botonVolver: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginTop: 6,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
