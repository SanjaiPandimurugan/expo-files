import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { useTasks } from '../../context/TasksContext';
import { useAuth } from '../../_layout';

export default function CreateTask() {
  const router = useRouter();
  const { addTask } = useTasks();
  const { userRole } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [assignToSelf, setAssignToSelf] = useState(true);
  const [assignToName, setAssignToName] = useState('');
  const [assignToRole, setAssignToRole] = useState<'asha' | 'anm' | 'other'>('asha');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Category options
  const categories = [
    'Maternal Care',
    'Child Health',
    'Immunization',
    'Health Education',
    'Disease Management',
    'Preventive Care',
    'Administration',
    'Other'
  ];
  
  // Handle task creation
  const handleCreateTask = async () => {
    // Basic validation
    if (!title || !description || !dueDate || !location || !category) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }
    
    if (!assignToSelf && !assignToName) {
      Alert.alert('Missing Information', 'Please specify who to assign this task to');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Create the task object
      const newTask = {
        title,
        description,
        status: 'pending' as const,
        priority,
        dueDate,
        location,
        category,
        assignedBy: userRole === 'asha' ? 'Anjali Sharma (ASHA)' : 'System',
        assignedTo: assignToSelf ? 'Self' : `${assignToName} (${assignToRole.toUpperCase()})`,
        notes: '',
      };
      
      // Save the task using our context
      await addTask(newTask);
      
      // Show success message
      Alert.alert(
        'Task Created',
        'Your task has been created successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('Error creating task:', error);
      Alert.alert('Error', 'There was a problem creating your task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Header 
        title="Create New Task" 
        showBack={true}
        showNotification={false}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 bg-slate-50 p-4">
          {/* Task Title */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Task Title <Text className="text-red-500">*</Text></Text>
            <TextInput
              className="bg-white p-3 rounded-lg text-gray-800 border border-gray-200"
              placeholder="Enter task title"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          {/* Task Description */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Description <Text className="text-red-500">*</Text></Text>
            <TextInput
              className="bg-white p-3 rounded-lg text-gray-800 border border-gray-200 min-h-[100px]"
              placeholder="Enter detailed description of the task"
              multiline={true}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </View>
          
          {/* Due Date */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Due Date <Text className="text-red-500">*</Text></Text>
            <TouchableOpacity 
              className="bg-white p-3 rounded-lg border border-gray-200 flex-row items-center justify-between"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className={dueDate ? "text-gray-800" : "text-gray-400"}>
                {dueDate || "Select a due date"}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#6b7280" />
            </TouchableOpacity>
            <Text className="text-gray-500 text-xs mt-1">For demo, please type a date manually</Text>
            <TextInput
              className="bg-white p-3 rounded-lg text-gray-800 border border-gray-200 mt-2"
              placeholder="e.g., 30 Oct 2023"
              value={dueDate}
              onChangeText={setDueDate}
            />
          </View>
          
          {/* Location */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Location <Text className="text-red-500">*</Text></Text>
            <TextInput
              className="bg-white p-3 rounded-lg text-gray-800 border border-gray-200"
              placeholder="Enter task location"
              value={location}
              onChangeText={setLocation}
            />
          </View>
          
          {/* Category */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Category <Text className="text-red-500">*</Text></Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              className="mb-2"
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  className={`mr-2 px-4 py-2 rounded-full ${category === cat ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  onPress={() => setCategory(cat)}
                >
                  <Text className={`${category === cat ? 'text-white' : 'text-gray-700'}`}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Priority */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Priority <Text className="text-red-500">*</Text></Text>
            <View className="flex-row">
              <TouchableOpacity
                className={`flex-1 py-2 ${priority === 'high' ? 'bg-red-500' : 'bg-gray-200'} rounded-l-lg items-center`}
                onPress={() => setPriority('high')}
              >
                <Text className={`${priority === 'high' ? 'text-white' : 'text-gray-700'}`}>High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-2 ${priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-200'} items-center`}
                onPress={() => setPriority('medium')}
              >
                <Text className={`${priority === 'medium' ? 'text-white' : 'text-gray-700'}`}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-2 ${priority === 'low' ? 'bg-green-500' : 'bg-gray-200'} rounded-r-lg items-center`}
                onPress={() => setPriority('low')}
              >
                <Text className={`${priority === 'low' ? 'text-white' : 'text-gray-700'}`}>Low</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Task Assignment */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Task Assignment</Text>
            <View className="bg-white p-4 rounded-lg border border-gray-200">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gray-800">Assign to myself</Text>
                <Switch
                  value={assignToSelf}
                  onValueChange={setAssignToSelf}
                  trackColor={{ false: '#d1d5db', true: '#c7d2fe' }}
                  thumbColor={assignToSelf ? '#4f46e5' : '#9ca3af'}
                />
              </View>
              
              {!assignToSelf && (
                <>
                  <Text className="text-gray-700 mb-2">Role</Text>
                  <View className="flex-row mb-3">
                    <TouchableOpacity
                      className={`flex-1 py-2 ${assignToRole === 'asha' ? 'bg-indigo-600' : 'bg-gray-200'} rounded-l-lg items-center`}
                      onPress={() => setAssignToRole('asha')}
                    >
                      <Text className={`${assignToRole === 'asha' ? 'text-white' : 'text-gray-700'}`}>ASHA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`flex-1 py-2 ${assignToRole === 'anm' ? 'bg-indigo-600' : 'bg-gray-200'} rounded-r-lg items-center`}
                      onPress={() => setAssignToRole('anm')}
                    >
                      <Text className={`${assignToRole === 'anm' ? 'text-white' : 'text-gray-700'}`}>ANM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`flex-1 py-2 ${assignToRole === 'other' ? 'bg-indigo-600' : 'bg-gray-200'} rounded-r-lg items-center`}
                      onPress={() => setAssignToRole('other')}
                    >
                      <Text className={`${assignToRole === 'other' ? 'text-white' : 'text-gray-700'}`}>Other</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text className="text-gray-700 mb-2">Name/ID</Text>
                  <TextInput
                    className="bg-gray-100 p-3 rounded-lg text-gray-800"
                    placeholder="Enter name or ID of assignee"
                    value={assignToName}
                    onChangeText={setAssignToName}
                  />
                </>
              )}
            </View>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity
            className={`${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600'} py-4 rounded-lg items-center mt-4 mb-8`}
            onPress={handleCreateTask}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <View className="flex-row items-center">
                <ActivityIndicator color="white" size="small" style={{ marginRight: 8 }} />
                <Text className="text-white font-bold text-lg">Creating...</Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-lg">Create Task</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
} 