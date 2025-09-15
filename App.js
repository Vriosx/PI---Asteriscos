import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ChamadosScreen from "./screens/ChamadosScreen";
import DetalheChamadoScreen from "./screens/DetalheChamadoScreen";
import ComprarPecasScreen from "./screens/ComprarPecasScreen";
import CarrinhoScreen from "./screens/CarrinhoScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#00111A" },
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Chamados"
        component={ChamadosScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pecas"
        component={ComprarPecasScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="construct-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={CarrinhoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={BottomTabs} />
        <Stack.Screen name="DetalheChamado" component={DetalheChamadoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
