import React, { createContext, useContext, useState } from 'react';
import { Todo } from '../types/todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, description?: string, category?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      title: 'Köpa mjölk',
      description: 'Kom ihåg lättmjölk',
      completed: false,
      category: 'Handling',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Träna',
      description: 'Gym – benpass',
      completed: true,
      category: 'Hälsa',
      createdAt: new Date().toISOString(),
    },
  ]);

  const addTodo = (title: string, description?: string, category?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      category: category || 'Övrigt',
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos måste användas inom en TodoProvider');
  }
  return context;
};