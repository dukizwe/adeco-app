import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState }  from "react";
import { ActivityIndicator, View, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RootNavigator from './routes/RootNavigator'
import { setUserAction } from "./store/actions/userActions";
import { userSelector } from "./store/selectors/userSelector";
import { Text } from 'react-native'
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/welcome/LoginScreen";
import Loading from "./components/app/Loading";
import { isLoadingSelector } from "./store/selectors/appSelectors";
import RegisterScreen from "./screens/welcome/RegisterScreen";
import * as Notifications from 'expo-notifications';
import * as ExpoLinking from 'expo-linking';
import registerPushNotification from "./utils/registerPushNotification";
import { setPushTokenAction } from "./store/actions/appActions";

const Stack = createStackNavigator()

export default function AppContainer() {
          const dispatch = useDispatch()
          const [userLoading, setUserLoading] = useState(true)
          const setToken = async () => {
                    const token = await registerPushNotification()
                    if(token?.data) {
                              dispatch(setPushTokenAction(token.data))
                    }
          }
          const user = useSelector(userSelector)
          const isLoading = useSelector(isLoadingSelector)
          const prefix = ExpoLinking.createURL('/')
          useEffect(() => {
                    Notifications.setNotificationHandler({
                              handleNotification: async () => ({
                                        shouldShowAlert: true,
                                        shouldPlaySound: true,
                                        shouldSetBadge: true,
                              }),
                    });
                    (async function() {
                              setToken()
                              const user = await AsyncStorage.getItem('user')
                              // await AsyncStorage.removeItem('user')
                              if(user) {
                                        dispatch(setUserAction(JSON.parse(user)))
                              }
                              setUserLoading(false)
                    })()
          }, [dispatch])
          return (
                    <>
                    {isLoading && <Loading />}
                    {userLoading ?
                              <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                        <ActivityIndicator color="#007BFF" animating={userLoading} size='large' />
                              </View> :
                              <NavigationContainer theme={{ colors: { background: "#fff" } } as any}
                                        linking={{
                                                  prefixes: [prefix],
                                                  config: {},
                                                  async getInitialURL() {
                                                            // First, you may want to do the default deep link handling
                                                            // Check if app was opened from a deep link
                                                            const url = await Linking.getInitialURL();
                                                            if (url != null) {
                                                                      return url;
                                                            }
                                                            // Handle URL from expo push notifications
                                                            const response = await Notifications.getLastNotificationResponseAsync();
                                                            const myUrl = response?.notification.request.content.data.url;
                                                            return myUrl;
                                                  },
                                                  subscribe(listener: any) {
                                                            const onReceiveURL = ({ url }: { url: any }) => listener(url);

                                                            // Listen to incoming links from deep linking
                                                            Linking.addEventListener('url', onReceiveURL);

                                                            // Listen to expo push notifications
                                                            const subscription = Notifications.addNotificationResponseReceivedListener(response => {
                                                                      const data = response.notification.request.content.data

                                                                      // Any custom logic to see whether the URL needs to be handled
                                                                      //...

                                                                      // Let React Navigation handle the URL
                                                                      listener(data.url);

                                                            });


                                                            return () => {
                                                                      // Clean up the event listeners
                                                                      Linking.removeEventListener('url', onReceiveURL);
                                                                      subscription.remove();
                                                            };
                                                  },
                                        } as any}
                              >
                                        {user ? <RootNavigator /> :
                                        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
                                                  <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false}}/>
                                                  <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false}}/>
                                        </Stack.Navigator>}
                              </NavigationContainer>}
                    </>
          )
}