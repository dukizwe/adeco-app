import moment from 'moment'
import React, { useContext, useState } from 'react'
import { Image, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native'
import { useAppSelector } from '../../hooks/useAppSelector'
import { UserDebtInterface } from '../../interfaces/UserDebtInterface'
import { queueListSelector } from '../../store/selectors/contributionSelectors'
import { primaryColor } from '../../styles'
import { User } from '../../types/User'

interface Props {
          userDebt: UserDebtInterface
}

export default function UserDebt({ userDebt }: Props) {
          const StatusBubble = () => {
                    if(userDebt.statusId.code == "PEDDING") {

                    }
                    return <View style={styles.statusBubble}>

                    </View>
          }
          return (
                    <View>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                        useForeground={true}
                              >
                                        <View style={{ ...styles.user }}>
                                                  <View style={styles.userImage}>
                                                            <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={require('../../../assets/girl.jpg')} />
                                                  </View>
                                                  <View style={styles.userInfo}>
                                                            <View style={styles.userTop}>
                                                                      <Text style={styles.userNames}>
                                                                                {userDebt.assignedTo.firstName} {userDebt.assignedTo.lastName}
                                                                      </Text>
                                                                      <Text style={styles.price}>
                                                                                {userDebt.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                      </Text>
                                                            </View>
                                                            <View style={styles.userBottom}>
                                                                      <Text style={styles.debtDate}>
                                                                                { moment(userDebt.createdAt).format('DD/MM/YYYY')}
                                                                      </Text>
                                                                      <View style={styles.status}>
                                                                                <StatusBubble />
                                                                                <Text style={styles.statusTitle}>
                                                                                          { userDebt.statusId.title }
                                                                                </Text>
                                                                      </View>
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
                    marginLeft: 10,
                    flex: 1
          },
          userTop: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
          },
          price: {
                    fontWeight: "bold",
                    opacity: 0.7
          },
          userNames: {
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: 16,
                    opacity: 0.8,
                    marginBottom: 5
          },
          userBottom: {
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: "space-between"
          },
          debtDate: {
                    fontSize: 12,
                    color: '#777'
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
          },
          status: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          statusTitle: {
                    fontSize: 12,
                    color: '#777',
                    marginLeft: 3,
                    textTransform: "lowercase"
          },
          statusBubble: {
                    width: 13,
                    height: 13,
                    borderWidth: 1,
                    borderColor: '#777',
                    borderRadius: 30
          }
})