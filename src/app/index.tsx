import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";

type Todo = { id: string; text: string; done: boolean; created_at: string };

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Fetch error:", error);
      Alert.alert("Error", "Failed to load todos.");
    } else {
      setTodos(data || []);
    }

    setLoading(false);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    const { error } = await supabase.from("todos").insert([{ text: task.trim() }]);
    if (error) {
      console.log("Add error:", error);
      Alert.alert("Error", "Failed to add todo.");
    }
    setTask("");
  };

  const toggleTodo = async (id: string, done: boolean) => {
    const { error } = await supabase.from("todos").update({ done: !done }).eq("id", id);
    if (error) {
      console.log("Update error:", error);
      Alert.alert("Error", "Failed to update todo status.");
    }
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.log("Delete error:", error);
      Alert.alert("Error", "Failed to delete todo.");
    }
  };

  useEffect(() => {
    fetchTodos();

    const channel = supabase
      .channel("todos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        (payload) => {
          console.log("Realtime event:", payload);

          setTodos((current) => {
            if (payload.eventType === "INSERT") {
              return [payload.new as Todo, ...current];
            }
            if (payload.eventType === "UPDATE") {
              return current.map((t) =>
                t.id === payload.new.id ? (payload.new as Todo) : t
              );
            }
            if (payload.eventType === "DELETE") {
              return current.filter((t) => t.id !== payload.old.id);
            }
            return current;
          });
        }
      )
      .subscribe((status) => console.log("Channel status:", status));

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <View className="flex-1 bg-gray-100 p-6 pt-16">
      <Text className="text-3xl font-bold text-center mb-6 text-blue-600">📝 Todo App</Text>

      <View className="flex-row mb-4">
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Add a new task..."
          className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-base"
        />
        <TouchableOpacity onPress={addTodo} className="ml-2 justify-center">
          <Ionicons name="add-circle" size={40} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" className="mt-10" />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-10">No tasks yet</Text>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-white p-3 rounded-xl mb-2 border border-gray-200">
              <TouchableOpacity onPress={() => toggleTodo(item.id, item.done)} className="flex-1">
                <Text
                  className={`text-base ${item.done ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Ionicons name="trash" size={22} color="#ef4444" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
