import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles';
import { Button, Menu, Modal, Input, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/core';

export default function Header() {
          return (<View style={styles.header}>
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                              onPress={() => navigation.openDrawer()}
                    >
                              <View style={{width: 30, height: 30, alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                                        <Feather name="menu" size={24} color="#777" />
                              </View>
                    </TouchableNativeFeedback>
                    <Text style={styles.brandName}>Rondera</Text>
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                              onPress={() => navigation.openDrawer()}
                    >
                              <View style={{width: 30, height: 30, alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                                        <Feather name="bell" size={24} color="#777" />
                              </View>
                    </TouchableNativeFeedback>
          </View>)
}