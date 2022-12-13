import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState }  from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RootNavigator from './routes/RootNavigator'
import { setUserAction } from "./store/actions/userActions";
import { userSelector } from "./store/selectors/userSelector";
import { Text } from 'react-native'
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { Host } from "react-native-portalize";
import { PortalProvider } from "@gorhom/portal";
import LoginScreen from "./screens/welcome/LoginScreen";
import Loading from "./components/app/Loading";
import { isLoadingSelector } from "./store/selectors/appSelectors";
import RegisterScreen from "./screens/welcome/RegisterScreen";

const Stack = createStackNavigator()

export default function AppContainer() {
          const dispatch = useDispatch()
          const [userLoading, setUserLoading] = useState(true)
          useEffect(() => {
                    (async function() {
                              const user = await AsyncStorage.getItem('user')
                              // await AsyncStorage.removeItem('user')
                              if(user) {
                                        dispatch(setUserAction(JSON.parse(user)))
                              }
                              setUserLoading(false)
                    })()
          }, [dispatch])
          const user = useSelector(userSelector)
          const isLoading = useSelector(isLoadingSelector)
          return (
                    <>
                    {isLoading && <Loading />}
                    {userLoading ?
                    <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                              <ActivityIndicator color="#007BFF" animating={userLoading} size='large' />
                    </View> :
                              <NavigationContainer theme={{ colors: { background: "#fff" } } as any}>
                                        {user ? <RootNavigator /> :
                                        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
                                                  <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false}}/>
                                                  <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false}}/>
                                        </Stack.Navigator>}
                              </NavigationContainer>}
                    </>
          )
}