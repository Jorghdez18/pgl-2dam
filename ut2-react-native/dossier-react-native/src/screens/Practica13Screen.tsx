import { useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORES_CSS_VALIDOS = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
  'lightblue',
  'lightgreen',
  'lightgray',
  'coral',
  'gold',
  'cyan',
  'magenta',
  'white',
  'black',
  'gray',
  'grey',
  'teal',
  'navy',
  'lime',
  'olive',
  'maroon',
  'aqua',
  'silver',
];

export default function Practica13Screen() {
  const [fondo, setFondo] = useState('#f5f5f5');
  const [visible, setVisible] = useState(false);
  const [colorEscrito, setColorEscrito] = useState('lightblue');

  const esColorValido = (texto: string): boolean => {
    const limpio = texto.trim().toLowerCase();
    if (!limpio) return false;
    const esHex = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(limpio);
    const esNombreCss = COLORES_CSS_VALIDOS.includes(limpio);
    return esHex || esNombreCss;
  };

  const abrirDialogo = () => {
    setColorEscrito('');
    setVisible(true);
  };

  const manejarAceptar = () => {
    const limpio = colorEscrito.trim().toLowerCase();
    if (!esColorValido(limpio)) {
      Alert.alert(
        'Color no válido',
        'Introduce un nombre de color CSS (ej. lightblue, coral, teal) o un código hexadecimal válido (ej. #1565c0).'
      );
      return;
    }
    setFondo(limpio);
    setVisible(false);
  };

  return (
    <SafeAreaView style={[styles.contenedor, { backgroundColor: fondo }]}>
      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Práctica 13: Introducir el Color</Text>
        <Text style={styles.info}>Color actual: {fondo}</Text>

        <TouchableOpacity style={styles.boton} onPress={abrirDialogo}>
          <Text style={styles.textoBoton}>Escribir color</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.fondoModal}>
          <View style={styles.cajaModal}>
            <Text style={styles.tituloModal}>Introduce un color</Text>
            <Text style={styles.subtituloModal}>
              Nombre CSS (ej. coral, lightblue) o HEX (#ff5722)
            </Text>

            <TextInput
              style={styles.input}
              value={colorEscrito}
              onChangeText={setColorEscrito}
              placeholder="Color CSS o hexadecimal"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.filaBotones}>
              <TouchableOpacity
                style={styles.botonCancelar}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.textoBotonModal}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botonAceptar}
                onPress={manejarAceptar}
              >
                <Text style={styles.textoBotonModal}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tarjeta: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#212121',
  },
  info: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '600',
  },
  boton: {
    backgroundColor: '#212121',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginTop: 8,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cajaModal: {
    padding: 22,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    gap: 14,
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  subtituloModal: {
    fontSize: 13,
    color: '#616161',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 6,
  },
  botonCancelar: {
    backgroundColor: '#757575',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  botonAceptar: {
    backgroundColor: '#1565c0',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  textoBotonModal: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
