import React, { useContext, useState } from 'react'
import { Image, TouchableNativeFeedback, View, Text } from 'react-native'
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import UsersPaymentContext from '../../context/UsersPaymentContext'

export default function UserPayment({ user }) {
          const [actions, setAction] = useState(user.actions)
          const { inSelect, setInSelect, selectedBatch, onUserLongPress, toggleSelectedBatch, isSelected, queueList, setQueueList } = useContext(UsersPaymentContext)
          const CanITouch = (props) => {
                    if(props.touchable == true && inSelect == false) {
                              return (
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                                  onPress={props.onPress}
                                        >{props.children}</TouchableNativeFeedback>
                              )
                    } else {
                              return props.children
                    }
          }
          const inSelectStyles = isSelected(user) ? { backgroundColor: '#c9c9c9' } : {}
          const onUserPress = () => {
                    if(inSelect) {
                              toggleSelectedBatch(user)
                    }
          }

          const isInQueueList = (actionName) => queueList[user.id]?.actions[actionName] ? true : false
          
          const payAction = (actionName) => {
                    if(queueList[user.id]) {
                              if(isInQueueList(actionName)) {
                                        const { [actionName]: removed, ...newActions } = queueList[user.id].actions
                                        setQueueList(lastList => ({
                                                  ...lastList,
                                                  [user.id]: {...user, actions: newActions}
                                        }))
                              } else {
                                        setQueueList(lastList => ({
                                                  ...lastList,
                                                  [user.id]: {...user, actions: {...queueList[user.id].actions, [actionName]: user.actions[actionName]}}
                                        }))
                              }
                    } else {
                              setQueueList(lastList => ({
                                        ...lastList,
                                        [user.id]: {...user, actions: {[actionName]: user.actions[actionName]}}
                              }))
                    }
          }
          const hasDebt = user.actions.debt > 0
          return (
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                              onLongPress={() => onUserLongPress(user)}
                              onPress={onUserPress}
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
                                                                      background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                                                      onPress={() => payAction('action')}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#40c2d7f5'}}>
                                                                                <Text style={styles.actionTitle}>action</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>{user.actions.action}</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            <TouchableNativeFeedback
                                                                      accessibilityRole="button"
                                                                      background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                                                      onPress={() => payAction('rate')}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#362b89ed'}}>
                                                                                <Text style={styles.actionTitle}>retard</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>{user.actions.rate}</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            {hasDebt &&
                                                            <TouchableNativeFeedback
                                                                      accessibilityRole="button"
                                                                      background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                                                      onPress={() => payAction('debt')}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#873475'}}>
                                                                                <Text style={styles.actionTitle}>dette</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>{user.actions.debt}</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            }
                                                  </View>
                                        </View>
                              </View>
                    </TouchableNativeFeedback>
          )
}