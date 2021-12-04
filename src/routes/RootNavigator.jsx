import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import BottomTabBar from '../components/BottomTabBar/BottomTabBar';
import Comp1 from '../components/Comp1';
import Comp2 from '../components/Comp2';
import Comp3 from '../components/Comp3';
import Comp4 from '../components/Comp4';
import Header from '../components/Header/Header';
import HomeScreen from '../screens/HomeScreen';

export default function RootNavigator() {

          const BottomTab = createBottomTabNavigator()

          return (
                    <View style={styles.container}>
                              <BottomTab.Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />} screenOptions={{header: () => <Header />}}>
                                        <BottomTab.Screen name="Comp1" component={Comp1} />
                                        <BottomTab.Screen name="Comp2" component={Comp2} />
                                        <BottomTab.Screen name="Home" component={HomeScreen} />
                                        <BottomTab.Screen name="Comp3" component={Comp3} />
                                        <BottomTab.Screen name="Comp4" component={Comp4} />
                              </BottomTab.Navigator>
                    </View>
          );
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          }
})
