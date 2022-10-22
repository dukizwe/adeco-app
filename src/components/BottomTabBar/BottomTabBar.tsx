import React, { useEffect } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions, View } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { primaryColor } from '../../styles';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
          const { width } = useWindowDimensions()
          const MARGIN = 16
          const TAB_WIDTH = width - 20
          const TAB_BAR_WIDTH = TAB_WIDTH / state.routes.length

          const translateX = useSharedValue(0)

          const animatedStyles = useAnimatedStyle(() => ({
                    transform: [{ translateX: translateX.value }]
          }))

          useEffect(() => {
                    translateX.value = withSpring(state.index * TAB_BAR_WIDTH)
          }, [state.index])

          return (
                    <View style={[styles.tabBar, { width: TAB_WIDTH }]}>
                              <Animated.View style={[styles.tabSlider, { width: TAB_BAR_WIDTH }, animatedStyles]} />
                              {state.routes.map((route, index) => {
                                        const { options } = descriptors[route.key];
                                        const isFocused = state.index === index;
                                        
                                        const onPress = () => {
                                                  const event = navigation.emit({
                                                            type: 'tabPress',
                                                            target: route.key,
                                                            canPreventDefault: true,
                                                  });
                                                  if (!isFocused && !event.defaultPrevented) {
                                                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                                                            navigation.navigate(route.name);
                                                  }
                                        };
                                        
                                        const onLongPress = () => {
                                                  navigation.emit({
                                                            type: 'tabLongPress',
                                                            target: route.key,
                                                  });
                                        };

                                        const Icon = () => {
                                                  if(route.name === 'ContributionScreen') {
                                                            return <Image source={require('../../../assets/icons/contribution.png')} style={styles.icon} />
                                                  }else if(route.name === 'Comp2') {
                                                            return <Image source={require('../../../assets/icons/debt.png')} style={styles.icon} />
                                                  } else if(route.name === 'Home')  {
                                                            return <Image source={require('../../../assets/icons/home.png')} style={styles.icon} />
                                                  }else if(route.name === 'Comp3')  {
                                                            return <Image source={require('../../../assets/icons/activity.png')} style={styles.icon} />
                                                  }else {
                                                            return <Image source={require('../../../assets/icons/user.png')} style={styles.icon} />
                                                  }
                                        }

                                        const Badge = () => {
                                                  return <View style={styles.badge}><Text style={styles.badgeText}>7</Text></View>
                                        }
                                        return (
                                                  <TouchableNativeFeedback
                                                            accessibilityRole="button"
                                                            accessibilityState={isFocused ? { selected: true } : {}}
                                                            accessibilityLabel={options.tabBarAccessibilityLabel}
                                                            testID={options.tabBarTestID}
                                                            onPress={onPress}
                                                            onLongPress={onLongPress}
                                                            // style={{...styles.tab, backgroundColor: 'red', height: '100%', padding: 10}}
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                                                            key={route.key}
                                                  >
                                                            <View style={[styles.tab, { width: TAB_BAR_WIDTH }]}>
                                                                      <View>
                                                                                <Icon />
                                                                                {route.name === 'UsersPayment' && <Badge />}
                                                                      </View>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        );
                              })}
                    </View>
          );
}
const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          tabBar: {
                    backgroundColor: '#fff',
                    height: 80,
                    width: '95%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingVertical: 0,
                    // borderRadius: 10,
                    alignSelf: "center",
                    marginBottom: 5,
                    overflow: "hidden",
          },
          tab: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 20
          },
          badge: {
                    position: 'absolute',
                    right: -15,
                    top: -10,
                    backgroundColor: '#f53636',
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center'
          },
          badgeText: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 11
          },
          icon: {
                    width: 24,
                    height: 24
          },
          title: {
                    fontSize: 10,
                    textAlign: "center"
          },
          tabSlider: {
                    position: "absolute",
                    height: 3,
                    width: 100,
                    backgroundColor: primaryColor,
                    bottom: 0,
                    borderRadius: 10
          }
})