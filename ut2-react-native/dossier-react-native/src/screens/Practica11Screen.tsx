import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TeclaCalculadora from '../components/TeclaCalculadora';
import { useCalculadora } from '../hooks/useCalculadora';

export default function Practica11Screen() {
  const {
    actual,
    anterior,
    operacion,
    pulsarNumero,
    limpiar,
    borrarUltimo,
    cambiarSigno,
    seleccionarOperacion,
    pulsarIgual,
  } = useCalculadora();

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.visor}>
        <Text style={styles.subtitulo}>
          {anterior !== null && operacion ? `${anterior} ${operacion}` : ''}
        </Text>
        <Text
          style={styles.resultado}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {actual}
        </Text>
      </View>

      <View style={styles.teclado}>
        <View style={styles.fila}>
          <TeclaCalculadora etiqueta="C" onPress={limpiar} bg="#a5a5a5" colorTexto="#000" />
          <TeclaCalculadora etiqueta="+/-" onPress={cambiarSigno} bg="#a5a5a5" colorTexto="#000" />
          <TeclaCalculadora etiqueta="DEL" onPress={borrarUltimo} bg="#a5a5a5" colorTexto="#000" />
          <TeclaCalculadora etiqueta="÷" onPress={() => seleccionarOperacion('÷')} bg="#ff9f0a" />
        </View>

        <View style={styles.fila}>
          <TeclaCalculadora etiqueta="7" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="8" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="9" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="×" onPress={() => seleccionarOperacion('×')} bg="#ff9f0a" />
        </View>

        <View style={styles.fila}>
          <TeclaCalculadora etiqueta="4" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="5" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="6" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="-" onPress={() => seleccionarOperacion('-')} bg="#ff9f0a" />
        </View>

        <View style={styles.fila}>
          <TeclaCalculadora etiqueta="1" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="2" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="3" onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="+" onPress={() => seleccionarOperacion('+')} bg="#ff9f0a" />
        </View>

        <View style={styles.fila}>
          <TeclaCalculadora etiqueta="0" onPress={pulsarNumero} doble />
          <TeclaCalculadora etiqueta="." onPress={pulsarNumero} />
          <TeclaCalculadora etiqueta="=" onPress={pulsarIgual} bg="#ff9f0a" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  visor: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  subtitulo: {
    color: '#8e8e93',
    fontSize: 24,
    marginBottom: 4,
  },
  resultado: {
    color: '#ffffff',
    fontSize: 72,
    fontWeight: '300',
  },
  teclado: {
    gap: 12,
  },
  fila: {
    flexDirection: 'row',
    gap: 12,
  },
});
