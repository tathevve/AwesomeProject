import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './src/screens/LoginScreen';
import MessagingScreen from './src/screens/MessagingScreen';
import GeolocationScreen from './src/screens/GeolocationScreen';
import {AuthContext} from './src/context/authContext';

const Tab = createBottomTabNavigator();
export const Stack = createStackNavigator();

function PrivateTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00796B',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 16, fontWeight: 'bold', marginTop: 5},
        tabBarStyle: {backgroundColor: '#FFFFFF'},
        tabBarShowLabel: true,
        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen
        name="Home"
        component={MessagingScreen}
        options={{
          tabBarLabel: 'Messaging',
        }}
      />
      <Tab.Screen
        name="Geolocation"
        component={GeolocationScreen}
        options={{
          tabBarLabel: 'Geolocation',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuth ? (
            <Stack.Screen
              name="PrivateTabs"
              component={PrivateTabs}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
