import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button, Menu, Modal, Input, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelector';

export default function Header() {
          const user = useSelector(userSelector)
          return (
                    <View style={styles.header}>
                              <TouchableWithoutFeedback>
                                        <View style={styles.headerRight}>
                                                  <View style={styles.userImageContainer}>
                                                            <Image source={require('../../../assets/girl.jpg')} style={styles.userImage} />
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
                              >
                                        <View style={{ width: 30, height: 30, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
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
                    top: -3,
                    left: 20
          }
})