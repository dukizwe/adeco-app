import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles';
import { Button, Menu, Modal, Input, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/core';

export default function Header() {
          return (<View style={styles.header}>
                    <TouchableWithoutFeedback>
                              <View style={styles.headerRight}>
                                        <View style={styles.userImageContainer}>
                                                  <Image source={require('../../../assets/girl.jpg')} style={styles.userImage} />
                                        </View>
                                        <View style={styles.nameRole}>
                                                  <Text style={styles.name}>Sophie</Text>
                                                  <Text style={styles.role}>Consultant</Text>
                                        </View>
                              </View>
                    </TouchableWithoutFeedback>
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                              onPress={() => navigation.openDrawer()}
                    >
                              <View style={{width: 30, height: 30, alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                                        <Feather name="bell" size={24} color="#777" />
                                        <View style={styles.badge} />
                              </View>
                    </TouchableNativeFeedback>
          </View>)
}