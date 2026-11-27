import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.contenedor}>
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Pantalla Principal (HomeScreen)</Text>
        <Text style={styles.descripcion}>
          Pulsa el botón para apilar la pantalla de detalle encima de esta.
        </Text>

        <Link href="/stack/p20/detalle" asChild>
          <TouchableOpacity style={styles.botonPrimario}>
            <Text style={styles.textoBoton}>Ir a detalle</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          style={styles.botonSecundario}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBoton}>Volver al índice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    color: '#212121',
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 15,
    color: '#616161',
    textAlign: 'center',
  },
  botonPrimario: {
    backgroundColor: '#1565c0',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginTop: 6,
  },
  botonSecundario: {
    backgroundColor: '#757575',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
