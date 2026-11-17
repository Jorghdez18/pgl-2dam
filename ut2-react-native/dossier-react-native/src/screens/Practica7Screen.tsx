import { StyleSheet, Text, View } from 'react-native';
import CajaEstilo from '../components/CajaEstilo';

export default function Practica7Screen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Práctica 7: Estilos por Props</Text>

      <View style={styles.escenario}>
        {/* Caja A: conserva el estilo por defecto */}
        <CajaEstilo nombre="Caja A" />

        {/* Caja B: esquinas redondeadas y borde diferente */}
        <CajaEstilo
          nombre="Caja B"
          style={{
            backgroundColor: '#e53935',
            borderRadius: 20,
            borderWidth: 7,
            borderColor: '#ffcdd2',
          }}
        />

        {/* Caja C: otro estilo personalizado */}
        <CajaEstilo
          nombre="Caja C"
          style={{
            backgroundColor: '#43a047',
            borderRadius: 50,
            borderWidth: 4,
            borderColor: '#1b5e20',
            width: 200,
          }}
        />
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
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    margin: 16,
    padding: 15,
    borderRadius: 12,
  },
});
