import { StyleSheet, Text, View } from 'react-native';
import Caja from '../components/Caja';

export default function PrincipalScreen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Contenedor Principal</Text>
      
      <View style={styles.escenario}>
        <Caja nombre="Caja 1" bg="#e53935" />
        <Caja nombre="Caja 2" bg="#1e88e5" />
        <Caja nombre="Caja 3" bg="#43a047" />
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
    marginBottom: 20,
  },
  escenario: {
    flex: 1,
    justifyContent: 'space-around', 
    alignItems: 'center',          
    backgroundColor: '#e0e0e0',
    margin: 16,
    borderRadius: 12,
  },
});
