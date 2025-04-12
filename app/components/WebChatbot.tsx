import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WebChatbotProps {
  onClose: () => void;
}

export default function WebChatbot({ onClose }: WebChatbotProps) {
  // URL for the Dialogflow Messenger in a hosted web page
  // This is a placeholder URL. You need to host the dialogflow-chat.html file we created.
  // Options for hosting:
  // 1. GitHub Pages (free): Upload the HTML file to a GitHub repository and enable GitHub Pages
  // 2. Netlify/Vercel (free): Create a new project and upload the HTML file
  // 3. Firebase Hosting (free tier available): Use Firebase CLI to deploy the HTML file
  // 4. Any other static web hosting service
  const chatbotUrl = "https://example.com/dialogflow-chat.html"; // Replace with your actual hosted URL

  const openChatbot = async () => {
    try {
      // Check if the URL can be opened
      const canOpen = await Linking.canOpenURL(chatbotUrl);
      
      if (!canOpen) {
        Alert.alert(
          "Cannot Open Link",
          "Your device cannot open the chatbot in a browser. Please try the in-app chatbot instead.",
          [{ text: "OK" }]
        );
        return;
      }
      
      // Open the URL
      await Linking.openURL(chatbotUrl);
      
      // Close this modal after opening the browser
      onClose();
    } catch (error) {
      console.error("Error opening chatbot URL:", error);
      Alert.alert(
        "Error",
        "There was a problem opening the chatbot. Please try again later.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="chatbubble-ellipses" size={36} color="#10b981" />
          <Text style={styles.title}>Health Assistant</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.description}>
            Our health assistant can help you with information about:
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="calendar" size={20} color="#10b981" />
              <Text style={styles.featureText}>Appointment scheduling</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="medkit" size={20} color="#10b981" />
              <Text style={styles.featureText}>Health services</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="help-circle" size={20} color="#10b981" />
              <Text style={styles.featureText}>Health information</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="alert-circle" size={20} color="#10b981" />
              <Text style={styles.featureText}>Emergency guidance</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={openChatbot}
          >
            <Text style={styles.chatButtonText}>Open Health Assistant</Text>
            <Ionicons name="open-outline" size={20} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.note}>
            Note: This will open the chat assistant in your web browser. The developer should host the provided HTML file and update the URL above.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#1f2937',
  },
  chatButton: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  chatButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  note: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
}); 