<<<<<<< HEAD
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import HomeScreen from "./src/screens/Home";
import SettingsScreen from "./src/screens/Settings";
import MapsScreen from "./src/screens/Maps";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Settings") {
              iconName = "settings";
            } else if (route.name === "Maps") {
              iconName = "map";
            }
            return <Feather name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          showLabel: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Maps" component={MapsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
=======
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import HomeScreen from './src/screens/Home';
import GarageScreen from './src/screens/Garage';
import HelpScreen from './src/screens/Help';
import ProfileScreen from './src/screens/Profile';

const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.nav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Text style={[styles.linkText, isFocused && styles.linkTextActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: '#432fbf',
    justifyContent: 'space-around',
    padding: 20,
  },
  tabButton: {
    padding: 10,
  },
  linkText: {
    color: 'white',
    opacity: 0.5,
  },
  linkTextActive: {
    opacity: 1,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Garage" component={GarageScreen} />
        <Tab.Screen name="Hilfe" component={HelpScreen} />
        <Tab.Screen name="Account" component={ProfileScreen} />
>>>>>>> dcaf135f4ff0c6a2f0f8136fdac4ae1028bb6f6d
      </Tab.Navigator>
    </NavigationContainer>
  );
}
<<<<<<< HEAD

export default App;
=======
>>>>>>> dcaf135f4ff0c6a2f0f8136fdac4ae1028bb6f6d
