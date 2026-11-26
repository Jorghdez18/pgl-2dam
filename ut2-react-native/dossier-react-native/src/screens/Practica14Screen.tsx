import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Practica14Screen() {
  const [activo, setActivo] = useState(false);

  return (
    <SafeAreaView
      style={[
        styles.contenedor,
        activo && styles.bordeActivo,
      ]}
    >
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Práctica 14: Borde con Switch</Text>
        <Text style={styles.estado}>
          Estado del borde: {activo ? 'Activado (Rojo)' : 'Desactivado'}
        </Text>

        <Switch
          value={activo}
          onValueChange={setActivo}
          thumbColor={activo ? 'orange' : 'brown'}
          trackColor={{ false: '#d7ccc8', true: '#ffe0b2' }}
        />
      </View>
    </SafeAreaView>
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
  bordeActivo: {
    borderWidth: 8,
    borderColor: 'red',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
    width: '100%',
    elevation: 2,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
  },
  estado: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '600',
  },
});
