import { StyleSheet, Text, View } from 'react-native';
import CajaTouchable from '../components/CajaTouchable';

export default function Practica6Screen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Práctica 6: Componentes Táctiles</Text>

      <View style={styles.escenario}>
        <CajaTouchable nombre="Caja 1" bg="#e53935" />
        <CajaTouchable nombre="Caja 2" bg="#1e88e5" />
        <CajaTouchable nombre="Caja 3" bg="#43a047" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  escenario: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    margin: 16,
    padding: 10,
    borderRadius: 12,
  },
});
