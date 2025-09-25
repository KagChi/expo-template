import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import "../../global.css";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: "Home", tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="details" options={{
        title: "Details", tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" size={size} color={color} />
        ),
      }} />
    </Tabs>
  );
}
