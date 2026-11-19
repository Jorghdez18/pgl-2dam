import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  etiqueta: string;
  onPress: (valor: string) => void;
  bg?: string;
  colorTexto?: string;
  doble?: boolean;
};

export default function TeclaCalculadora({
  etiqueta,
  onPress,
  bg = '#333333',
  colorTexto = '#ffffff',
  doble = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.tecla,
        { backgroundColor: bg },
        doble && styles.teclaDoble,
      ]}
      activeOpacity={0.7}
      onPress={() => onPress(etiqueta)}
    >
      <Text style={[styles.texto, { color: colorTexto }]}>{etiqueta}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tecla: {
    flex: 1,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teclaDoble: {
    flex: 2.15,
  },
  texto: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
