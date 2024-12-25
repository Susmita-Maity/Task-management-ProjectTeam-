import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import "./style.css";

const TodoItem = ({ item, todoList, setTodoList, handleEdit }) => {
        const handleStrike = (id) => {
            const tempArr = [...todoList];
            let index = tempArr.findIndex((item) => item.id == id);

            tempArr[index].strike = !tempArr[index].strike;
            setTodoList(tempArr);
        };

        const handleDelete = (id) => { 
            setTodoList(todoList.filter((item) => item.id !== id));
        };

    return (
        <>
            <div className="todo border py-4  px-2 flex justify-between items-center my-4 shadow-lg">
                <div className="data flex  gap-2 xs:gap-4 items-center w-[80%]">
                    <input
                        onChange={() => handleStrike(item.id)}
                        type="checkbox"
                        checked={item.strike ? true : false}
                        className={`w-[15px] h-[15px] xs:w-[20px] xs:h-[20px] appearance-none bg-white border-2 border-red-500 rounded checked:bg-red-500 checked:border-red-500`}
                        name=""
                        id=""
                    />

                    <h2
                        className={`font-semibold   xs:text-[18px] w-[90%] break-words ${
                        item.strike
                        ? "line-through decoration-black text-black font-normal"
                        : ""
                        }`}
                    >
                    {item.title}
                    </h2>
                </div>

                <div className="operations flex gap-2 sm:gap-6 xs:px-4 items-center sm:w-[20%]">
                    <button>
                        <BiEditAlt onClick={() => handleEdit(item.id)} size={"20px"} />
                    </button>
                    <button>
                        <MdDeleteForever
                            onClick={() => handleDelete(item.id)}
                            size={"20px"}
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default TodoItem;