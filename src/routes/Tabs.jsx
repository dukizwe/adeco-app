import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Carousel from 'react-native-snap-carousel';
import BottomTabBar from '../components/BottomTabBar/BottomTabBar';
import Comp1 from '../components/Comp1';
import Comp2 from '../components/Comp2';
import Comp3 from '../components/Comp3';
import Comp4 from '../components/Comp4';
import Header from '../components/Header/Header';
import ContributionHeader from '../components/Header/ContributionHeader';
import HomeScreen from '../screens/HomeScreen';
import ContributionTab from '../screens/ContributionTab/ContributionTab';
import ContributionScreen from '../screens/ContributionTab/ContributionScreen';

export default function Tabs() {
          const BottomTab = createBottomTabNavigator()
          return (
                    <BottomTab.Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />} screenOptions={{header: () => <Header />}}>
                              <BottomTab.Screen name="ContributionScreen" component={ContributionScreen} options={{ headerShown: false }}/>
                              {/* <BottomTab.Screen name="ContributionTab" component={ContributionTab} options={{ header: () => <ContributionHeader /> }} /> */}
                              <BottomTab.Screen name="Comp2" component={Comp2} />
                              <BottomTab.Screen name="Home" component={HomeScreen} />
                              <BottomTab.Screen name="Comp3" component={Comp3} />
                              <BottomTab.Screen name="Comp4" component={Comp4} />
                    </BottomTab.Navigator>
          )
}