import { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type JustifyValido =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type AlignValido = 'flex-start' | 'center' | 'flex-end' | 'stretch';

const VALORES_JUSTIFY: JustifyValido[] = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];

const VALORES_ALIGN: AlignValido[] = [
  'flex-start',
  'center',
  'flex-end',
  'stretch',
];

export default function Practica9Screen() {
  const [textoInput, setTextoInput] = useState('center');
  const [justifyActivo, setJustifyActivo] = useState<JustifyValido>('center');
  const [alignActivo, setAlignActivo] = useState<AlignValido>('center');

  const manejarCambioTexto = (texto: string) => {
    setTextoInput(texto);
    const limpio = texto.trim().toLowerCase() as JustifyValido;

    if (VALORES_JUSTIFY.includes(limpio)) {
      setJustifyActivo(limpio);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Práctica 9: Alineación e Imágenes</Text>

      {/* Panel de controles */}
      <View style={styles.panelControles}>
        <Text style={styles.etiqueta}>
          justifyContent (center, space-around, space-between, flex-start, flex-end):
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe un valor válido..."
          value={textoInput}
          onChangeText={manejarCambioTexto}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.etiqueta}>alignItems:</Text>
        <View style={styles.filaBotones}>
          {VALORES_ALIGN.map(opcion => (
            <TouchableOpacity
              key={opcion}
              style={[
                styles.boton,
                alignActivo === opcion && styles.botonActivo,
              ]}
              onPress={() => setAlignActivo(opcion)}
            >
              <Text style={styles.textoBoton}>{opcion}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.estadoActivo}>
          Activos → justifyContent: "{justifyActivo}" | alignItems: "{alignActivo}"
        </Text>
      </View>

      <View
        style={[
          styles.escenario,
          {
            justifyContent: justifyActivo,
            alignItems: alignActivo,
          },
        ]}
      >
                <Image
          source={require('../../assets/images/icon.png')}
          style={styles.imagen}
          resizeMode="contain"
        />

        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.imagen}
          resizeMode="contain"
        />

        <Image
          source={{ uri: 'https://githubusercontent.com' }}
          style={styles.imagen}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  panelControles: {
    paddingHorizontal: 16,
    gap: 8,
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  filaBotones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  boton: {
    backgroundColor: '#546e7a',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  botonActivo: {
    backgroundColor: '#1565c0',
  },
  textoBoton: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  estadoActivo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1565c0',
    marginTop: 4,
    textAlign: 'center',
  },
  escenario: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: '#e0e0e0',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#bdbdbd',
  },
  imagen: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
});
