import { Stack } from "expo-router";
import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";

// Define our auth state provider
import { createContext, useContext, useState } from "react";
// Import the TasksProvider
import { TasksProvider } from "./context/TasksContext";

interface AuthContextValue {
  authenticated: boolean;
  userRole: "asha" | "anm" | "seeker" | null;
  login: (role: "asha" | "anm" | "seeker") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// This hook can be used to access the user info.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// This provider is what makes the auth object available to any descendant component that calls useAuth().
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"asha" | "anm" | "seeker" | null>(null);
  
  const router = useRouter();
  const pathname = usePathname();

  // Navigate to appropriate screens based on auth state
  useEffect(() => {
    // If we're on the splash, login, or signup screens, don't redirect
    const isAuthScreen = 
      pathname === "/splash" || 
      pathname === "/login" || 
      pathname === "/signup";

    if (!authenticated && !isAuthScreen) {
      // If user is not authenticated and not on an auth screen, redirect to splash
      router.replace("/splash");
    } else if (authenticated && isAuthScreen) {
      // If user is authenticated but on an auth screen, redirect to appropriate dashboard
      if (userRole === "asha") {
        router.replace("/screens/asha/dashboard");
      } else if (userRole === "anm") {
        router.replace("/screens/anm/dashboard");
      } else if (userRole === "seeker") {
        router.replace("/screens/seeker/dashboard");
      }
    }
  }, [authenticated, userRole, pathname]);

  const login = (role: "asha" | "anm" | "seeker") => {
    setAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    setAuthenticated(false);
    setUserRole(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ authenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TasksProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#4f46e5', // Indigo-600
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </TasksProvider>
    </AuthProvider>
  );
}
