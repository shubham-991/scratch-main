import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Code from './src/screens/Code';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

function App() {
  const loadFonts = () => {
    AntDesign.loadFont();
    Ionicons.loadFont();
    Feather.loadFont();
    MaterialIcons.loadFont();
    Entypo.loadFont();
    MaterialCommunityIcons.loadFont();
    FontAwesome.loadFont();
    SimpleLineIcons.loadFont();
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Code" component={Code} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
