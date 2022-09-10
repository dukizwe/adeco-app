import React, { useContext, useState } from 'react'
import { Image, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native'
import { useAppSelector } from '../../hooks/useAppSelector'
import { queueListSelector } from '../../store/selectors/contributionSelectors'
import { primaryColor } from '../../styles'
import { User } from '../../types/User'

interface Props {
          user: User,
          onUserPress: (userId: number) => void,
          /**
           * Represents the selected user id
           */
          userId?: number
}

export default function UserDebt({ user, onUserPress, userId }: Props) {
          const queueList = useAppSelector(queueListSelector)
          const isSelected: boolean = user.id === userId
          const inSelectStyles = isSelected ? { backgroundColor: '#c9c9c9' } : {}
          const isAleadyDebted: boolean = queueList[user.id]?.debt?.amount ? true : false
          return (
                    <View>
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                              onPress={() => onUserPress(user.id)}
                              useForeground={true}
                    >
                              <View style={{...styles.user, ...inSelectStyles}}>
                                        <View style={styles.userImage}>
                                                  <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={require('../../../assets/girl.jpg')} />
                                        </View>
                                        <View style={styles.userInfo}>
                                                  <View style={{}}>
                                                            <Text style={styles.userNames}>Dukizwe Darcy</Text>
                                                  </View>
                                                  <View style={styles.userActions}>
                                                           {isAleadyDebted &&  <View style={[styles.debtAmount, { backgroundColor: '#fff'}]}>
                                                                      <Text style={{ fontWeight: 'bold', color: '#96A5B0'}} >
                                                                                { queueList[user.id].debt?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
                                                                      </Text>
                                                                      <Text style={styles.newBadge}>N</Text>
                                                            </View>}
                                                            <Text style={[styles.debtAmount, { marginLeft: 5 }]}>320 000</Text>
                                                            <Text style={[styles.debtAmount, { marginLeft: 5 }]}>320 000</Text>
                                                           {/*  <View style={styles.debtCountContainer}>
                                                                      <Text style={ styles.debtCount}>+2</Text>
                                                            </View> */}
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
          },
          debtAmount: {
                    backgroundColor: '#D1E4F1',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                    fontWeight: 'bold',
                    color: '#96A5B0',
                    elevation: 5,
                    shadowColor: '#c4c4c4'
          },
          debtCountContainer: {
                    minWidth: 20,
                    height: 20,
                    paddingBottom: 2,
                    paddingHorizontal: 3,
                    borderRadius: 50,
                    backgroundColor: primaryColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5
          },
          debtCount: {
                    fontSize: 11,
                    color: '#fff',
                    fontWeight: 'bold',
                    opacity: 0.8
          },
          newBadge: {
                    paddingHorizontal: 3,
                    borderRadius: 5,
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    backgroundColor: primaryColor,
                    fontSize: 8,
                    color: '#fff',
                    fontWeight: 'bold'
          }
})