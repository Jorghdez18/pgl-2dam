import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView contentContainerStyle={styles.lista}>
        <Text style={styles.titulo}>Prácticas de React Native con Expo</Text>

        <Link href="/practica04" style={styles.enlace}>Práctica 4: Tres cajas</Link>
        <Link href="/practica05" style={styles.enlace}>Práctica 5: Flex dinámico</Link>
        <Link href="/practica06" style={styles.enlace}>Práctica 6: Componentes táctiles</Link>
        <Link href="/practica07" style={styles.enlace}>Práctica 7: Estilos por props</Link>
        <Link href="/practica08" style={styles.enlace}>Práctica 8: Círculos dinámicos</Link>
        <Link href="/practica09" style={styles.enlace}>Práctica 9: Alineación e imágenes</Link>
        <Link href="/practica091" style={styles.enlace}>Práctica 9.1: Imagen aleatoria</Link>
        <Link href="/practica10" style={styles.enlace}>Práctica 10: Calculadora</Link>
        <Link href="/practica11" style={styles.enlace}>Práctica 11: Calculadora con Hook</Link>
        <Link href="/practica12" style={styles.enlace}>Práctica 12: Color con confirmación</Link>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  lista: {
    padding: 20,
    gap: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  enlace: {
    backgroundColor: '#1565c0',
    color: '#ffffff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});
