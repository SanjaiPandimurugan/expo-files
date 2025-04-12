import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useTasks } from '../../context/TasksContext';

export default function AshaDashboard() {
  const router = useRouter();
  const { tasks, loading } = useTasks();
  const [displayTasks, setDisplayTasks] = useState<any[]>([]);
  
  // Process tasks from the context
  useEffect(() => {
    const todayDate = new Date().toLocaleDateString();
    const yesterdayDate = new Date(Date.now() - 86400000).toLocaleDateString();
    const tomorrowDate = new Date(Date.now() + 86400000).toLocaleDateString();
    
    // Sort tasks by priority and due date, and limit to the most recent tasks
    const processedTasks = [...tasks]
      .sort((a, b) => {
        // First sort by status (overdue at the top)
        if (a.status === 'overdue' && b.status !== 'overdue') return -1;
        if (a.status !== 'overdue' && b.status === 'overdue') return 1;
        
        // Then sort by priority
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .slice(0, 4) // Limit to 4 tasks for the dashboard
      .map(task => {
        // Convert dates to more readable format
        let displayDate = task.dueDate;
        if (new Date(task.dueDate).toLocaleDateString() === todayDate) {
          displayDate = 'Today';
        } else if (new Date(task.dueDate).toLocaleDateString() === yesterdayDate) {
          displayDate = 'Yesterday';
        } else if (new Date(task.dueDate).toLocaleDateString() === tomorrowDate) {
          displayDate = 'Tomorrow';
        }
        
        return {
          ...task,
          displayDate
        };
      });
    
    setDisplayTasks(processedTasks);
  }, [tasks]);

  // Define type-safe icons
  const stats = [
    { label: 'Pregnant Women', count: 12, icon: 'heart-outline' as const },
    { label: 'Children Under 5', count: 28, icon: 'body-outline' as const },
    { label: 'Visits This Week', count: 15, icon: 'home-outline' as const },
    { label: 'Immunizations', count: 8, icon: 'medical-outline' as const },
  ];

  // Performance metrics
  const performance = {
    rating: 4.8,
    tasksCompleted: tasks.filter(task => task.status === 'completed').length,
    casesManaged: 284,
    successRate: '94%'
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <Header
        title="ASHA Dashboard"
        showBack={false}
        showLogo={true}
        rightElement={
          <TouchableOpacity 
            className="mr-3"
            onPress={() => router.push('/screens/asha/profile')}
          >
            <Ionicons name="person-circle-outline" size={28} color="white" />
          </TouchableOpacity>
        }
      />
      <ScrollView className="flex-1 bg-slate-50">
        <View className="p-4 bg-indigo-600">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-white text-lg">Welcome back,</Text>
              <Text className="text-white text-2xl font-bold">Anjali</Text>
            </View>
            <TouchableOpacity 
              className="bg-white/20 p-2 rounded-full"
              onPress={() => router.push('/screens/asha/profile')}
            >
              <Ionicons name="person" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <Text className="text-gray-800 font-semibold mb-3">Today's Summary</Text>
            <View className="flex-row justify-between">
              {stats.map((stat, index) => (
                <View key={index} className="items-center">
                  <View className="bg-indigo-100 w-12 h-12 rounded-full items-center justify-center mb-1">
                    <Ionicons name={stat.icon} size={20} color="#4f46e5" />
                  </View>
                  <Text className="text-2xl font-bold text-gray-800">{stat.count}</Text>
                  <Text className="text-xs text-gray-500">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="p-4">
          {/* Performance Card */}
          <View className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold text-gray-800">My Performance</Text>
              <Link href="/screens/asha/profile" asChild>
                <TouchableOpacity>
                  <Text className="text-indigo-600">View Details</Text>
                </TouchableOpacity>
              </Link>
            </View>
            
            <View className="flex-row justify-between mt-2">
              <View className="items-center flex-1">
                <View className="flex-row items-center">
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text className="text-2xl font-bold text-gray-800 ml-1">{performance.rating}</Text>
                </View>
                <Text className="text-xs text-gray-500">Rating</Text>
              </View>
              
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-gray-800">{performance.tasksCompleted}</Text>
                <Text className="text-xs text-gray-500">Tasks</Text>
              </View>
              
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-gray-800">{performance.casesManaged}</Text>
                <Text className="text-xs text-gray-500">Cases</Text>
              </View>
              
              <View className="items-center flex-1">
                <Text className="text-2xl font-bold text-gray-800">{performance.successRate}</Text>
                <Text className="text-xs text-gray-500">Success</Text>
              </View>
            </View>
          </View>
          
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-gray-800">Tasks</Text>
            <Link href="/screens/asha/tasks" asChild>
              <TouchableOpacity>
                <Text className="text-indigo-600">See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          {loading ? (
            <View className="items-center justify-center py-6">
              <ActivityIndicator size="large" color="#4f46e5" />
              <Text className="text-gray-500 mt-2">Loading tasks...</Text>
            </View>
          ) : displayTasks.length > 0 ? (
            displayTasks.map((task) => (
              <TouchableOpacity 
                key={task.id} 
                className={`mb-3 p-4 bg-white rounded-lg border-l-4 ${
                  task.status === 'overdue' ? 'border-red-500' : 
                  task.status === 'in-progress' ? 'border-blue-500' :
                  task.status === 'completed' ? 'border-green-500' :
                  task.displayDate === 'Tomorrow' ? 'border-yellow-500' : 'border-indigo-500'
                } shadow-sm`}
                onPress={() => router.push('/screens/asha/tasks')}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-gray-800 font-medium">{task.title}</Text>
                    <Text className="text-gray-500 text-sm">Due: {task.displayDate}</Text>
                  </View>
                  <View 
                    className={`px-2 py-1 rounded-full ${
                      task.status === 'overdue' ? 'bg-red-100' : 
                      task.status === 'in-progress' ? 'bg-blue-100' :
                      task.status === 'completed' ? 'bg-green-100' :
                      task.displayDate === 'Tomorrow' ? 'bg-yellow-100' : 'bg-indigo-100'
                    }`}
                  >
                    <Text 
                      className={`text-xs font-medium ${
                        task.status === 'overdue' ? 'text-red-600' : 
                        task.status === 'in-progress' ? 'text-blue-600' :
                        task.status === 'completed' ? 'text-green-600' :
                        task.displayDate === 'Tomorrow' ? 'text-yellow-600' : 'text-indigo-600'
                      }`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center justify-center bg-white p-6 rounded-lg mb-4">
              <Ionicons name="calendar-outline" size={48} color="#d1d5db" />
              <Text className="text-gray-500 mt-2 mb-4 text-center">No tasks yet</Text>
              <Text className="text-gray-400 text-center text-sm mb-2">
                Create your first task to start tracking your work
              </Text>
            </View>
          )}

          {/* Add Task Button */}
          <TouchableOpacity
            className="bg-indigo-50 p-3 rounded-lg flex-row justify-center items-center mb-6"
            onPress={() => router.push('/screens/asha/create-task')}
          >
            <Ionicons name="add-circle-outline" size={20} color="#4f46e5" />
            <Text className="text-indigo-700 font-medium ml-2">Create New Task</Text>
          </TouchableOpacity>

          <View className="mt-2">
            <Text className="text-xl font-semibold text-gray-800 mb-4">Services</Text>
            <View className="flex-row flex-wrap justify-between">
              <Link href="/screens/asha/maternal" asChild>
                <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
                  <View className="bg-pink-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="heart" size={20} color="#ec4899" />
                  </View>
                  <Text className="text-gray-800 font-medium">Maternal Health</Text>
                  <Text className="text-xs text-gray-500 mt-1">Pre and post natal care</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/screens/asha/child" asChild>
                <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
                  <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="body" size={20} color="#3b82f6" />
                  </View>
                  <Text className="text-gray-800 font-medium">Child Health</Text>
                  <Text className="text-xs text-gray-500 mt-1">Growth and immunization</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/screens/asha/counseling" asChild>
                <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
                  <View className="bg-purple-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="chatbubbles" size={20} color="#8b5cf6" />
                  </View>
                  <Text className="text-gray-800 font-medium">Counseling</Text>
                  <Text className="text-xs text-gray-500 mt-1">Health education</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href="/screens/asha/medicine" asChild>
                <TouchableOpacity className="w-[48%] bg-white p-4 rounded-lg shadow-sm mb-4">
                  <View className="bg-green-100 w-10 h-10 rounded-full items-center justify-center mb-2">
                    <Ionicons name="medkit" size={20} color="#10b981" />
                  </View>
                  <Text className="text-gray-800 font-medium">Medicine</Text>
                  <Text className="text-xs text-gray-500 mt-1">Inventory & distribution</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
} 