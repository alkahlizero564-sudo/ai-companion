import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

import ChatScreen from "./screens/ChatScreen";
import ImageScreen from "./screens/ImageScreen";
import VideoScreen from "./screens/VideoScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Images" component={ImageScreen} />
        <Tab.Screen name="Video" component={VideoScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
      }
