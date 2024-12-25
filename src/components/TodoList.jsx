import { useState } from "react";
import TodoItem from "./TodoItem";
import "./style.css";

const TodoList = ({ todoList, setTodoList }) => {
    const [input, setInput] = useState("");
    const [editTodoIndex, setEditTodoIndex] = useState(-1);
    const [editMode, setEditMode] = useState(false);
    const date = new Date();

    const handleAddTodo = () => {
        if (input.trim() == "") {
            alert("Add something ");
        } else {
            let data = {
                title: input,
                id: date,
                strike: false,
            };

            setTodoList([...todoList, data]);
            setInput("");
        }
    };

    const handleEdit = (id) => {
        const tempArr = [...todoList];
        let index = tempArr.findIndex((item) => item.id == id);
        setEditMode(true);
        setInput(tempArr[index].title);
        setEditTodoIndex(index);
    };

    const handleUpdateTodo = () => {
        if (input.trim() == "") {
            alert("please add something ");
            return;
        } else {
            const tempArr = [...todoList];
            tempArr[editTodoIndex].title = input;
            setTodoList(tempArr);
            setEditMode(false);
            setInput("");
        }
    };

    return (
        <>
            <div className="px-2 sm:px-8 py-4 ">
                <div className="todoContainer shadow-lg my-14 border   sm:w-[85%] w-[100%] md:w-[70%] lg:w-[43%] mx-auto px-2 py-4 sm:px-4">
                    <div className="todoOperation">
                        <h2 className="font-bold text-2xl">Todo List </h2>
                        <div className="input relative border my-4">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="outline-none w-full border border-black relative py-2 pr-20 px-2"
                                type="text"
                                placeholder="Add your Task"
                            />
                            <button
                                onClick={editMode ? handleUpdateTodo : handleAddTodo}
                                className="absolute top-0 right-0 py-2 px-6 bg-red-400 border border-black "
                            >
                                {!editMode ? "Add" : "Update"}
                            </button>
                        </div>
                    </div>
                    {todoList.length !== 0 ? (
                    todoList.map((item) => (
                        <TodoItem
                            todoList={todoList}
                            setTodoList={setTodoList}
                            item={item}
                            key={item.id}
                            handleEdit={handleEdit}
                        />
                    ))
                    ) : (
                        <h2 className="font-semibold text-red-500">
                            Please add some task in Todo.{" "}
                        </h2>
                    )}
                </div>
            </div>
        </>
    );
};

export default TodoList;