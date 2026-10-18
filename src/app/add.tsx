import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { useTodos } from "../context/TodoContext";

export default function AddTodoScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { addTodo } = useTodos();
  const router = useRouter();

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }

    addTodo(title, description, category);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View testID="add-screen" style={styles.container}>
      <Text style={styles.label}>Titel *</Text>
      <TextInput
        testID="todo-input"
        style={styles.input}
        placeholder="T.ex. Handla mat"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Beskrivning</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="T.ex. Mjölk, bröd och ägg"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        placeholder="T.ex. Handling, Arbete, Hälsa"
        value={category}
        onChangeText={setCategory}
      />

      <Pressable testID="save-todo" style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Spara Todo</Text>
      </Pressable>

      <Pressable
        testID="cancel-add"
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={styles.cancelButtonText}>Avbryt</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#e5e7eb",
  },
  cancelButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "bold",
  },
});
