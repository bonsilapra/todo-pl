import React from "react";

const Form = ({inputText, setInputText, todos, setTodos, setStatus}) => {

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    };

    const submitTodoHandler = (e) => {
        e.preventDefault();
        {inputText!="" &&
        setTodos([
            ...todos, 
            {text: inputText, completed: false, removed: false, id:Math.random()*1000}
        ])
        }
        setInputText("")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submitTodoHandler()
        }
    }

    const statusHandler = (e) => {
        setStatus(e.target.value)
    }

    return (
        <form className="main-form">
            <div className="form-input">
                <input 
                    value={inputText}
                    type="text" 
                    className="todo-input"
                    onChange={inputTextHandler}
                    placeholder="Dodaj nowe zadanie"
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="form-todo-button">
                <button 
                    className="todo-button" 
                    type="submit"
                    onClick={submitTodoHandler}
                    title="Add task"
                >
                    <i className="fas fa-plus-square"></i>
                </button>
            </div>
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">Wszystkie</option>
                    <option value="completed">Pilne</option>
                    <option value="uncompleted">Zwykłe</option>
                </select>
            </div>
        </form>
    );
}

export default Form;