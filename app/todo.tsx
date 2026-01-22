import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Appbar,
  Button,
  Checkbox,
  List,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = {
  id: string;
  title: string;
  completed: Boolean;
};

export default function ToDoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState("");

  function openEdit(todo: Todo) {
    setEditTodo(todo);
    setEditText(todo.title);
    setEditVisible(true);
  }

  async function saveEdit() {
    if (!editTodo) return;

    const updatedTodos = todos.map((todo) =>
      todo.id === editTodo.id ? { ...todo, title: editText } : todo,
    );

    setTodos(updatedTodos);
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));

    setEditVisible(false);
    setEditTodo(null);
    setEditText("");
  }

  async function loadTodo() {
    const storedTodos = await AsyncStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setLoading(true);
  }

  useEffect(() => {
    loadTodo();
  }, []);

  async function addTodo() {
    const newTodo: Todo = {
      id: Math.random().toString(),
      title: input,
      completed: false,
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    setInput("");

    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos)); // array to string
  }

  async function deleteTodo(id: string) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  async function toggleTodo(id: string) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="todo" />
      </Appbar.Header>
      <View style={{ padding: 16 }}>
        <Surface style={{ padding: 16, borderRadius: 12, elevation: 4 }}>
          <TextInput
            label="New Todo"
            onChangeText={setInput}
            value={input}
            mode="outlined"
            right={<TextInput.Icon icon="plus" onPress={addTodo} />}
          ></TextInput>
        </Surface>

        <ScrollView style={{ marginTop: 16, height: "80%" }}>
          {todos.map((todo) => (
            <Surface
              key={todo.id}
              style={{
                marginTop: 16,
                padding: 16,
                borderRadius: 12,
                elevation: 4,
              }}
            >
              <List.Item
                title={() => <Text>{todo.title}</Text>}
                right={() => (
                  <Appbar.Action
                    icon="delete"
                    onPress={() => {
                      deleteTodo(todo.id);
                    }}
                  />
                )}
                left={() => (
                  <Checkbox
                    status={todo.completed ? "checked" : "unchecked"}
                    onPress={() => {
                      toggleTodo(todo.id);
                    }}
                  />
                )}
              />

              <View
                style={{
                  marginTop: 8,
                  alignItems: "flex-end",
                }}
              >
                <Button icon="pencil" onPress={() => openEdit(todo)}>
                  Edit
                </Button>
              </View>
            </Surface>
          ))}

          <Portal>
            <Modal
              visible={editVisible}
              onDismiss={() => setEditVisible(false)}
              contentContainerStyle={{
                margin: 20,
                borderRadius: 12,
              }}
            >
              <Surface
                style={{
                  padding: 20,
                  borderRadius: 12,
                  elevation: 4,
                }}
              >
                <Text variant="titleMedium">Edit Todo</Text>

                <TextInput
                  value={editText}
                  onChangeText={setEditText}
                  mode="outlined"
                  style={{ marginTop: 12 }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 16,
                  }}
                >
                  <Button onPress={() => setEditVisible(false)}>Cancel</Button>
                  <Button onPress={saveEdit} disabled={!editText.trim()}>
                    Save
                  </Button>
                </View>
              </Surface>
            </Modal>
          </Portal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
