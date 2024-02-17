import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import HomeScreen from "./src/screens/Home";
import SettingsScreen from "./src/screens/Settings";
import MapsScreen from "./src/screens/Maps";
import { ThemeProvider } from "./ThemeContext";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function MyTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Settings") {
            iconName = "settings";
          } else if (route.name === "Maps") {
            iconName = "map";
          }
          return (
            <View style={focused ? styles.iconFocused : {}}>
              <MaterialIcons
                name={iconName}
                size={focused ? 32 : 27}
                color={color}
              />
            </View>
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#222",
          height: 65,
          paddingVertical: 5,
          borderTopWidth: 0,
          paddingBottom: insets.bottom,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Maps" component={MapsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconFocused: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    padding: 10,
  },
});

export default App;
