import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

type Props = {
  nombre: string;
  bg?: string;
};

export default function CajaTouchable({ nombre, bg = '#43a047' }: Props) {
  const [valorFlex, setValorFlex] = useState(1);

  const manejarIncremento = () => {
    setValorFlex(n => n + 1);
    Alert.alert('Flex aumentado', `${nombre} ahora tiene flex: ${valorFlex + 1}`);
  };

  return (
    <View style={[styles.caja, { backgroundColor: bg, flex: valorFlex }]}>
      <Text style={styles.texto}>
        {nombre} — flex: {valorFlex}
      </Text>

      <View style={styles.filaBotones}>
        <TouchableOpacity
          style={styles.botonRestar}
          activeOpacity={0.6}
          onPress={() => setValorFlex(n => Math.max(0, n - 1))}
        >
          <Text style={styles.textoBoton}>-1 Flex</Text>
        </TouchableOpacity>

        <TouchableHighlight
          style={styles.botonSumar}
          underlayColor="#1b5e20"
          onPress={manejarIncremento}
        >
          <Text style={styles.textoBoton}>+1 Flex</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    width: '90%',
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
    marginVertical: 4,
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 15,
  },
  botonRestar: {
    backgroundColor: '#212121',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  botonSumar: {
    backgroundColor: '#004d40',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
