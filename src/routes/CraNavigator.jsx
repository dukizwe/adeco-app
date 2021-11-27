import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Header from '../components/Header/Header'
import CrasScreen from '../screens/CraTab/CrasScreen'
import CraViewScreen from '../screens/CraTab/CraViewScreen'

export default function CraNavigator() {
          const Stack = createNativeStackNavigator()
          return (
                    <Stack.Navigator>
                              <Stack.Screen name="Cras" component={CrasScreen} options={{ header: () => <Header />}} />
                              <Stack.Screen name="ViewCra" component={CraViewScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
          )
}