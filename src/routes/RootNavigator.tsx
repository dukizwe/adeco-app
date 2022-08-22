import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { Host } from 'react-native-portalize';
import ContributionHeader from '../components/Header/ContributionHeader';
import UsersPaymentContext from '../context/ContributionContext';
import AcitivitiesScreen from '../screens/ContributionTab/AcitivitiesScreen';
import DebtScreen from '../screens/ContributionTab/DebtScreen';
import { ContributionContextInterface, QueueRecord } from '../types/ContributionContextInterface';
import { User } from '../types/User';
import Tabs from './Tabs';

export default function RootNavigator() {

          const Stack = createStackNavigator()

          const users: User[] = [
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
          const [selectedBatch, setSelectedBatch] = useState<User[]>([])
          const [queueList, setQueueList] = useState<QueueRecord>({})
          const [startAnimation, setStartAnimation] = useState(false)
          const isSelected = (user: User) => selectedBatch.find(u => u.id == user.id)
          const toggleSelectedBatch = (user: User) => {
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
          const onUserLongPress = (user: User) => {
                    setInSelect(true)
                    toggleSelectedBatch(user)
                    setStartAnimation(true)
          }
          const contextValue: ContributionContextInterface = {
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
                    <Host>
                              <UsersPaymentContext.Provider value={contextValue}>
                                        <Stack.Navigator>
                                                  <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                                                  <Stack.Screen name="DebtScreen" component={DebtScreen} options={{
                                                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                                            header: () => <ContributionHeader />,
                                                            headerMode: 'float'
                                                  }} />
                                                  <Stack.Screen name="AcitivitiesScreen" component={AcitivitiesScreen} options={{
                                                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                                            header: () => <ContributionHeader />,
                                                            // headerMode: 'float'
                                                  }} />
                                        </Stack.Navigator>
                              </UsersPaymentContext.Provider>
                    </Host>
          );
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          }
})
