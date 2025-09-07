'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TodoItem from '@/components/TodoItem';
import TodoForm from '@/components/TodoForm';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/todos/`;

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login');
      return;
    }

    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>(API_URL, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [router]);

  const handleAddTodo = async (title: string, description: string) => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.post<Todo>(API_URL, {
        title,
        description,
        completed: false,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTodos([...todos, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const authToken = localStorage.getItem('authToken');
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) return;
    try {
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await axios.put(`${API_URL}${id}/`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error toggling complete status:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const authToken = localStorage.getItem('authToken');
    try {
      await axios.delete(`${API_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">To-Do:</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 transition-colors duration-200"
            >
              Add
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found. Add a new one to get started!</p>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem
                  todo={todo}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTodo}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {showForm && <TodoForm onAddTask={handleAddTodo} onClose={() => setShowForm(false)} />}
    </main>
  );
}