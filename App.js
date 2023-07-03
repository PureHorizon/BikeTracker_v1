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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
