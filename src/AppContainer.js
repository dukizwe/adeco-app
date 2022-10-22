import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState }  from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RootNavigator from './routes/RootNavigator'
import { setUserAction } from "./store/actions/userActions";
import { userSelector } from "./store/selectors/userSelector";
import { Text } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { Host } from "react-native-portalize";
import { PortalProvider } from "@gorhom/portal";
import LoginScreen from "./screens/welcome/LoginScreen";

const Stack = createStackNavigator()

export default function AppContainer() {
          const dispatch = useDispatch()
          const [userLoading, setUserLoading] = useState(true)
          useEffect(() => {
                    (async function() {
                              const user = await AsyncStorage.getItem('user')
                              // await AsyncStorage.removeItem('user')
                              dispatch(setUserAction(JSON.parse(user)))
                              setUserLoading(false)
                    })()
          }, [dispatch])
          const user = useSelector(userSelector)
          return (
                    userLoading ?
                    <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                              <ActivityIndicator color="#007BFF" animating={userLoading} size='large' />
                    </View> :
                    <PortalProvider>
                              <NavigationContainer theme={{ colors: { background: "#fff", }}}>
                                        {user ?
                                                  <Host>
                                                            <RootNavigator />
                                                  </Host>:
                                        <Stack.Navigator>
                                                  <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false}}/>
                                        </Stack.Navigator>}
                              </NavigationContainer>
                    </PortalProvider>
          )
}