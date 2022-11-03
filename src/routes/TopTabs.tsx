import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import ContributionScreen from "../screens/ContributionTab/ContributionScreen";
import Comp2 from "../components/Comp2";
import HomeScreen from "../screens/HomeScreen";
import Comp3 from "../components/Comp3";
import Comp4 from "../components/Comp4";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { COLORS } from "../styles/COLORS";

type RouteName = "ContributionScreen" | "Comp2" | "Home" | "Comp3" | "Comp4"
export default function TopTabs() {
          const TopTab = createMaterialTopTabNavigator()
          const { width } = useWindowDimensions()

          const TAB_WIDTH = width
          const TAB_BAR_WIDTH = TAB_WIDTH / 5
          
          const TabBarLabel = ({ focused, color, name }: { focused: boolean, color: string, name: RouteName }) => {
                    const icons = {
                              ContributionScreen: focused ? require('../../assets/icons/contribution-focused.png') : require('../../assets/icons/contribution.png'),
                              Comp2: focused ? require('../../assets/icons/debt-focused.png') : require('../../assets/icons/debt.png'),
                              Home:  focused ? require('../../assets/icons/home-focused.png') : require('../../assets/icons/home.png'),
                              Comp3: focused ? require('../../assets/icons/activity-focused.png') : require('../../assets/icons/activity.png'),
                              Comp4: focused ? require('../../assets/icons/user-focused.png') : require('../../assets/icons/user.png'),
                    }
                    return    <View style={[styles.tab, { width: TAB_BAR_WIDTH }]}>
                              {/* <View style={styles.topTabScrollIndicator} /> */}
                              <Image source={icons[name]} style={[styles.icon, name == "Comp4" && { width: 30, height: 30 }]} />
                    </View>
          }
          return (
                    <TopTab.Navigator initialRouteName="Home" tabBarPosition="bottom" screenOptions={{
                              tabBarStyle: styles.tabBar,
                              tabBarIndicatorContainerStyle: {
                                        borderTopWidth: 1,
                                        borderTopColor: '#F1F1F1'
                              },
                              tabBarPressColor: '#ddd',
                              tabBarIndicatorStyle: {
                                        height: 1,
                                        backgroundColor: COLORS.primary,
                                        borderRadius: 30,
                                        position: "absolute",
                                        top: -1
                              },
                              tabBarLabelStyle: {
                                        color: '#000',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                              }
                    }}>
                              <TopTab.Screen name="ContributionScreen" component={ContributionScreen} options={{ tabBarLabel: props => <TabBarLabel {...props} name="ContributionScreen" /> }} />
                              <TopTab.Screen name="Comp2" component={Comp2}  options={{ tabBarLabel: props => <TabBarLabel {...props} name="Comp2" /> }} />
                              <TopTab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: props => <TabBarLabel {...props} name="Home" /> }} />
                              <TopTab.Screen name="Comp3" component={Comp3} options={{ tabBarLabel: props => <TabBarLabel {...props} name="Comp3" /> }} />
                              <TopTab.Screen name="Comp4" component={Comp4} options={{ tabBarLabel: props => <TabBarLabel {...props} name="Comp4" /> }} />
                    </TopTab.Navigator>
          )
}

const styles = StyleSheet.create({
          tabBar: {
                    backgroundColor: '#fff',
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    elevation: 0,
          },
          tab: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: "100%",
                    paddingVertical: 5
          },
          icon: {
                    width: 24,
                    height: 24
          }
})