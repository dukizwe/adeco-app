import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useDispatch } from "react-redux";
import { unsetUserAction } from "../../store/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppSelector } from "../../hooks/useAppSelector";
import { pushTokenSelector } from "../../store/selectors/appSelectors";
import fetchApi from "../../utils/fetchApi";
import { userSelector } from "../../store/selectors/userSelector";
import { useNavigation } from "@react-navigation/native";

export default function ProfileHeader() {
          const dispatch = useDispatch()
          const pushToken = useAppSelector(pushTokenSelector)
          const user = useAppSelector(userSelector)
          const navigation = useNavigation()

          const removeTokenAndCaches = async (userId: string) => {
                    const locale = await AsyncStorage.getItem('locale')
                    await AsyncStorage.clear()
                    if(locale) {
                              await AsyncStorage.setItem('locale', locale)
                    }
                    try {
                              await fetchApi('/auth/logout', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                                  pushNotificationToken: pushToken,
                                                  userId
                                        }),
                              })
                    } catch (error) {
                              console.log(error)
                    }
          }

          const onLogout  = () => {
                    if(!user) throw new Error('no user found')
                    removeTokenAndCaches(user?._id)
                    dispatch(unsetUserAction())
          }
          return (
                    <View style={styles.header}>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                                        onPress={() => navigation.navigate('NotificationsScreen' as never)}
                              >
                                        <View style={{ padding: 10 }}>
                                                  <Feather name="bell" size={24} color="#777" />
                                                  <View style={styles.badge} />
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.profileActions}>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                                        >
                                                  <View style={styles.headerBtn}>
                                                            <Feather name="settings" size={24} color="#777" />
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                                                  onPress={onLogout}
                                        >
                                                  <View style={styles.headerBtn}>
                                                            <MaterialIcons name="logout" size={24} color="#777" />
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          header: {
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 10
          },
          badge: {
                    width: 5,
                    height: 5,
                    borderRadius: 100,
                    backgroundColor: 'red',
                    position: 'absolute',
                    top: 5,
                    right: 10
          },
          headerBtn: {
                    padding: 10
          },
          profileActions: {
                    flexDirection: "row"
          }
})