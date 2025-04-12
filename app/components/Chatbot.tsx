import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define message types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Define predefined responses
const responses = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! What information do you need?",
    "Welcome! How may I assist you with your healthcare needs?"
  ],
  appointment: [
    "You can schedule an appointment by tapping on a healthcare worker's profile and selecting 'Request Appointment'.",
    "To book an appointment, find a healthcare worker nearby and tap on 'Request Appointment'."
  ],
  location: [
    "You can find nearby healthcare centers on the map section of the app.",
    "The app shows healthcare workers near your current location."
  ],
  emergency: [
    "For emergencies, please call the emergency helpline at 108 immediately.",
    "If you're experiencing a medical emergency, call 108 right away."
  ],
  pregnancy: [
    "Our ASHA workers provide support during pregnancy including regular check-ups and nutritional advice.",
    "For pregnancy-related queries, you can schedule an appointment with an ASHA worker."
  ],
  childcare: [
    "We offer services like immunization, growth monitoring, and nutrition counseling for children.",
    "ASHA workers can help with child vaccination and healthcare needs."
  ],
  fallback: [
    "I'm sorry, I don't have enough information about that. Would you like to talk to a healthcare worker?",
    "I don't have a specific answer for that. Would you like me to connect you with a healthcare provider?",
    "I'm still learning about that. For more specific help, please contact an ASHA worker."
  ]
};

export default function Chatbot({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your VitaWave health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking and then respond
    setTimeout(() => {
      const botResponse = generateResponse(inputText.trim().toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Generate a response based on user input
  const generateResponse = (input: string): string => {
    // Check for keywords in the input
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return getRandomResponse('greeting');
    } else if (
      input.includes('appointment') || 
      input.includes('schedule') || 
      input.includes('book')
    ) {
      return getRandomResponse('appointment');
    } else if (
      input.includes('location') || 
      input.includes('nearby') || 
      input.includes('find') ||
      input.includes('where')
    ) {
      return getRandomResponse('location');
    } else if (
      input.includes('emergency') || 
      input.includes('urgent') || 
      input.includes('critical')
    ) {
      return getRandomResponse('emergency');
    } else if (
      input.includes('pregnant') || 
      input.includes('pregnancy') || 
      input.includes('expecting')
    ) {
      return getRandomResponse('pregnancy');
    } else if (
      input.includes('child') || 
      input.includes('baby') || 
      input.includes('kid') ||
      input.includes('vaccination') ||
      input.includes('immunization')
    ) {
      return getRandomResponse('childcare');
    } else {
      return getRandomResponse('fallback');
    }
  };

  // Get a random response from the category
  const getRandomResponse = (category: keyof typeof responses): string => {
    const categoryResponses = responses[category];
    const randomIndex = Math.floor(Math.random() * categoryResponses.length);
    return categoryResponses[randomIndex];
  };

  // Render a single message
  const renderMessage = (message: Message) => {
    const isBot = message.sender === 'bot';
    return (
      <View 
        key={message.id}
        className={`${isBot ? 'bg-green-100 rounded-tr-xl' : 'bg-indigo-100 rounded-tl-xl'} px-4 py-3 my-1 max-w-[80%] rounded-b-xl self-${isBot ? 'start' : 'end'}`}
      >
        <Text className={`${isBot ? 'text-green-800' : 'text-indigo-800'}`}>{message.text}</Text>
        <Text className={`text-xs ${isBot ? 'text-green-600' : 'text-indigo-600'} mt-1 text-right`}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    );
  };

  // Format the timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render suggested queries
  const renderSuggestedQueries = () => {
    const queries = [
      "How do I book an appointment?",
      "Where is the nearest health center?",
      "What to do in an emergency?",
      "Pregnancy care services"
    ];

    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="py-2"
      >
        {queries.map((query, index) => (
          <TouchableOpacity
            key={index}
            className="bg-green-50 px-3 py-2 rounded-full mr-2 border border-green-200"
            onPress={() => {
              setInputText(query);
            }}
          >
            <Text className="text-green-700">{query}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="bg-green-600 p-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center mr-3">
                <Ionicons name="medkit" size={20} color="#10b981" />
              </View>
              <View>
                <Text className="text-white text-lg font-bold">Health Assistant</Text>
                <Text className="text-green-100 text-xs">Ask me anything about healthcare</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Chat messages */}
          <ScrollView 
            ref={scrollViewRef}
            className="flex-1 p-4"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {messages.map(message => renderMessage(message))}
            
            {isTyping && (
              <View className="bg-green-100 px-4 py-3 my-1 max-w-[50%] rounded-tr-xl rounded-b-xl self-start">
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="#10b981" style={{ marginRight: 8 }} />
                  <Text className="text-green-800">Typing...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Suggested queries */}
          {messages.length < 3 && (
            <View className="px-4 pb-2">
              <Text className="text-gray-600 mb-1">Suggested questions:</Text>
              {renderSuggestedQueries()}
            </View>
          )}

          {/* Input area */}
          <View className="p-4 border-t border-gray-200">
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
                placeholder="Type your message..."
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSendMessage}
                returnKeyType="send"
              />
              <TouchableOpacity 
                className="w-10 h-10 bg-green-600 rounded-full items-center justify-center"
                onPress={handleSendMessage}
              >
                <Ionicons name="send" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
} 