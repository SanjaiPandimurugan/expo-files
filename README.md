# VitaWave Health App

A mobile application to connect ASHA workers, ANMs, and care seekers for better healthcare delivery in rural areas.

## Features

- **ASHA Worker Dashboard**: Manage tasks, track patients, and update records
- **Care Seeker Dashboard**: Find healthcare workers, book appointments, and access health information
- **Health Assistant Chatbot**: AI-powered assistant for healthcare information

## Chatbot Implementation

The app offers an AI-powered Health Assistant chatbot built with Dialogflow. There are two methods to integrate the chatbot:

### Method 1: In-App WebView Integration

The chatbot is integrated directly into the app using React Native's WebView component. This method is used in:

- `DialogflowChatbot.tsx`: Modal-based chatbot accessed from the floating button
- `chatbot.tsx`: Full-screen chatbot page accessible from the Health Services section

If you experience issues with the in-app WebView implementation, try the troubleshooting steps below.

### Method 2: External Browser Integration

As a fallback option, the chatbot can be accessed through an external browser. This method:

- Requires hosting the `dialogflow-chat.html` file on a web server
- Uses the device's browser, which often has better support for Dialogflow
- Is accessible through the "Browser Chat" option when tapping the chat button

### Hosting the Web Chatbot

To set up the external browser chatbot:

1. Upload the `dialogflow-chat.html` file to a web hosting service (GitHub Pages, Netlify, Vercel, Firebase Hosting, etc.)
2. Update the `chatbotUrl` in `WebChatbot.tsx` with your hosted URL
3. The hosted page will display the Dialogflow messenger in a mobile-friendly format

### Troubleshooting the WebView Integration

If the in-app chatbot is not working:

1. **Verify Dialogflow Agent**: Make sure your Dialogflow agent ID is correct in the HTML templates
2. **Network Connectivity**: The Dialogflow messenger requires internet access
3. **WebView Debugging**: Enable WebView debugging on Android by adding `webview:setWebContentsDebuggingEnabled(true)` 
4. **Try Different User Agents**: The current implementation uses an iOS user agent, but you may need to test with others
5. **Use the Browser Option**: As a last resort, use the external browser option which has better compatibility

## Development

### Prerequisites

- Node.js v14+ and npm
- Expo CLI
- Android Studio or Xcode for emulators

### Setup

```bash
# Install dependencies
npm install

# Start the development server
cd main
npx expo start
```

### Running on PowerShell

If using PowerShell on Windows, use separate commands instead of chaining with `&&`:

```powershell
cd main
npx expo start
```

## Project Structure

- `app/`: Main application code
  - `screens/`: Screen components for different user roles
    - `asha/`: ASHA worker screens
    - `seeker/`: Care seeker screens
    - `anm/`: ANM screens
  - `components/`: Reusable components
  - `context/`: React Context providers
  - `utils/`: Utility functions

## Dialogflow Setup

1. Create a Dialogflow CX agent in the Google Cloud Console
2. Set up intents for common healthcare queries
3. Use the agent ID in the chatbot implementation
4. Configure the Dialogflow Messenger integration

## License

[Your License]
