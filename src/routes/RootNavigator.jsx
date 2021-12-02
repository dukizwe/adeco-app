import React from 'react'
import { Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel';

export default function RootNavigator() {
          const entries = ['Lorrem Ipsum', 'Item 2', 'Lorrem Ipsum', 'Item 2']
          const renderItem = ({item, index}) => {
                    return <View style={{
                          backgroundColor:'floralwhite',
                          borderRadius: 5,
                          height: 250,
                          padding: 50,
                          marginLeft: 25,
                          marginRight: 25, }}>
                        <Text style={{fontSize: 30}}>{item}</Text>
                      </View>
          }
          /*return (
                    <Carousel
                              data={entries}
                              renderItem={renderItem}
                              sliderWidth={300}
                              itemWidth={300}
                    />
          )*/

          const BottomTab = createBottomTabNavigator()

          return (
                    <View style={styles.container}>
                              <NavigationContainer>
                                        <BottomTab.Navigator initialRouteName="Home" tabBar={props => <BottomTabBar {...props} />} screenOptions={{header: () => <Header />}}>
                                                  <BottomTab.Screen name="Comp1" component={Comp1} />
                                                  <BottomTab.Screen name="Comp2" component={Comp2} />
                                                  <BottomTab.Screen name="Home" component={HomeScreen} />
                                                  <BottomTab.Screen name="Comp3" component={Comp3} />
                                                  <BottomTab.Screen name="Comp4" component={Comp4} />
                                        </BottomTab.Navigator>
                              </NavigationContainer>
                    </View>
          );
}
