import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// --- IMPORT DAS TELAS ---
import AbrirChamadoScreen from "./screens/AbrirChamadoCliente"; 
import ChamadoCliente2 from "./screens/ChamadoCliente2"; 
import JaTemChamado from "./screens/PesquisaChamadoCliente";
import NotificacaoCliente from "./screens/NotificacaoCliente";
import ChamadosScreen from "./screens/ChamadosScreen"; // Admin
import CarrinhoScreen from "./screens/CarrinhoScreen"; // Admin
import ComprarPecasScreen from "./screens/ComprarPecasScreen"; // Admin
import DetalheChamado from "./screens/DetalheChamadoScreen";

// --- IMPORT DO JSON DE ADMINS ---
import admins from "./Dados/admins.json";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// --- LOGIN SCREEN ---
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    // Login do admin principal
    if (email === "admin" && senha === "admin") {
      navigation.replace("HomeTabsAdmin");
      return;
    }

    // Login de outro usuário do JSON
    const usuario = admins.find(u => u.email === email && u.senha === senha && email !== "admin");
    if (usuario) {
      navigation.replace("HomeTabsCliente");
      return;
    }

    Alert.alert("Erro", "Email ou senha inválidos!");
  };

  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.logoImage} />

      <TextInput
        style={styles.input}
        placeholder="Digite o email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" color="#4E89AE" onPress={handleLogin} />

      <TouchableOpacity onPress={() => console.log("Recuperação de senha")}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- TABS DO CLIENTE ---
function BottomTabsCliente() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#00111A" },
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="AbrirChamado"
        component={AbrirChamadoScreen}
        options={{
          tabBarLabel: "Abrir Chamado",
          tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Pesquisar"
        component={JaTemChamado}
        options={{
          tabBarLabel: "Pesquisar",
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// --- TABS DO ADMIN ---
function BottomTabsAdmin() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#00111A" },
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="ChamadosAdmin"
        component={ChamadosScreen}
        options={{
          tabBarLabel: "Gerenciar Chamados",
          tabBarIcon: ({ color }) => <Ionicons name="clipboard-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="PecasAdmin"
        component={ComprarPecasScreen}
        options={{
          tabBarLabel: "Peças",
          tabBarIcon: ({ color }) => <Ionicons name="construct-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={CarrinhoScreen}
        options={{
          tabBarLabel: "Carrinho",
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// --- APP PRINCIPAL ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Tabs Cliente */}
        <Stack.Screen name="HomeTabsCliente" component={BottomTabsCliente} />

        {/* Tabs Admin */}
        <Stack.Screen name="HomeTabsAdmin" component={BottomTabsAdmin} />

        {/* Outras telas */}
        <Stack.Screen name="ChamadoCliente2" component={ChamadoCliente2} />
        <Stack.Screen name="NotificacaoCliente" component={NotificacaoCliente} />
        <Stack.Screen name="DetalheChamado" component={DetalheChamado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#06101B",
    padding: 20,
  },
  logoImage: {
    width: 150,
    height: 90,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: "#333333",
    color: "#fff",
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  forgotPassword: {
    color: "#A0A0A0",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
