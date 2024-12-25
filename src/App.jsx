import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoItem-20242210")) || []
  );
  localStorage.setItem("todoItem-20242210", JSON.stringify(todoList));

  return (
    <>
      <Header />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </>
  )
}

export default App
