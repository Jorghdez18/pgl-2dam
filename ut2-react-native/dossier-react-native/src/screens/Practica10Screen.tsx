import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TeclaCalculadora from '../components/TeclaCalculadora';

type Operacion = '+' | '-' | '×' | '÷' | null;

export default function CalculadoraScreen() {
  const [actual, setActual] = useState('0');
  const [anterior, setAnterior] = useState<string | null>(null);
  const [operacion, setOperacion] = useState<Operacion>(null);
  const [reiniciarVisor, setReiniciarVisor] = useState(false);

  const pulsarNumero = (num: string) => {
    if (reiniciarVisor) {
      setActual(num);
      setReiniciarVisor(false);
      return;
    }

    if (num === '.' && actual.includes('.')) return;

    if (actual === '0' && num !== '.') {
      setActual(num);
    } else {
      setActual(actual + num);
    }
  };

  const limpiar = () => {
    setActual('0');
    setAnterior(null);
    setOperacion(null);
    setReiniciarVisor(false);
  };

  const borrarUltimo = () => {
    if (reiniciarVisor) return;
    if (actual.length === 1 || (actual.length === 2 && actual.startsWith('-'))) {
      setActual('0');
    } else {
      setActual(actual.slice(0, -1));
    }
  };

  const cambiarSigno = () => {
    if (actual === '0') return;
    setActual(actual.startsWith('-') ? actual.slice(1) : '-' + actual);
  };

  const calcularResultado = (a: number, b: number, op: Operacion): string => {
    switch (op) {
      case '+':
        return String(a + b);
      case '-':
        return String(a - b);
      case '×':
        return String(a * b);
      case '÷':
        return b === 0 ? 'Error' : String(Number((a / b).toFixed(6)));
      default:
        return String(b);
    }
  };

  const seleccionarOperacion = (op: Operacion) => {
    if (anterior !== null && operacion && !reiniciarVisor) {
      const resultado = calcularResultado(Number(anterior), Number(actual), operacion);
      setActual(resultado);
      setAnterior(resultado === 'Error' ? null : resultado);
    } else {
      setAnterior(actual);
    }
    setOperacion(op);
    setReiniciarVisor(true);
  };

  const pulsarIgual = () => {
    if (anterior === null || !operacion) return;
    const resultado = calcularResultado(Number(anterior), Number(actual), operacion);
    setActual(resultado);
    setAnterior(null);
    setOperacion(null);
    setReiniciarVisor(true);
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      {/* Visor de resultados */}
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
