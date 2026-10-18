import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTodos } from "../context/TodoContext";
import { Todo } from "../types/todo";

export default function HomeScreen() {
  const { todos, toggleTodo } = useTodos();
  const router = useRouter();

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <Pressable
      testID="todo-row"
      style={[styles.todoCard, item.completed && styles.todoCardCompleted]}
      onPress={() =>
        router.push({ pathname: "/details", params: { id: item.id } })
      }
    >
      <View style={styles.todoContent}>
        <Text
          style={[styles.todoTitle, item.completed && styles.completedText]}
        >
          {item.title}
        </Text>
        {item.description ? (
          <Text style={styles.todoDescription} numberOfLines={1}>
            {item.description}
          </Text>
        ) : null}
      </View>

      <Pressable
        style={styles.statusBadge}
        onPress={(e) => {
          e.stopPropagation();
          toggleTodo(item.id);
        }}
      >
        <Text
          testID="todo-status"
          style={[
            styles.statusText,
            item.completed ? styles.statusCompleted : styles.statusPending,
          ]}
        >
          {item.completed ? "Genomförd" : "Ej genomförd"}
        </Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View testID="home-screen" style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderTodoItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Inga todos ännu! Skapa en ny.</Text>
        }
      />
      <Pressable
        testID="add-todo"
        style={styles.fab}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 16,
  },
  todoCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  todoCardCompleted: {
    backgroundColor: "#f0fdf4",
  },
  todoContent: {
    flex: 1,
    marginRight: 12,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  todoDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  statusCompleted: {
    color: "#16a34a",
  },
  statusPending: {
    color: "#2563eb",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 28,
  },
});
