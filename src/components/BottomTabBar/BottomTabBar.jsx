import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { primaryColor } from '../../styles';

export default function BottomTabBar({ state, descriptors, navigation }) {
          return (
                    <View style={styles.tabBar}>
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
                                                            navigation.navigate({ name: route.name, merge: true });
                                                  }
                                        };
                                        
                                        const onLongPress = () => {
                                                  navigation.emit({
                                                            type: 'tabLongPress',
                                                            target: route.key,
                                                  });
                                        };

                                        const Icon = () => {
                                                  if(route.name === 'Comp1') {
                                                            return <FontAwesome5 name="tasks" size={20} color={isFocused ? primaryColor : '#777'} />
                                                  }else if(route.name === 'Comp2') {
                                                            return <Entypo name="list" size={24} color={isFocused ? primaryColor : '#777'} />
                                                  } else if(route.name === 'Home')  {
                                                            return <Image source={require('../../../assets/logo.png')} style={styles.image} />
                                                  }else if(route.name === 'Comp3')  {
                                                            return <AntDesign name="barschart" size={24} color="#777" />
                                                  }else if(route.name === 'Comp4') {
                                                            return <Entypo name="list" size={24} color={isFocused ? primaryColor : '#777'} />
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
                                                            <View style={styles.tab}>
                                                                      <View>
                                                                                <Icon />
                                                                                {route.name === 'Comp1' && <Badge />}
                                                                      </View>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        );
                              })}
                    </View>
          );
}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          tabBar: {
                    backgroundColor: '#fff',
                    height: 70,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    padding: 0,
                    elevation: 1
          },
          tab: {
                    flex: 1,
                    width: width / 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10
          },
          badge: {
                    position: 'absolute',
                    right: -15,
                    top: -10,
                    backgroundColor: '#f53636',
                    padding: 5,
                    width: 20,
                    height: 20,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
          },
          badgeText: {
                    color: '#fff',
                    fontWeight: 'bold'
          },
          image: {
                    width: 50,
                    height: 50,
                    borderRadius: 50
          }
})