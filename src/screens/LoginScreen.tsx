import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const fakeToken = Math.random().toString(36).substring(7);
    console.log('Generated Token:', fakeToken);
    try {
      await AsyncStorage.setItem('access_token', fakeToken);
      console.log('Token saved to AsyncStorage');
      navigation.navigate('PrivateTabs');
    } catch (error) {
      console.error('Error saving token to AsyncStorage:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
