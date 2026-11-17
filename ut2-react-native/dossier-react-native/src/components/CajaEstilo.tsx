import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  nombre: string;
  style?: StyleProp<ViewStyle>;
};

export default function CajaEstilo({ nombre, style }: Props) {
  return (
    <View style={[styles.porDefecto, style]}>
      <Text style={styles.texto}>{nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  porDefecto: {
    height: 110,
    width: 150,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0d47a1',
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
