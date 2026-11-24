import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Índice de Prácticas' }} />
      <Stack.Screen name="practica04" options={{ title: 'Práctica 4' }} />
      <Stack.Screen name="practica05" options={{ title: 'Práctica 5' }} />
      <Stack.Screen name="practica06" options={{ title: 'Práctica 6' }} />
      <Stack.Screen name="practica07" options={{ title: 'Práctica 7' }} />
      <Stack.Screen name="practica08" options={{ title: 'Práctica 8' }} />
      <Stack.Screen name="practica09" options={{ title: 'Práctica 9' }} />
      <Stack.Screen name="practica091" options={{ title: 'Práctica 9.1' }} />
      <Stack.Screen name="practica10" options={{ title: 'Práctica 10' }} />
      <Stack.Screen name="practica11" options={{ title: 'Práctica 11' }} />
      <Stack.Screen name="practica12" options={{ title: 'Práctica 12' }} />
      <Stack.Screen name="practica13" options={{ title: 'Práctica 13' }} />

    </Stack>
  );
}
