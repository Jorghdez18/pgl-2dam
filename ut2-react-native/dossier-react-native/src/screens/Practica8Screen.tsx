import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Practica8Screen() {
  const [colores, setColores] = useState<string[]>([]);
  const [direccion, setDireccion] = useState<'row' | 'column'>('row');
  const [envoltura, setEnvoltura] = useState<'wrap' | 'nowrap'>('wrap');

  const anadirCirculo = () => {
    const indice = colores.length;
    const r = Math.min(255, (indice * 35) % 260);
    const g = Math.min(255, 80 + ((indice * 25) % 180));
    const b = Math.min(255, 220 - ((indice * 20) % 200));

    const nuevoColor = `rgb(${r}, ${g}, ${b})`;
    setColores(prev => [...prev, nuevoColor]);
  };

  const alternarDireccion = () => {
    setDireccion(prev => (prev === 'row' ? 'column' : 'row'));
  };

  const alternarEnvoltura = () => {
    setEnvoltura(prev => (prev === 'wrap' ? 'nowrap' : 'wrap'));
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Práctica 8: Círculos Dinámicos</Text>

      <View style={styles.panelControles}>
        <TouchableOpacity style={styles.botonAnadir} onPress={anadirCirculo}>
          <Text style={styles.textoBoton}>+ Círculo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonControl} onPress={alternarDireccion}>
          <Text style={styles.textoBoton}>Dir: {direccion}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonControl} onPress={alternarEnvoltura}>
          <Text style={styles.textoBoton}>Wrap: {envoltura}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.escenario,
          { flexDirection: direccion, flexWrap: envoltura },
        ]}
      >
        {colores.map((color, index) => (
          <View
            key={index}
            style={[styles.circulo, { backgroundColor: color }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  panelControles: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  botonAnadir: {
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  botonControl: {
    backgroundColor: '#1565c0',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  escenario: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  circulo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
