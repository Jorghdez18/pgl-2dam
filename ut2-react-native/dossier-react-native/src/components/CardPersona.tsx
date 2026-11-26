import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
  id: string;
  onEliminar: (id: string) => void;
};

export default function CardPersona({ id, onEliminar }: Props) {
  const [nombre, setNombre] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  const calcularIMC = (): string => {
    const pesoNum = Number(peso.replace(',', '.'));
    const alturaNum = Number(altura.replace(',', '.'));

    if (!peso || !altura || isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0 || pesoNum <= 0) {
      return '--';
    }

    const alturaEnMetros = alturaNum > 3 ? alturaNum / 100 : alturaNum;
    const imc = pesoNum / (alturaEnMetros * alturaEnMetros);
    return imc.toFixed(2);
  };

  return (
    <View style={styles.tarjeta}>
      <View style={styles.cabecera}>
        <Text style={styles.idTexto}>Persona #{id}</Text>
        <TouchableOpacity
          style={styles.botonEliminar}
          onPress={() => onEliminar(id)}
        >
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <View style={styles.filaInputs}>
        <TextInput
          style={[styles.input, styles.inputMitad]}
          placeholder="Altura (m, ej. 1.75)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
        <TextInput
          style={[styles.input, styles.inputMitad]}
          placeholder="Peso (kg, ej. 70)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
      </View>

      <View style={styles.cajaImc}>
        <Text style={styles.etiquetaImc}>
          {nombre.trim() ? `IMC de ${nombre.trim()}:` : 'IMC calculado:'}
        </Text>
        <Text style={styles.valorImc}>{calcularIMC()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1565c0',
  },
  botonEliminar: {
    backgroundColor: '#d32f2f',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  textoEliminar: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  filaInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  inputMitad: {
    flex: 1,
  },
  cajaImc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 4,
  },
  etiquetaImc: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0d47a1',
  },
  valorImc: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565c0',
  },
});
