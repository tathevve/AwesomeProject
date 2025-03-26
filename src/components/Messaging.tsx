import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, NativeModules, ScrollView, Platform } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/authContext';

type MessageType = {
  sent: string;
  response: string;
};

const Messaging = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const { setIsAuth } = useAuthContext();
  const navigation = useNavigation();

  const fetchResponseFromNative = async (text: string) => {
    try {
      if (Platform.OS === 'android') { 
        NativeModules.MyDeviceInfoPackage.sendMessage(text, (response: string) => {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].response = response;
            return updatedMessages;
          });
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        });
      } else {
        await NativeModules.MessagingInfo.getSentMessage(text);

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].response = `Received "${text}" from native module`;
          return updatedMessages;
        });

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.log('Error fetching response from native:', error);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = { sent: message, response: '' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    fetchResponseFromNative(message);
    setMessage('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      setIsAuth(false);
      setTimeout(() => {
        navigation.dispatch(StackActions.replace('LoginScreen'));
      }, 500);
    } catch (e) {
      console.log('Error logging out, please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Logout" onPress={handleLogout} color="#D32F2F" />
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index}>
            {msg.sent && (
              <View style={[styles.messageBubble, styles.sentMessage]}>
                <Text style={styles.messageText}>{msg.sent}</Text>
              </View>
            )}
            {msg.response ? (
              <View style={[styles.messageBubble, styles.receivedMessage]}>
                <Text style={styles.messageText}>{msg.response}</Text>
              </View>
            ) : null}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 10,
  },
  header: {
    alignItems: 'flex-end',
    paddingBottom: 10,
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
    backgroundColor: 'teal',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  messageText: {
    color: 'white',
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
    borderColor: 'silver',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginRight: 10,
    fontSize: 16,
  },
});

export default Messaging;
