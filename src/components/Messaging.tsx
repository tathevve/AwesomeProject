import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, NativeModules, ScrollView } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/authContext';

const { MyDeviceInfoPackage } = NativeModules;

type MessageType = {
  sent: string;
  response: string;
};

const Messaging = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
    const {setIsAuth} = useAuthContext();

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = { sent: message, response: '' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    MyDeviceInfoPackage.sendMessage(message, (response: string) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].response = response;
        return updatedMessages;
      });
    });

    setMessage('');
  };

  const handleLogout = async () => {
    try {
    await AsyncStorage.removeItem('access_token');
    setIsAuth(false);
    setTimeout(() => { navigation.dispatch(StackActions.replace('LoginScreen')) }, 500);
    } catch (e) {
      console.log('Error logging out, please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index}>
            <View style={[styles.messageBubble, styles.sentMessage]}>
              <Text style={styles.messageText}>{msg.sent}</Text>
            </View>
            {msg.response && (
              <View style={[styles.messageBubble, styles.receivedMessage]}>
                <Text style={styles.messageText}>{msg.response}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          placeholderTextColor="#A4A4A4"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send Message" onPress={handleSendMessage} color="#00796B" />
      </View>
      <Button title="Logout" onPress={handleLogout} color="#D32F2F" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  sentMessage: {
    backgroundColor: '#00796B',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    marginRight: 10,
    fontSize: 16,
  },
});

export default Messaging;
