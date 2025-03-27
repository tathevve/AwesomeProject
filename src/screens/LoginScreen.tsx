import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthContext} from '../context/authContext';

type RootStackParamList = {
  PrivateTabs: {
    screen: string;
    params?: {screen: string};
  };
};

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const {setIsAuth} = useAuthContext();

  const validateEmail = (emailInput: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);

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
          params: {screen: 'MessagingScreen'},
        });
      }, 500);
    } catch (storageError) {
      console.error('Error saving token to AsyncStorage:', storageError);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setError('');
          }}
          style={[styles.input, error ? styles.inputError : {}]}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="done"
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
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkgray',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
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
    backgroundColor: 'dodgerblue',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
