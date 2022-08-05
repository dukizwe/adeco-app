import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import UsersPayHeader from '../components/Header/UsersPayHeader';
import UsersPaymentContext from '../context/UsersPaymentContext';
import DebtScreen from '../screens/UsersPaymentTab/DebtScreen';
import Tabs from './Tabs';

export default function RootNavigator() {

          const Stack = createStackNavigator()

          const users = [
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 1,
                              actions: {
                                        action: 6000,
                                        rate: 2000,
                                        debt: 60000
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 2,
                              actions: {
                                        action: 6000,
                                        rate: 2000,
                                        debt: 0
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 3,
                              actions: {
                                        action: 6000,
                                        rate: 2000,
                                        debt: 0
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 4,
                              actions: {
                                        action: 6000,
                                        rate: 2000,
                                        debt: 100000
                              }
                    }
          ]
          const [inSelect, setInSelect] = useState(false)
          const [selectedBatch, setSelectedBatch] = useState([])
          const [queueList, setQueueList] = useState({})
          const [startAnimation, setStartAnimation] = useState(false)
          const isSelected = (user) => selectedBatch.find(u => u.id == user.id)
          const toggleSelectedBatch = (user) => {
                    if(isSelected(user)) {
                              const newSelected = selectedBatch.filter(u => u.id != user.id)
                              setSelectedBatch(newSelected)
                              if(selectedBatch.length-1 === 0) {
                                        setInSelect(false)
                                        setStartAnimation(false)
                              }
                    } else {
                              setSelectedBatch(prev => ([...prev, user]))
                    }
          }
          const onUserLongPress = (user) => {
                    setInSelect(true)
                    toggleSelectedBatch(user)
                    setStartAnimation(true)
          }
          const contextValue = {
                    users,
                    inSelect,
                    setInSelect,
                    selectedBatch,
                    setSelectedBatch,
                    isSelected,
                    toggleSelectedBatch,
                    queueList,
                    setQueueList,
                    onUserLongPress,
                    setStartAnimation,
                    startAnimation
          }
          return (
                    <UsersPaymentContext.Provider value={contextValue}>
                              <Stack.Navigator>
                                        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                                        <Stack.Screen name="Debt" component={DebtScreen} options={{
                                                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                                  header: () => <UsersPayHeader />,
                                                  headerMode: 'float'
                                        }} />
                              </Stack.Navigator>
                    </UsersPaymentContext.Provider>
          );
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          }
})
