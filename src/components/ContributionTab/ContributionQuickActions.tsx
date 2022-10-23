import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, BackHandler, Easing, Text, TouchableNativeFeedback, StyleSheet, View, Image } from 'react-native'
import { Feather, FontAwesome } from '@expo/vector-icons'; 
import { useAppSelector } from '../../hooks/useAppSelector';
import { queueListSelector, selectedBatchSelector, usersSelector } from '../../store/selectors/contributionSelectors';
import { ActionNames } from '../../types/ActionNames';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setInSelectAction, setQueueListAction, setSelectedBatchAction, setStartAnimationAction } from '../../store/actions/contributionActions';
import { ContributorInterface } from '../../interfaces/ContributorInterface';
import { User } from '../../types/User';

interface Props {
          contributors: ContributorInterface[]
}
export default function ContributionQuickActions({ contributors }: Props) {

          const users = useAppSelector(usersSelector)
          const selectedBatch = useAppSelector(selectedBatchSelector)
          const queueList = useAppSelector(queueListSelector)

          const dispatch = useAppDispatch()

          const sideAnim = useRef(new Animated.Value(-65)).current
          const bottomAnim = useRef(new Animated.Value(-50)).current

          const toggleSelectAll = () => {
                    if(selectedBatch.length != contributors.length) {
                              dispatch(setSelectedBatchAction(contributors))
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
                    const newContributions: User[] = []
                    selectedBatch.forEach(user => {
                              const myContribution = queueList.contributions.find(c => c._id == user._id)
                              if(myContribution) {
                                        if(actionName === 'both') {
                                                  const newContribution: User = {
                                                            ...myContribution,
                                                            actions: {
                                                                      ...myContribution.actions,
                                                                      action: user.contributionAmount,
                                                                      debt: 0
                                                            }
                                                  }
                                                  newContributions.push(newContribution)
                                        } else {
                                                  const newContribution: User = {
                                                            ...myContribution,
                                                            actions: {
                                                                      ...myContribution.actions,
                                                                      [actionName]: actionName == "action" ? user.contributionAmount : 0
                                                            }
                                                  }
                                                  newContributions.push(newContribution)
                                        }
                              } else {
                                        if(actionName === 'both') {
                                                  const newContribution: User = {
                                                            _id: user._id,
                                                            actions: {
                                                                      action: user.contributionAmount,
                                                                      debt: 0
                                                            }
                                                  }
                                                  newContributions.push(newContribution)
                                        } else {
                                                  const newContribution: User = {
                                                            _id: user._id,
                                                            actions: {
                                                                      [actionName]: actionName == "action" ? user.contributionAmount : 0
                                                            }
                                                  }
                                                  newContributions.push(newContribution)
                                        }
                              }
                    })
                    dispatch(setQueueListAction({...queueList, contributions: newContributions}))
                    exitBatchSelect()
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
                              toValue: 10,
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
                                                  useForeground
                                                  onPress={() => payBatch('action')}>
                                                            <View style={styles.quickActionButtonWrapper}>
                                                                      <View style={{...styles.quickActionButton}}>
                                                                                <Image source={require('../../../assets/icons/contribution.png')} style={styles.actionImage} />
                                                                                <Text style={styles.actionButtonText}>action</Text>
                                                                      </View>
                                                            </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                  useForeground
                                                  onPress={() => payBatch('debt')}>
                                                            <View style={styles.quickActionButtonWrapper}>
                                                                      <View style={{...styles.quickActionButton}}>
                                                                                <Image source={require('../../../assets/icons/debt.png')} style={styles.actionImage} />
                                                                                <Text style={styles.actionButtonText}>dette</Text>
                                                                      </View>
                                                            </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                  useForeground
                                                  onPress={() => payBatch('both')}>
                                                            <View style={styles.quickActionButtonWrapper}>
                                                                      <View style={{...styles.quickActionButton}}>
                                                                                <FontAwesome name="dollar" size={20} color="#777" />
                                                                                <Text style={styles.actionButtonText}>les deux</Text>
                                                                      </View>
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
                    borderRadius: 5,
                    position: 'absolute',
                    bottom: 0,
                    marginHorizontal: 10,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
          },
          exitButton: {
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    minWidth: 40,
                    minHeight: 55
          },
          actions: {
                    flexDirection: 'row',
                    flex: 1,
          },
          quickActionButtonWrapper: {
                    borderRadius: 5,
                    overflow: "hidden",
                    marginHorizontal: 2,
                    flex: 1
          },
          quickActionButton: {
                    backgroundColor: '#f2f6f7',
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 5
          },
          selectAllCircle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: 40,
                    minHeight: 55
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
          actionImage: {
                    width: 20,
                    height: 20
          },
          actionButtonText: {
                    color: '#000',
                    opacity: 0.8,
                    textAlign: "center"
          }
})