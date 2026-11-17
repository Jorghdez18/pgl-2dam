import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function InicioScreen() {
  const [contador, setContador] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador</Text>
      <Text style={styles.numero}>{contador}</Text>

      <View style={styles.botonera}>
        <Button title="Sumar +1" onPress={() => setContador(contador + 1)} />
        <Button title="Restar -1" onPress={() => setContador(contador - 1)} />
        <Button title="Reiniciar" onPress={() => setContador(0)} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  numero: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  botonera: {
    flexDirection: 'row',
    gap: 12,
  },
});
