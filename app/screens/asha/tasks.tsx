import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, ActivityIndicator, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useTasks } from '../../context/TasksContext';
import { Task } from '../../context/TasksContext';

export default function AshaTasks() {
  const router = useRouter();
  const { tasks, updateTask, deleteTask, loading } = useTasks();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskStatus, setTaskStatus] = useState('');
  const [taskNotes, setTaskNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter tasks based on status and search query
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle task status update
  const handleUpdateTask = async () => {
    if (selectedTask && taskStatus) {
      try {
        setIsSubmitting(true);
        
        // Create the updated task object
        const updatedTask: Task = {
          ...selectedTask,
          status: taskStatus as any,
          notes: taskNotes
        };
        
        // Update the task using our context
        await updateTask(updatedTask);
        
        // Close the modal and reset form
        setShowUpdateModal(false);
        setSelectedTask(null);
        setTaskStatus('');
        setTaskNotes('');
      } catch (error) {
        console.error('Error updating task:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Open update modal for a task
  const openUpdateModal = (task: Task) => {
    setSelectedTask(task);
    setTaskStatus(task.status);
    setTaskNotes(task.notes || '');
    setShowUpdateModal(true);
  };

  // Handle task deletion with confirmation
  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${taskTitle}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(taskId);
              Alert.alert('Success', 'Task deleted successfully');
            } catch (error) {
              console.error('Error deleting task:', error);
              Alert.alert('Error', 'Failed to delete task. Please try again.');
            }
          }
        }
      ]
    );
  };

  // Render priority indicator
  const renderPriorityIndicator = (priority: 'high' | 'medium' | 'low') => {
    let color = '';
    let label = '';
    
    switch (priority) {
      case 'high':
        color = 'bg-red-500';
        label = 'High';
        break;
      case 'medium':
        color = 'bg-yellow-500';
        label = 'Medium';
        break;
      case 'low':
        color = 'bg-green-500';
        label = 'Low';
        break;
    }
    
    return (
      <View className="flex-row items-center">
        <View className={`w-2 h-2 rounded-full ${color} mr-1`} />
        <Text className="text-xs text-gray-600">{label}</Text>
      </View>
    );
  };

  // Render status badge
  const renderStatusBadge = (status: 'pending' | 'completed' | 'in-progress' | 'overdue') => {
    let bgColor = '';
    let textColor = '';
    
    switch (status) {
      case 'pending':
        bgColor = 'bg-indigo-100';
        textColor = 'text-indigo-600';
        break;
      case 'completed':
        bgColor = 'bg-green-100';
        textColor = 'text-green-600';
        break;
      case 'in-progress':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-600';
        break;
      case 'overdue':
        bgColor = 'bg-red-100';
        textColor = 'text-red-600';
        break;
    }
    
    return (
      <View className={`px-2 py-1 rounded-full ${bgColor}`}>
        <Text className={`text-xs font-medium ${textColor}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header 
        title="My Tasks" 
        showBack={true}
        showNotification={true}
      />
      <View className="flex-1 bg-slate-50">
        {/* Search and filter */}
        <View className="p-4 bg-white border-b border-gray-200">
          <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Ionicons name="search-outline" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-2 text-gray-800 py-1"
              placeholder="Search tasks..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </TouchableOpacity>
            ) : null}
          </View>
          
          {/* Filter tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            <TouchableOpacity 
              className={`px-4 py-2 rounded-full mr-2 ${filter === 'all' ? 'bg-indigo-600' : 'bg-gray-200'}`}
              onPress={() => setFilter('all')}
            >
              <Text className={`${filter === 'all' ? 'text-white' : 'text-gray-700'}`}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-4 py-2 rounded-full mr-2 ${filter === 'pending' ? 'bg-indigo-600' : 'bg-gray-200'}`}
              onPress={() => setFilter('pending')}
            >
              <Text className={`${filter === 'pending' ? 'text-white' : 'text-gray-700'}`}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-4 py-2 rounded-full mr-2 ${filter === 'in-progress' ? 'bg-indigo-600' : 'bg-gray-200'}`}
              onPress={() => setFilter('in-progress')}
            >
              <Text className={`${filter === 'in-progress' ? 'text-white' : 'text-gray-700'}`}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-4 py-2 rounded-full mr-2 ${filter === 'completed' ? 'bg-indigo-600' : 'bg-gray-200'}`}
              onPress={() => setFilter('completed')}
            >
              <Text className={`${filter === 'completed' ? 'text-white' : 'text-gray-700'}`}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`px-4 py-2 rounded-full mr-2 ${filter === 'overdue' ? 'bg-indigo-600' : 'bg-gray-200'}`}
              onPress={() => setFilter('overdue')}
            >
              <Text className={`${filter === 'overdue' ? 'text-white' : 'text-gray-700'}`}>Overdue</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Task list */}
        {loading ? (
          <View className="flex-1 items-center justify-center p-4">
            <ActivityIndicator size="large" color="#4f46e5" />
            <Text className="text-gray-500 mt-4">Loading tasks...</Text>
          </View>
        ) : (
          <ScrollView className="flex-1 p-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <View key={task.id} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
                  <TouchableOpacity
                    className="p-4"
                    onPress={() => openUpdateModal(task)}
                  >
                    <View className="flex-row justify-between items-start mb-2">
                      <Text className="text-gray-800 font-semibold flex-1 mr-2">{task.title}</Text>
                      {renderStatusBadge(task.status)}
                    </View>
                    
                    <Text className="text-gray-600 text-sm mb-3">{task.description}</Text>
                    
                    <View className="flex-row items-center justify-between mb-1">
                      <View className="flex-row items-center">
                        <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                        <Text className="text-gray-600 text-xs ml-1">Due: {task.dueDate}</Text>
                      </View>
                      {renderPriorityIndicator(task.priority)}
                    </View>
                    
                    <View className="flex-row items-center mb-1">
                      <Ionicons name="location-outline" size={14} color="#6b7280" />
                      <Text className="text-gray-600 text-xs ml-1">{task.location}</Text>
                    </View>
                    
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Ionicons name="person-outline" size={14} color="#6b7280" />
                        <Text className="text-gray-600 text-xs ml-1">By: {task.assignedBy}</Text>
                      </View>
                      <View className="bg-gray-100 px-2 py-1 rounded-full">
                        <Text className="text-gray-600 text-xs">{task.category}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  
                  {task.notes && (
                    <View className="bg-gray-50 p-3 border-t border-gray-100">
                      <Text className="text-gray-600 text-xs">{task.notes}</Text>
                    </View>
                  )}
                  
                  <View className="bg-indigo-50 p-3 border-t border-gray-100 flex-row justify-between items-center">
                    <TouchableOpacity 
                      className="flex-row items-center" 
                      onPress={() => openUpdateModal(task)}
                    >
                      <Text className="text-indigo-600 text-xs font-medium">Update status</Text>
                      <Ionicons name="chevron-forward" size={16} color="#4f46e5" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      className="flex-row items-center" 
                      onPress={() => handleDeleteTask(task.id, task.title)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#ef4444" />
                      <Text className="text-red-500 text-xs font-medium ml-1">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View className="items-center justify-center mt-10">
                <Ionicons name="clipboard-outline" size={60} color="#d1d5db" />
                <Text className="text-gray-400 mt-2">No tasks found</Text>
                {searchQuery || filter !== 'all' ? (
                  <TouchableOpacity 
                    className="mt-4 p-3 bg-indigo-100 rounded-lg"
                    onPress={() => {
                      setSearchQuery('');
                      setFilter('all');
                    }}
                  >
                    <Text className="text-indigo-600">Clear filters</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
          </ScrollView>
        )}
        
        {/* Create task button */}
        <TouchableOpacity 
          className="absolute bottom-6 right-6 bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
          onPress={() => router.push('/screens/asha/create-task')}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
        
        {/* Update task modal */}
        <Modal
          visible={showUpdateModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowUpdateModal(false)}
        >
          <View className="flex-1 bg-black/40 justify-end">
            <View className="bg-white rounded-t-xl p-5">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Update Task Status</Text>
                <TouchableOpacity onPress={() => setShowUpdateModal(false)}>
                  <Ionicons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              {selectedTask && (
                <>
                  <Text className="text-gray-800 font-medium mb-3">{selectedTask.title}</Text>
                  
                  <Text className="font-medium text-gray-700 mb-2">Status</Text>
                  <View className="flex-row flex-wrap mb-4">
                    <TouchableOpacity 
                      className={`mr-2 mb-2 px-3 py-2 rounded-lg ${taskStatus === 'pending' ? 'bg-indigo-100 border border-indigo-400' : 'bg-gray-100'}`}
                      onPress={() => setTaskStatus('pending')}
                    >
                      <Text className={`${taskStatus === 'pending' ? 'text-indigo-700' : 'text-gray-700'}`}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className={`mr-2 mb-2 px-3 py-2 rounded-lg ${taskStatus === 'in-progress' ? 'bg-blue-100 border border-blue-400' : 'bg-gray-100'}`}
                      onPress={() => setTaskStatus('in-progress')}
                    >
                      <Text className={`${taskStatus === 'in-progress' ? 'text-blue-700' : 'text-gray-700'}`}>In Progress</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className={`mr-2 mb-2 px-3 py-2 rounded-lg ${taskStatus === 'completed' ? 'bg-green-100 border border-green-400' : 'bg-gray-100'}`}
                      onPress={() => setTaskStatus('completed')}
                    >
                      <Text className={`${taskStatus === 'completed' ? 'text-green-700' : 'text-gray-700'}`}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className={`mr-2 mb-2 px-3 py-2 rounded-lg ${taskStatus === 'overdue' ? 'bg-red-100 border border-red-400' : 'bg-gray-100'}`}
                      onPress={() => setTaskStatus('overdue')}
                    >
                      <Text className={`${taskStatus === 'overdue' ? 'text-red-700' : 'text-gray-700'}`}>Overdue</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text className="font-medium text-gray-700 mb-2">Notes</Text>
                  <TextInput
                    className="bg-gray-100 rounded-lg p-3 text-gray-800 min-h-[100px] mb-4"
                    placeholder="Add notes about this task"
                    multiline={true}
                    value={taskNotes}
                    onChangeText={setTaskNotes}
                    textAlignVertical="top"
                  />
                  
                  <TouchableOpacity 
                    className={`${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600'} py-3 rounded-lg items-center`}
                    onPress={handleUpdateTask}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <View className="flex-row items-center">
                        <ActivityIndicator color="white" size="small" style={{ marginRight: 8 }} />
                        <Text className="text-white font-medium">Updating...</Text>
                      </View>
                    ) : (
                      <Text className="text-white font-medium">Update Task</Text>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
} 