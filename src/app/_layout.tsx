import { Stack } from 'expo-router';
import { TodoProvider } from '../context/TodoContext';

export default function RootLayout() {
  return (
    <TodoProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Mina Todos' }} />
        <Stack.Screen name="add" options={{ title: 'Skapa Todo', presentation: 'modal' }} />
        <Stack.Screen name="details" options={{ title: 'Todo-detaljer' }} />
      </Stack>
    </TodoProvider>
  );
}