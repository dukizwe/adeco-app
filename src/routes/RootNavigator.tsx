import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { Host } from 'react-native-portalize';
import ContributionHeader from '../components/Header/ContributionHeader';
import AcitivitiesScreen from '../screens/ContributionTab/AcitivitiesScreen';
import ConfirmContributionScreen from '../screens/ContributionTab/ConfirmContributionScreen';
import ContributionSuccessScreen from '../screens/ContributionTab/ContributionSuccessScreen';
import DebtScreen from '../screens/ContributionTab/DebtScreen';
import NewContributionScreen from '../screens/ContributionTab/NewContributionScreen';
import { User } from '../types/User';
import Tabs from './Tabs';
import TopTabs from './TopTabs';

export default function RootNavigator() {
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator>
                              <Stack.Screen name="Tabs" component={TopTabs} options={{ headerShown: false }} />
                              <Stack.Screen name="NewContributionScreen" component={NewContributionScreen} options={{
                                        header: () => <ContributionHeader />,
                                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                              }} />
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
                              <Stack.Screen name="ConfirmContributionScreen" component={ConfirmContributionScreen} options={{
                                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                        header: () => <ContributionHeader />,
                                        headerMode: 'float'
                              }} />
                              <Stack.Screen name="ContributionSuccessScreen" component={ContributionSuccessScreen} options={{
                                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                        header: () => <ContributionHeader />,
                                        headerMode: 'float'
                              }} />
                    </Stack.Navigator>
          );
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          }
})
