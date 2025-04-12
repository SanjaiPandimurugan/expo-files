import React, { useState } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Modal, 
  ActivityIndicator, 
  StyleSheet,
  Platform,
  Text 
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

interface DialogflowChatbotProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function DialogflowChatbot({ isVisible, onClose }: DialogflowChatbotProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simplified HTML to load the Dialogflow chatbot
  const dialogflowHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Chatbot</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;
      font-family: Arial, sans-serif;
      background-color: white;
    }
    .container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
    <df-messenger
      intent="WELCOME"
      chat-title="VitaWave Health Assistant"
      agent-id="d83d5c1b-b1d0-41e7-a102-99873b80324e"
      language-code="en"
      expand="true">
    </df-messenger>
  </div>

  <script>
    // Simple script to ensure the Dialogflow messenger loads properly
    window.onload = function() {
      setTimeout(function() {
        var dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
          dfMessenger.setAttribute('expand', 'true');
        }
      }, 1000);
    };
  </script>
</body>
</html>
  `;

  // JavaScript to inject to help with the iframe communication
  const injectedJavaScript = `
    (function() {
      function waitForElementToDisplay(selector, time) {
        if(document.querySelector(selector) != null) {
          document.querySelector(selector).setAttribute('expand', 'true');
          return;
        }
        else {
          setTimeout(function() {
            waitForElementToDisplay(selector, time);
          }, time);
        }
      }
      waitForElementToDisplay('df-messenger', 500);
      true;
    })();
  `;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="medkit" size={20} color="#10b981" />
            </View>
            <View>
              <Text style={styles.titleText}>Health Assistant</Text>
              <Text style={styles.subtitleText}>Powered by AI</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* WebView for Dialogflow */}
        <WebView
          originWhitelist={['*']}
          source={{ html: dialogflowHTML }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={injectedJavaScript}
          startInLoadingState={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="always"
          cacheEnabled={false}
          userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
        />

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#10b981" />
            <Text style={styles.loadingText}>Loading health assistant...</Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 44 : 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  closeButton: {
    padding: 4,
  },
  webview: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#10b981',
  },
}); 