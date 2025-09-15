import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tela1 from './Tela1'; 
import Tela2 from './Tela2';
import Tela3 from './Tela3'; 
import Tela4 from './Tela4'; 
import Tela5 from './Tela5';
import Tela6 from './Tela6'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Tela1}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Chamado"
          component={Tela2}
          options={{ title: 'Abrir Chamado' }}
        />
        <Stack.Screen
          name="AbrirChamado"
          component={Tela3}
          options={{ title: 'Detalhes do Chamado' }}
        />
        <Stack.Screen
          name="Notificacoes"
          component={Tela4}  
          options={{ title: 'Notificações' }}  
        />
        <Stack.Screen
          name="PesquisarChamado"
          component={Tela5}  
          options={{ title: 'Pesquisar Chamado' }} 
        />
        <Stack.Screen
          name="Feedback" // Tela6
          component={Tela6}
          options={{ title: 'Avaliação' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
