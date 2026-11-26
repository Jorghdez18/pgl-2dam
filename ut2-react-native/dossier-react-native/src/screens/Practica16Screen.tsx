import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
};

const PRODUCTOS: Producto[] = [
  { id: '1', nombre: 'Teclado Mecánico RGB', precio: 59.99, stock: 14 },
  { id: '2', nombre: 'Ratón Inalámbrico Pro', precio: 34.5, stock: 28 },
  { id: '3', nombre: 'Monitor 27" 144Hz', precio: 219.0, stock: 6 },
  { id: '4', nombre: 'Auriculares Gaming 7.1', precio: 49.95, stock: 19 },
  { id: '5', nombre: 'Alfombrilla XL Antideslizante', precio: 15.0, stock: 42 },
  { id: '6', nombre: 'Webcam Full HD 1080p', precio: 39.9, stock: 11 },
  { id: '7', nombre: 'Micrófono Condensador USB', precio: 64.0, stock: 8 },
  { id: '8', nombre: 'Soporte Articulado Monitor', precio: 29.99, stock: 17 },
  { id: '9', nombre: 'Hub USB-C 7 en 1', precio: 24.5, stock: 31 },
  { id: '10', nombre: 'Disco SSD NVMe 1TB', precio: 74.9, stock: 22 },
];

export default function Practica16Screen() {
  return (
    <SafeAreaView style={styles.contenedor}>
      <FlatList
        data={PRODUCTOS}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Text style={styles.cabecera}>Lista Productos</Text>
        }
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.fila,
              { backgroundColor: index % 2 === 0 ? '#ffffff' : '#e3f2fd' },
            ]}
          >
            <Text style={styles.nombre}>{item.nombre}</Text>
            <View style={styles.detalles}>
              <Text style={styles.precio}>{item.precio.toFixed(2)} €</Text>
              <Text style={styles.stock}>Stock: {item.stock} uds.</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cabecera: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 18,
    color: '#0d47a1',
    backgroundColor: '#f5f5f5',
  },
  fila: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    flex: 1,
    paddingRight: 10,
  },
  detalles: {
    alignItems: 'flex-end',
    gap: 4,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565c0',
  },
  stock: {
    fontSize: 13,
    color: '#616161',
  },
});
