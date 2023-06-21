/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/register';
import Acceuil from './Components/Acceuil';
import { VariableProvider } from './Components/Acceuil/AcceuilGlobalVar';
import SingleRecipe from './Components/SingleRecipe';
import RecipeSearch from './Components/RecipeSearch';
import Profile from './Components/Profile';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <VariableProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen 
            name='Home'
            component={Home}
          />
          <Stack.Screen
            name='Login'
            component={Login}
          />
          <Stack.Screen
            name='Register'
            component={Register}
          />
          <Stack.Screen
            name='Acceuil'
            component={Acceuil}
          />
          <Stack.Screen 
            name='SingleRecipe'
            component={SingleRecipe}
          />
          <Stack.Screen
            name='RecipeSearch'
            component={RecipeSearch}
          />
          <Stack.Screen
            name='Profile'
            component={Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VariableProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
