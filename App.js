import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ChamadoCliente2 from "./screens/ChamadoCliente2";
import ComprarPecasScreen from "./screens/ComprarPecasScreen";
import CarrinhoScreen from "./screens/CarrinhoScreen";
import LoginScreen from "./screens/Login";
import ChamadoClienteScreen from "./screens/AbrirChamadoCliente";
import JaTemChamado from "./screens/PesquisaChamadoCliente";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Navigation
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
        component={LoginScreen} // Usando LoginScreen corretamente
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
        name="ChamadoClienteScreen"
        component={ChamadoClienteScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
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
      <Tab.Screen
        name="Cliente2"
        component={ChamadoCliente2}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="construct-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="JaTemChamado"
        component={JaTemChamado}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="construct-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// App Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tela de login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Navegação para a tela de Chamados após o login */}
        <Stack.Screen name="HomeTabs" component={BottomTabs} />

        {/* Navegação para detalhes do chamado */}
        <Stack.Screen name="Cliente2" component={ChamadoCliente2} />

        {/* Chamado Cliente */}
        <Stack.Screen name="ChamadoClienteScreen" component={ChamadoClienteScreen} />

        <Stack.Screen name="JaTemChamado" component={JaTemChamado} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
