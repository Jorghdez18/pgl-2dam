import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Emocion = 'feliz' | 'triste' | 'neutral';

type EntradaDiario = {
  id: string;
  texto: string;
  fechaHora: string;
  emocion: Emocion;
};

export default function Practica18Screen() {
  const [texto, setTexto] = useState('');
  const [entradas, setEntradas] = useState<EntradaDiario[]>([]);

  const detectarEmocion = (mensaje: string): Emocion => {
    if (mensaje.includes(':-)')) return 'feliz';
    if (mensaje.includes(':-(')) return 'triste';
    return 'neutral';
  };

  const agregarEntrada = () => {
    const limpio = texto.trim();
    if (!limpio) {
      Alert.alert('Campo vacío', 'Escribe algo antes de añadir una entrada al diario.');
      return;
    }

    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString('es-ES');
    const horaFormateada = ahora.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const nuevaEntrada: EntradaDiario = {
      id: String(Date.now()),
      texto: limpio,
      fechaHora: `${fechaFormateada} - ${horaFormateada}`,
      emocion: detectarEmocion(limpio),
    };

    setEntradas(actual => [nuevaEntrada, ...actual]);
    setTexto('');
  };

  const renderizarIcono = (emocion: Emocion) => {
    switch (emocion) {
      case 'feliz':
        return <Ionicons name="happy-outline" size={34} color="#2e7d32" />;
      case 'triste':
        return <Ionicons name="sad-outline" size={34} color="#c62828" />;
      default:
        return <Ionicons name="remove-circle-outline" size={34} color="#757575" />;
    }
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Práctica 18: Diario de Emociones</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Escribe cómo te sientes (usa :-) o :-()..."
          value={texto}
          onChangeText={setTexto}
          multiline
        />

        <TouchableOpacity style={styles.boton} onPress={agregarEntrada}>
          <Text style={styles.textoBoton}>Guardar entrada</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={entradas}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <View style={styles.contenidoTarjeta}>
              <Text style={styles.fecha}>{item.fechaHora}</Text>
              <Text style={styles.textoEntrada}>{item.texto}</Text>
            </View>
            <View style={styles.cajaIcono}>
              {renderizarIcono(item.emocion)}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>Aún no hay entradas en el diario.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 14,
    color: '#212121',
  },
  formulario: {
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: '#1565c0',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 1,
  },
  contenidoTarjeta: {
    flex: 1,
    paddingRight: 12,
    gap: 4,
  },
  fecha: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '600',
  },
  textoEntrada: {
    fontSize: 16,
    color: '#212121',
  },
  cajaIcono: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vacio: {
    textAlign: 'center',
    color: '#757575',
    fontSize: 15,
    marginTop: 30,
  },
});
