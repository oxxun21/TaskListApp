import { StatusBar } from "expo-status-bar";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import AsnyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";

const STORAGE_KEY = "@todos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState();
  const work = () => setWorking(true);
  const todo = () => setWorking(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const onChangeText = (payload) => setText(payload);

  const saveTodos = async (toSave) => {
    await AsnyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadTodos = async () => {
    const s = await AsnyncStorage.getItem(STORAGE_KEY);
    s !== null ? setTodos(JSON.parse(s)) : null;
  };

  const addTodo = async () => {
    if (text === "") {
      return;
    }
    const newTodos = { ...todos, [Date.now()]: { text, work: working } };
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText("");
  };

  const deleteTodo = async (key) => {
    Alert.alert("Delete TODO", "TODO를 삭제하시겠습니까?", [
      {
        text: "Cancel",
      },
      {
        text: "Ok",
        style: "destructive",
        onPress: async () => {
          const newTodos = { ...todos };
          delete newTodos[key];
          setTodos(newTodos);
          await saveTodos(newTodos);
        },
      },
    ]);
    return;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? "#fff" : theme.grey }}>WORK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={todo}>
          <Text style={{ ...styles.btnText, color: !working ? "#fff" : theme.grey }}>TODO</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="내용을 추가하세요" onChangeText={onChangeText} value={text} onSubmitEditing={addTodo} returnKeyType="done" />
      <ScrollView>
        {Object.keys(todos).map((key) =>
          todos[key].work === working ? (
            <View style={styles.todo} key={key}>
              <Text style={styles.todoText}>{todos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteTodo(key)}>
                <Text>
                  <Fontisto name="trash" size={18} color="red" />
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: 600,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 16,
  },
  todo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
  },
});
