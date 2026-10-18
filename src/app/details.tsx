import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTodos } from '../context/TodoContext';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const router = useRouter();

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return (
      <View style={styles.container} testID="detail-screen">
        <Text style={styles.errorText}>
          Hittade inte den valda todon.
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
    deleteTodo(todo.id);
    router.back();
  };

  return (
    <View style={styles.container} testID="detail-screen">
      <View style={styles.card}>
        <Text style={styles.categoryBadge}>
          {todo.category || 'Övrigt'}
        </Text>

        <Text style={styles.title} testID="todo-title">
          {todo.title}
        </Text>

        {todo.description ? (
          <Text style={styles.description}>
            {todo.description}
          </Text>
        ) : (
          <Text style={styles.noDescription}>
            Ingen beskrivning angiven.
          </Text>
        )}

        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Status:</Text>

          <Text
            testID="todo-status"
            style={[
              styles.statusValue,
              todo.completed ? styles.completed : styles.pending,
            ]}
          >
            {todo.completed ? 'Genomförd' : 'Ej genomförd'}
          </Text>
        </View>

        <Text style={styles.dateText}>
          Skapad: {new Date(todo.createdAt).toLocaleString('sv-SE')}
        </Text>
      </View>

      <Pressable
        testID="toggle-todo"
        style={[styles.button, styles.toggleButton]}
        onPress={() => toggleTodo(todo.id)}
      >
        <Text style={styles.buttonText}>
          {todo.completed ? 'Markera som ej klar' : 'Markera som klar'}
        </Text>
      </Pressable>

      <Pressable
        testID="delete-todo"
        style={[styles.button, styles.deleteButton]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Radera Todo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
    color: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    lineHeight: 22,
  },
  noDescription: {
    fontSize: 14,
    color: '#aaa',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  completed: {
    color: '#2e7d32',
  },
  pending: {
    color: '#d32f2f',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
});