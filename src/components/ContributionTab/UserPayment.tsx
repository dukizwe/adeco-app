import React, { useContext, useState } from 'react'
import { Image, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { User } from '../../types/User'
import { useAppSelector } from '../../hooks/useAppSelector'
import { inSelectSelector, queueListSelector, selectedBatchSelector } from '../../store/selectors/contributionSelectors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setInSelectAction, setQueueListAction, setSelectedBatchAction, setStartAnimationAction } from '../../store/actions/contributionActions'
import { ActionNames } from '../../types/ActionNames'

export default function UserPayment({ user }: { user: User }) {

          const inSelect = useAppSelector(inSelectSelector)
          const selectedBatch = useAppSelector(selectedBatchSelector)
          const queueList = useAppSelector(queueListSelector)
          
          const dispatch = useAppDispatch()
          const isSelected = (user: User) => selectedBatch.find(u => u.id == user.id)

          const inSelectStyles = isSelected(user) ? { backgroundColor: '#c9c9c9' } : {}

          const toggleSelectedBatch = (user: User) => {
                    if (isSelected(user)) {
                              const newSelected = selectedBatch.filter(u => u.id != user.id)
                              dispatch(setSelectedBatchAction(newSelected))
                              if (selectedBatch.length - 1 === 0) {
                                        dispatch(setInSelectAction(false))
                                        dispatch(setStartAnimationAction(false))
                              }
                    } else {
                              dispatch(setSelectedBatchAction([...selectedBatch, user]))
                    }
          }

          const onUserPress = () => {
                    if(inSelect) {
                              toggleSelectedBatch(user)
                    }
          }

          const onUserLongPress = (user: User) => {
                    dispatch(setInSelectAction(true))
                    toggleSelectedBatch(user)
                    dispatch(setStartAnimationAction(true))
          }

          const isInQueueList = (actionName: ActionNames) => {
                    const actions = queueList[user.id]?.actions
                    if(actions) {
                              return actions[actionName] ? true : false
                    }
                    return false
          }
          
          const payAction = (actionName: ActionNames) => {
                    if(queueList[user.id]) {
                              if(isInQueueList(actionName)) {
                                        const actions = queueList[user.id].actions
                                        if(actions) {
                                                  const { [actionName]: removed, ...newActions } = actions
                                                  dispatch(setQueueListAction({...queueList, [user.id]: {...user, actions: newActions}}))
                                        }
                              } else {
                                        const actions = user.actions
                                        if(actions) {
                                                  dispatch(setQueueListAction({
                                                            ...queueList,
                                                            [user.id]: {...user, actions: {...queueList[user.id].actions, [actionName]: actions[actionName]}}
                                                  }))
                                        }
                              }
                    } else {
                              const actions = user.actions
                              if(actions) {
                                        dispatch(setQueueListAction({
                                                  ...queueList,
                                                  [user.id]: {...user, actions: {[actionName]: actions[actionName]}}
                                        }))
                              }
                    }
          }
          const hasDebt: boolean = (user.actions?.debt  && user.actions?.debt > 0) ? true : false
          return (
                    <View>
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                              onLongPress={() => onUserLongPress(user)}
                              // delayLongPress={100}
                              onPress={onUserPress}
                              useForeground={true}
                    >
                              <View style={{...styles.user, ...inSelectStyles}}>
                                        <View style={styles.userImage}>
                                                  <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={require('../../../assets/girl.jpg')} />
                                        </View>
                                        <View style={styles.userInfo}>
                                                  <View style={styles.infoTop}>
                                                            <Text style={styles.userNames}>Dukizwe Darcy</Text>
                                                            <View style={styles.dotIndicator}>
                                                                      {isInQueueList('action') && <View style={{...styles.selectedCheck, backgroundColor: '#40c2d7f5'}}>
                                                                                <Feather name="check" size={19} color="#fff" style={{marginTop: -1, marginLeft: -2}} />
                                                                      </View>}
                                                                      {isInQueueList('rate') && <View style={{...styles.selectedCheck, backgroundColor: '#362b89ed'}}>
                                                                                <Feather name="check" size={19} color="#fff" style={{marginTop: -1, marginLeft: -2}} />
                                                                      </View>}
                                                                      {isInQueueList('debt') && <View style={{...styles.selectedCheck, backgroundColor: '#873475'}}>
                                                                                <Feather name="check" size={19} color="#fff" style={{marginTop: -1, marginLeft: -2}} />
                                                                      </View>}
                                                            </View>
                                                  </View>
                                                  <View style={styles.userActions}>
                                                            <TouchableNativeFeedback
                                                                      accessibilityRole="button"
                                                                      background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                                      onPress={() => payAction('action')}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#40c2d7f5', opacity: isInQueueList('action') ? 0.5 : 1}}>
                                                                                <Text style={styles.actionTitle}>action</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>{user.actions?.action}</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            <TouchableNativeFeedback
                                                                      accessibilityRole="button"
                                                                      background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                                      onPress={() => payAction('rate')}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#362b89ed', opacity: isInQueueList('rate') ? 0.5 : 1}}>
                                                                                <Text style={styles.actionTitle}>retard</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>{user.actions?.rate}</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            {hasDebt &&
                                                            <TouchableNativeFeedback
                                                                      accessibilityRole="button"
                                                                      background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                                      onPress={() => payAction('debt')}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#873475', opacity: isInQueueList('debt') ? 0.5 : 1}}>
                                                                                <Text style={styles.actionTitle}>dette</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>{user.actions?.debt}</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            }
                                                  </View>
                                        </View>
                              </View>
                    </TouchableNativeFeedback>
                    </View>
          )
}


const styles = StyleSheet.create({
          user: {
                    backgroundColor: '#f2f6f7',
                    borderRadius: 10,
                    padding: 15,
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
          },
          userImage: {
                    width: 50,
                    height: 50,
                    borderRadius: 50
          },
          userInfo: {
                    marginLeft: 20,
                    flex: 1
          },
          infoTop: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
          },
          dotIndicator: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
          },
          selectedCheck: {
                    width: 20,
                    height: 20,
                    margin: 2,
                    backgroundColor: 'red',
                    borderRadius: 100,
                    padding: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          userNames: {
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: 16,
                    opacity: 0.8,
                    marginBottom: 5
          },
          userActions: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
          },
          actionButton: {
                    flex: 1,
                    margin: 2,
                    alignContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    paddingHorizontal: 5
          },
          actionTitle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    opacity: 0.8,
          },
          separator: {
                    height: 1,
                    width: '100%',
                    backgroundColor: '#fff',
                    opacity: 0.5
          },
          actionAmount: {
                    color: '#fff',
                    fontWeight: 'bold',
          }
})