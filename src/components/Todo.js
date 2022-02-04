import React, { useState } from "react";

const Todo = ({text, todo, todos, setTodos }) => {
    
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const deleteHandler = () => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, removed: true
                }
            }
            return item;
        }))
        setTimeout(() => {
            setTodos(todos.filter((element) => element.id !== todo.id))
        }, 500);
    };

    const inputTextHandler = (e) => {
        setEdit({
            value: e.target.value,
            id: todo.id
        })
    };

    const submitUpdate = () => {
        updateTodo(edit.id, edit.value);
        setEdit({
            id: null,
            value: ''
        })
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue || "" || /^\s*$/.test(newValue)) {
            return;
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? ({id: item.id, completed:item.completed, text: newValue}) : ({id: item.id, completed: item.completed, text: item.text}))));
    };

    const completeHandler = () => {
        setTodos(todos.map((item) => {
            if (item.id === todo.id) {
                return {
                    ...item, completed: !item.completed
                }
            }
            return item;
        }))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            submitUpdate()
        }
    }

    return (
        <>
        {edit.id  ?
            (<form className="form-edit">
                <input 
                    autoFocus
                    value={edit.value}
                    type="text" 
                    className="todo-edit"
                    onChange={inputTextHandler}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    className="complete-btn-edit" 
                    type="submit"
                    onClick={submitUpdate}
                    title="Zapisz zmiany"
                >
                    <i className="fas fa-check"></i>
                </button>
            </form>):
            (<div className={`todo ${todo.completed ? "completed" : ''} ${todo.removed ? "fall" : ''}` } >
                <li className='todo-item'>{text}</li>
                <div style={{display:"flex"}}>
                    {todo.completed ?
                    (<button 
                        onClick={completeHandler}
                        className={`not-important-btn ${todo.completed ? "btn-completed" : ''}`}
                        title="Zwykłe"
                    >
                        <i className="fas fa-exclamation"></i>
                    </button>):
                    (<button 
                        onClick={completeHandler}
                        className="important-btn"
                        title="Pilne"
                    >
                        <i className="fas fa-ellipsis-h"></i>
                    </button>)
                    }
                    <button 
                        onClick={() => setEdit({id: todo.id, value: todo.text})} 
                        className={`edit-btn ${todo.completed ? "btn-completed" : ''}`}
                        title="Edytuj"
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    <button 
                        onClick={deleteHandler} 
                        className={`trash-btn ${todo.completed ? "btn-completed" : ''}`}
                        title="Zrobione!"
                    >
                        <i className="fas fa-check"></i>
                    </button>
                </div>
            </div>)
        }
        </>
    );
};

export default Todo;