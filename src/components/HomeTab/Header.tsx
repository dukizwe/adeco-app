import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelector';
import { useAppSelector } from '../../hooks/useAppSelector';

export default function Header() {
          const user = useAppSelector(userSelector)
          const navigation = useNavigation()

          if(!user) return null
          return (
                    <View style={styles.header}>
                              <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen' as never)}>
                                        <View style={styles.headerRight}>
                                                  <View style={styles.userImageContainer}>
                                                            {user.image ? <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={{ uri: user.image }} /> :
                                                            <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={require('../../../assets/images/man.jpg')} />}
                                                  </View>
                                                  <View style={styles.nameRole}>
                                                            <Text style={styles.name}>{ user.firstName } { user.lastName }</Text>
                                                            <Text style={styles.role}>{ user.profileId.name }</Text>
                                                  </View>
                                        </View>
                              </TouchableWithoutFeedback>
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
                    </View>
          )
}

const styles = StyleSheet.create({
          header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingTop: 20,
                    paddingHorizontal: 30,
                    paddingBottom: 20,
                    backgroundColor: '#fff'
          },
          headerRight: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    flex: 1
          },
          userImageContainer: {
                    width: 50,
                    height: 50,
          },
          userImage: {
                    width: '100%',
                    height: '100%',
                    borderRadius: 50
          },
          nameRole: {
                    marginLeft: 10
          },
          name: {
                    fontSize: 16,
                    fontWeight: 'bold'
          },
          role: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.6
          },
          badge: {
                    width: 5,
                    height: 5,
                    borderRadius: 100,
                    backgroundColor: 'red',
                    position: 'absolute',
                    top: 5,
                    right: 10
          }
})