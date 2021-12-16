import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, BackHandler, Easing, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import styles from './styles';
import UsersPaymentContext from '../../context/UsersPaymentContext';


export default function UsersPaymentsQuickActions() {
          const { users, selectedBatch, setSelectedBatch, setInSelect, queueList, setQueueList, setStartAnimation } = useContext(UsersPaymentContext)
          const sideAnim = useRef(new Animated.Value(-65)).current
          const bottomAnim = useRef(new Animated.Value(-50)).current
          const toggleSelectAll = () => {
                    if(selectedBatch.length != users.length) {
                              setSelectedBatch(users)
                    } else {
                              exitBatchSelect()
                    }
          }

          const exitBatchSelect = () => {
                    exitAnimation()
                    setSelectedBatch([])
                    setInSelect(false)
                    setQueueList({})
          }

          const payBatch = (actionName) => {
                    var newQList = {}
                    selectedBatch.forEach(user => {
                              if(queueList[user.id]) {
                                        if(actionName === 'both') {
                                                  const queue = {
                                                            ...user,
                                                            actions: {
                                                                      ...queueList[user.id].actions,
                                                                      action: user.actions.rate,
                                                                      debt: user.actions.debt
                                                            }
                                                  }
                                                  newQList = {...newQList, [user.id]: queue}
                                        } else {
                                                  const queue = {
                                                            ...user,
                                                            actions: {
                                                                      ...queueList[user.id].actions,
                                                                      [actionName]: user.actions[actionName] 
                                                            }
                                                  }
                                                  newQList = {...newQList, [user.id]: queue}
                                        }
                              } else {
                                        if(actionName === 'both') {
                                                  const queue = {
                                                            ...user,
                                                            actions: {
                                                                      action: user.actions.rate,
                                                                      debt: user.actions.debt
                                                            }
                                                  }
                                                  newQList = {...newQList, [user.id]: queue}
                                        } else {
                                                  const queue = {
                                                            ...user,
                                                            actions: {
                                                                      [actionName]: user.actions[actionName]
                                                            }
                                                  }
                                                  newQList = {...newQList, [user.id]: queue}
                                        }
                              }
                    })
                    setQueueList(newQList)
          }

          const handleBackButtonClick = () => {
                    exitBatchSelect()
                    return true;
          }

          useEffect(() => {
                    Animated.timing(sideAnim, {
                              toValue: 0,
                              delay: 100,
                              duration: 100,
                              easing: Easing.elastic(),
                              useNativeDriver: false
                    }).start()
                    Animated.timing(bottomAnim, {
                              toValue: 0,
                              duration: 100,
                              easing: Easing.elastic(),
                              useNativeDriver: false
                    }).start()
                    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
                    return () => {
                              BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
                    };
          }, [])
          const exitAnimation = () => {
                    Animated.timing(sideAnim, {
                              toValue: -65,
                              delay: 100,
                              duration: 100,
                              easing: Easing.elastic(),
                              useNativeDriver: false
                    }).start()
                    Animated.timing(bottomAnim, {
                              toValue: -50,
                              delay: 100,
                              duration: 100,
                              easing: Easing.elastic(),
                              useNativeDriver: false
                    }).start(() => setStartAnimation(false))
          }

          return (
                    <>
                    <Animated.View style={{...styles.quickActions, bottom: bottomAnim}}>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                        onPress={toggleSelectAll}>
                                        <View style={styles.selectAllCircle}>
                                                  <Animated.View style={{...styles.circle, marginLeft: sideAnim}}>
                                                            <Text style={styles.selectedCount}>{selectedBatch.length}</Text>
                                                  </Animated.View>
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={{...styles.actions, opacity: 1}}>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                                  onPress={() => payBatch('action')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#40c2d7f5'}}>
                                                            <Text style={styles.actionButtonText}>action</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                                  onPress={() => payBatch('debt')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#873475'}}>
                                                            <Text style={styles.actionButtonText}>dette</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                                  onPress={() => payBatch('both')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#547360'}}>
                                                            <Text style={styles.actionButtonText}>les deux</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                        onPress={exitBatchSelect}>
                                                  <View style={styles.exitButton}>
                                                            <Animated.View style={{marginRight: sideAnim}}>
                                                                      <Feather name="x" size={24} color="#777" />
                                                            </Animated.View>
                                                  </View>
                              </TouchableNativeFeedback>
                    </Animated.View>
                    </>
          )
}