import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type DatosPersona = {
  nombre: string;
  edad: string;
  casado: boolean;
  jubilado: boolean;
};

export default function Practica15Screen() {
  const [datos, setDatos] = useState<DatosPersona>({
    nombre: '',
    edad: '',
    casado: false,
    jubilado: false,
  });

  const [resumen, setResumen] = useState<DatosPersona | null>(null);

  function cambiarCampo<K extends keyof DatosPersona>(
    campo: K,
    valor: DatosPersona[K]
  ) {
    setDatos(actual => ({ ...actual, [campo]: valor }));
  }

  const enviarFormulario = () => {
    const nombreLimpio = datos.nombre.trim();
    const edadNumerica = Number(datos.edad.trim());

    if (!nombreLimpio) {
      Alert.alert('Error de validación', 'El nombre no puede estar vacío.');
      return;
    }

    if (!datos.edad.trim() || isNaN(edadNumerica) || edadNumerica < 0) {
      Alert.alert('Error de validación', 'Introduce una edad numérica válida.');
      return;
    }

    setResumen({
      ...datos,
      nombre: nombreLimpio,
      edad: String(edadNumerica),
    });
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>Práctica 15: Formulario de Persona</Text>

        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe el nombre"
            value={datos.nombre}
            onChangeText={v => cambiarCampo('nombre', v)}
          />

          <Text style={styles.etiqueta}>Edad:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe la edad"
            keyboardType="numeric"
            value={datos.edad}
            onChangeText={v => cambiarCampo('edad', v)}
          />

          <View style={styles.filaSwitch}>
            <Text style={styles.etiqueta}>Casado:</Text>
            <Switch
              value={datos.casado}
              onValueChange={v => cambiarCampo('casado', v)}
              thumbColor={datos.casado ? '#1565c0' : '#9e9e9e'}
            />
          </View>

          <View style={styles.filaSwitch}>
            <Text style={styles.etiqueta}>Jubilado:</Text>
            <Switch
              value={datos.jubilado}
              onValueChange={v => cambiarCampo('jubilado', v)}
              thumbColor={datos.jubilado ? '#1565c0' : '#9e9e9e'}
            />
          </View>

          <TouchableOpacity style={styles.boton} onPress={enviarFormulario}>
            <Text style={styles.textoBoton}>Mostrar resumen</Text>
          </TouchableOpacity>
        </View>

        {resumen && (
          <View style={styles.tarjetaResumen}>
            <Text style={styles.tituloResumen}>Resumen de Datos</Text>
            <Text style={styles.datoResumen}>Nombre: {resumen.nombre}</Text>
            <Text style={styles.datoResumen}>Edad: {resumen.edad} años</Text>
            <Text style={styles.datoResumen}>
              Casado: {resumen.casado ? 'Sí' : 'No'}
            </Text>
            <Text style={styles.datoResumen}>
              Jubilado: {resumen.jubilado ? 'Sí' : 'No'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scroll: {
    padding: 20,
    gap: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#212121',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    gap: 12,
    elevation: 2,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  filaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  boton: {
    backgroundColor: '#1565c0',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tarjetaResumen: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1565c0',
    gap: 6,
  },
  tituloResumen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 4,
  },
  datoResumen: {
    fontSize: 16,
    color: '#212121',
  },
});
