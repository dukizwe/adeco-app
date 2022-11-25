import moment from 'moment'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Image, TouchableNativeFeedback, View, Text, StyleSheet } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { DebtStatusCodes } from '../../enum/debtStatusCodes.enum'
import { useAppSelector } from '../../hooks/useAppSelector'
import { UserDebtInterface } from '../../interfaces/UserDebtInterface'
import { queueListSelector } from '../../store/selectors/contributionSelectors'
import { primaryColor } from '../../styles'
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS } from '../../styles/COLORS'
import UserDebtModalize from '../DebtTab/UserDebtModalize'

interface Props {
          userDebt: UserDebtInterface,
          isContribution?: boolean,
          onUserDebtUpdate?: (newUserDebt: UserDebtInterface) => void
}
type Bubbles = {
          [key in DebtStatusCodes]: JSX.Element
}

export default function UserDebt({ userDebt, onUserDebtUpdate, isContribution = false }: Props) {
          const modalizeRef = useRef<Modalize>(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(false)

          const queueList = useAppSelector(queueListSelector)

          /**
           * Determine if current debt is accepted and debited in queuList
           */
          const isDebited = useCallback(() => {
                    const debts = queueList.debts
                    if(!debts) {
                              return false
                    }
                    return debts.find(u => u._id == userDebt._id) ? true : false
          }, [queueList])

          const StatusBubble = () => {
                    const bubbles: Bubbles = {
                              [DebtStatusCodes.PEDDING]: <View style={styles.statusBubble} />,
                              [DebtStatusCodes.ACCEPTED]: <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.primary} />,
                              [DebtStatusCodes.CANCELLED]: <Ionicons name="close-circle-sharp" size={18} color={COLORS.minusAmount} />,
                              [DebtStatusCodes.GIVEN]: <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />,
                              [DebtStatusCodes.SETTLED]: <Ionicons name="checkmark-done-circle-sharp" size={18} color={COLORS.primary} />,
                    }
                    return bubbles[userDebt.statusId.code as DebtStatusCodes]
          }
          const onUserPress = () => {
                    setIsOpen(true)
                    modalizeRef.current?.open();
          }
          useEffect(() => {
                    if (isOpen) {
                              const timer = setTimeout(() => {
                                        setLoadingForm(false)
                              })
                              return () => {
                                        clearTimeout(timer)
                              }
                    }
          }, [isOpen])

          const getColor = () => {
                    if(userDebt.statusId.code == DebtStatusCodes.CANCELLED) {
                              return COLORS.minusAmount
                    } if(userDebt.statusId.code != DebtStatusCodes.PEDDING && userDebt.statusId.code != DebtStatusCodes.CANCELLED) {
                              return COLORS.primary
                    }
                    return '#777'
          }
          return (
                    <>
                              <UserDebtModalize
                                        userDebt={userDebt}
                                        modalizeRef={modalizeRef}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        loadingForm={loadingForm}
                                        setLoadingForm={setLoadingForm}
                                        onUserDebtUpdate={onUserDebtUpdate}
                                        isContribution={isContribution}
                              />
                              <View>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                                  useForeground={true}
                                                  onPress={onUserPress}
                                        >
                                                  <View style={{ ...styles.user }}>
                                                            <View style={styles.userImage}>
                                                                      <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={require('../../../assets/girl.jpg')} />
                                                                      {(isContribution && isDebited()) ? <View  style={styles.debitedIcon}>
                                                                                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} style={{ marginLeft: 2}} />
                                                                      </View> : null}
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
                                                                                          {moment(userDebt.createdAt).format('DD MMM YYYY')}
                                                                                </Text>
                                                                                <View style={styles.status}>
                                                                                          <StatusBubble />
                                                                                          <Text style={[styles.statusTitle, { color: getColor() }]}>
                                                                                                    {userDebt.statusId.title}
                                                                                          </Text>
                                                                                </View>
                                                                      </View>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                    </>
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
          debitedIcon: {
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    backgroundColor: COLORS.smallWhite,
                    borderRadius: 100,
                    width: 25,
                    height: 25,
                    justifyContent: "center",
                    alignItems: "center"
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