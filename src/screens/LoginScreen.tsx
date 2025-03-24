import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../context/authContext';

type RootStackParamList = {
  PrivateTabs: {
    screen: string;
    params?: { screen: string };
  };
};

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { setIsAuth } = useAuthContext();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Enter a valid email');
      return;
    }
    setError('');

    const fakeToken = Math.random().toString(36).substring(7);
    try {
      await AsyncStorage.setItem('access_token', fakeToken);
      setIsAuth(true);
      setTimeout(() => {
        navigation.navigate('PrivateTabs', {
          screen: 'Home',
          params: { screen: 'MessagingScreen' },
        });
      }, 500);
    } catch (error) {
      console.error('Error saving token to AsyncStorage:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          style={[styles.input, error ? styles.inputError : {}]}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="done"
          blurOnSubmit={true}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
