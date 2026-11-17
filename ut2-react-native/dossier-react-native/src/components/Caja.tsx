import { StyleSheet, Text, View } from 'react-native';

type Props = { 
  nombre: string; 
  bg?: string; 
};

export default function Caja({ nombre, bg = 'green' }: Props) {
  return (
    <View style={[styles.caja, { backgroundColor: bg }]}>
      <Text style={styles.texto}>{nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: { 
    height: 100, 
    width: 100, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 8,
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
