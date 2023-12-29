import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});
  const work = () => setWorking(true);
  const todo = () => setWorking(false);

  const onChangeText = (payload) => setText(payload);

  const addTodo = () => {
    if (text === "") {
      return;
    }
    const newTodos = { ...todos, [Date.now()]: { text, work: working } };
    setTodos(newTodos);
    setText("");
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
        {Object.keys(todos).map((key) => (
          <View style={styles.todo} key={key}>
            <Text style={styles.todoText}>{todos[key].text}</Text>
          </View>
        ))}
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
  },
  todoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
  },
});
