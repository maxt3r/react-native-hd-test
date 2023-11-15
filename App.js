import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import TicketsScreen from './screens/TicketsScreen';
import Auth from './services/auth';
import JitBitAPI from './services/api';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function loadCredentials() {
      const isAuthed = await Auth.isAuthed();
      if (isAuthed) {
        const credentials = await Auth.getCredentials();
        JitBitAPI.init(credentials);
        setIsAuthenticated(true);
      }
    }

    loadCredentials();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          // If authenticated, navigate to the Tickets Screen
          <Stack.Screen name="Tickets" component={TicketsScreen} />
        ) : (
          // If not authenticated, show the Login Screen
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
