import { useState, useEffect } from 'react';
import './App.css';
import { TodoProvider } from './Context/TodoContext';
import TodoItem from './Components/TodoItem';


//import { TodoItem} from './Components/Todoitem';
import { TodoForm } from './Components';
//import TodoForm from './Components/TodoForm'; // Ensure this path is correct
//import TodoItem from './Components/TodoItem'; // Ensure this path is correct

function App() {
    const [todos, settodos] = useState([]);

    const AddTodo = (todo) => {
        settodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    const Updatetodo = (id, todo) => {
        settodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
            )
        );
    };

    const deleteTodo = (id) => {
        settodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const toggleCompleted = (id) => {
        settodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo
            )
        );
    };

    // Managing local storage
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos && todos.length > 0) {
            settodos(todos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoProvider value={{ AddTodo, Updatetodo, deleteTodo, toggleCompleted }}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                        Manage Your Todos
                    </h1>
                    <div className="mb-4">
                        {/* Todo form */}
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/* Loop and render TodoItem */}
                        {todos.map((todo) => (
                            <div key={todo.id} className="w-full">
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;
