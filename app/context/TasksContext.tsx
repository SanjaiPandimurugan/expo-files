import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignedBy: string;
  assignedTo: string;
  location: string;
  category: string;
  notes?: string;
  createdAt: string;
}

// Define the context interface
interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  loading: boolean;
}

// Create the context
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Create a provider component
export const TasksProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from AsyncStorage on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from storage', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to storage', error);
      }
    };

    // Only save if the tasks array has items and we're not in the initial loading phase
    if (tasks.length > 0 && !loading) {
      saveTasks();
    }
  }, [tasks, loading]);

  // Add a new task
  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(), // Generate a unique ID
      createdAt: new Date().toISOString(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  // Update an existing task
  const updateTask = async (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Delete a task
  const deleteTask = async (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, loading }}>
      {children}
    </TasksContext.Provider>
  );
};

// Create a custom hook for using this context
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}; 