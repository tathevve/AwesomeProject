import {Stack} from '../../App';
import Messaging from '../components/Messaging';

const MessagingScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'MessagingScreen'} component={Messaging} />
    </Stack.Navigator>
  );
};

export default MessagingScreen;
