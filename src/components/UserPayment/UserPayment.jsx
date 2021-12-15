import React, { useContext, useState } from 'react'
import { Image, TouchableNativeFeedback, View, Text } from 'react-native'
import styles from './styles'
import { Feather } from '@expo/vector-icons'
import UsersPaymentContext from '../../context/UsersPaymentContext'

export default function UserPayment({ user }) {
          const [actions, setAction] = useState(user.actions)
          const { inSelect, setInSelect, selectedBatch, setSelectedBatch, toggleSelectedBatch, isSelected } = useContext(UsersPaymentContext)
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
          const onLongPress = () => {
                    setInSelect(true)
                    toggleSelectedBatch(user)
          }
          const onPress = () => {
                    if(inSelect) {
                              toggleSelectedBatch(user)
                    }
          }
          return (
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                              onLongPress={onLongPress}
                              onPress={onPress}
                    >
                              <View style={{...styles.user, ...inSelectStyles}}>
                                        <View style={styles.userImage}>
                                                  <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={require('../../../assets/girl.jpg')} />
                                        </View>
                                        <View style={styles.userInfo}>
                                                  <View style={styles.infoTop}>
                                                            <Text style={styles.userNames}>Dukizwe Darcy</Text>
                                                            <View style={styles.dotIndicator}>
                                                                      {actions.action && <View style={{...styles.selectedCheck, backgroundColor: '#40c2d7f5', marginRight: actions.retard || actions.dette ? 10 : 0}}>
                                                                                <Feather name="check" size={19} color="#fff" style={{marginTop: -1, marginLeft: -2}} />
                                                                      </View>}
                                                                      {actions.retard && <View style={{...styles.selectedCheck, backgroundColor: '#362b89ed', marginRight: 10}}>
                                                                                <Feather name="check" size={19} color="#fff" style={{marginTop: -1, marginLeft: -2}} />
                                                                      </View>}
                                                                      {actions.dette && <View style={{...styles.selectedCheck, backgroundColor: '#873475'}}>
                                                                                <Feather name="check" size={19} color="#fff" style={{marginTop: -1, marginLeft: -2}} />
                                                                      </View>}
                                                            </View>
                                                  </View>
                                                  <View style={styles.userActions}>
                                                            <CanITouch touchable={!actions.action} onPress={() => setAction(prev => ({...prev, action: true}))}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#40c2d7f5', opacity: actions.action ? 0.5 : 1}}>
                                                                                <Text style={styles.actionTitle}>action</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>6000</Text>
                                                                      </View>
                                                            </CanITouch>
                                                            <CanITouch touchable={!actions.retard} onPress={() => setAction(prev => ({...prev, retard: true}))}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#362b89ed', marginLeft: 10, marginRight: user.hasDebt ? 10 : 0,  opacity: actions.retard ? 0.5 : 1}}>
                                                                                <Text style={styles.actionTitle}>retard</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>6000</Text>
                                                                      </View>
                                                            </CanITouch>
                                                            {user.hasDebt && <CanITouch touchable={!actions.dette} onPress={() => setAction(prev => ({...prev, dette: true}))}>
                                                                      <View  style={{...styles.actionButton, backgroundColor: '#873475',  opacity: actions.dette ? 0.5 : 1}}>
                                                                                <Text style={styles.actionTitle}>dette</Text>
                                                                                <View style={styles.separator}></View>
                                                                                <Text style={styles.actionAmount}>500 000</Text>
                                                                      </View>
                                                            </CanITouch>}
                                                  </View>
                                        </View>
                              </View>
                    </TouchableNativeFeedback>
          )
}