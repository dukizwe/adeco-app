import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, BackHandler, Easing, Text, TouchableNativeFeedback, StyleSheet, View } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { useAppSelector } from '../../hooks/useAppSelector';
import { queueListSelector, selectedBatchSelector, usersSelector } from '../../store/selectors/contributionSelectors';
import { ActionNames } from '../../types/ActionNames';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setInSelectAction, setQueueListAction, setSelectedBatchAction, setStartAnimationAction } from '../../store/actions/contributionActions';

export default function ContributionQuickActions() {

          const users = useAppSelector(usersSelector)
          const selectedBatch = useAppSelector(selectedBatchSelector)
          const queueList = useAppSelector(queueListSelector)

          const dispatch = useAppDispatch()

          const sideAnim = useRef(new Animated.Value(-65)).current
          const bottomAnim = useRef(new Animated.Value(-50)).current

          const toggleSelectAll = () => {
                    if(selectedBatch.length != users.length) {
                              dispatch(setSelectedBatchAction(users))
                    } else {
                              exitBatchSelect()
                    }
          }

          const exitBatchSelect = () => {
                    exitAnimation()
                    dispatch(setSelectedBatchAction([]))
                    dispatch(setInSelectAction(false))
                    // setQueueList({})
          }

          const payBatch = (actionName: ActionNames) => {
                    var newQList = {}
                    selectedBatch.forEach(user => {
                              if(queueList[user.id]) {
                                        if(actionName === 'both') {
                                                  const queue = {
                                                            ...user,
                                                            actions: {
                                                                      ...queueList[user.id].actions,
                                                                      action: user.actions?.action,
                                                                      debt: user.actions?.debt
                                                            }
                                                  }
                                                  newQList = {...newQList, [user.id]: queue}
                                        } else {
                                                  const actions = user.actions
                                                  if(actions) {
                                                            const queue = {
                                                                      ...user,
                                                                      actions: {
                                                                                ...queueList[user.id].actions,
                                                                                [actionName]: actions[actionName] 
                                                                      }
                                                            }
                                                            newQList = {...newQList, [user.id]: queue}
                                                  }
                                        }
                              } else {
                                        if(actionName === 'both') {
                                                  const actions = user.actions
                                                  if(actions) {
                                                            const queue = {
                                                                      ...user,
                                                                      actions: {
                                                                                action: actions.rate,
                                                                                debt: actions.debt
                                                                      }
                                                            }
                                                            newQList = {...newQList, [user.id]: queue}
                                                  }
                                        } else {
                                                  const actions = user.actions
                                                  if(actions) {
                                                            const queue = {
                                                                      ...user,
                                                                      actions: {
                                                                                [actionName]: actions[actionName]
                                                                      }
                                                            }
                                                            newQList = {...newQList, [user.id]: queue}
                                                  }
                                        }
                              }
                    })
                    dispatch(setQueueListAction({...queueList, ...newQList}))
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
                              easing: Easing.elastic(0),
                              useNativeDriver: false
                    }).start()
                    Animated.timing(bottomAnim, {
                              toValue: 0,
                              duration: 100,
                              easing: Easing.elastic(0),
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
                              easing: Easing.elastic(0),
                              useNativeDriver: false
                    }).start()
                    Animated.timing(bottomAnim, {
                              toValue: -50,
                              delay: 100,
                              duration: 100,
                              easing: Easing.elastic(0),
                              useNativeDriver: false
                    }).start(() => dispatch(setStartAnimationAction(false)))
          }

          return (
                    <>
                    <Animated.View style={{...styles.quickActions, bottom: bottomAnim}}>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
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
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                  onPress={() => payBatch('action')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#40c2d7f5'}}>
                                                            <Text style={styles.actionButtonText}>action</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                  onPress={() => payBatch('debt')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#873475'}}>
                                                            <Text style={styles.actionButtonText}>dette</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                  onPress={() => payBatch('both')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#547360'}}>
                                                            <Text style={styles.actionButtonText}>les deux</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
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
const styles = StyleSheet.create({
          quickActions: {
                    backgroundColor: '#f2f6f7',
                    borderRadius: 5,
                    position: 'absolute',
                    bottom: 0,
                    marginHorizontal: 20,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
          },
          exitButton: {
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          actions: {
                    flexDirection: 'row',
                    flex: 1,
          },
          quickActionButton: {
                    height: 40,
                    flex: 1,
                    margin: 2,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          selectAllCircle: {
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          circle: {
                    width: 25,
                    height: 25,
                    borderRadius: 50,
                    borderColor: '#777',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
          },
          selectedCount: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.6,
                    fontWeight: 'bold'
          },
          actionButtonText: {
                    color: '#fff',
                    fontWeight: 'bold',
                    opacity: 0.8,
          }
})