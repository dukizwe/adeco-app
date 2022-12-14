import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Image, TouchableNativeFeedback, View, Text, StyleSheet, Keyboard } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { QueuedUser } from '../../../types/QueuedUser'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { inSelectSelector, queueListSelector, selectedBatchSelector } from '../../../store/selectors/contributionSelectors'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { setInSelectAction, setQueueListAction, setSelectedBatchAction, setStartAnimationAction } from '../../../store/actions/contributionActions'
import { ActionNames } from '../../../types/ActionNames'
import { ContributorInterface } from '../../../interfaces/ContributorInterface'
import { Portal } from 'react-native-portalize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import ContibutorActionsModalize from './ContibutorActionsModalize'
import { primaryColor } from '../../../styles'
import { RateTypeInterface } from '../../../interfaces/RateTypeInterface'
import { COLORS } from '../../../styles/COLORS'
import * as Haptics from 'expo-haptics';

export default function Contributor({ contributor, rateTypes, noBatch = false }: { contributor: ContributorInterface, rateTypes: RateTypeInterface[], noBatch?: boolean }) {

          const inSelect = useAppSelector(inSelectSelector)
          const selectedBatch = useAppSelector(selectedBatchSelector)
          const queueList = useAppSelector(queueListSelector)
          
          const dispatch = useAppDispatch()
          const modalizeRef = useRef<Modalize>(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(false)

          const isSelected: boolean = selectedBatch.find(u => u._id === contributor._id) ? true : false

          const inSelectStyles = isSelected ? { backgroundColor: '#c9c9c9' } : {}

          const toggleSelectedBatch = () => {
                    if (isSelected) {
                              const newSelected = selectedBatch.filter(u => u._id != contributor._id)
                              dispatch(setSelectedBatchAction(newSelected))
                              if (selectedBatch.length - 1 === 0) {
                                        dispatch(setInSelectAction(false))
                                        dispatch(setStartAnimationAction(false))
                              }
                    } else {
                              dispatch(setSelectedBatchAction([...selectedBatch, contributor]))
                    }
          }

          const onUserPress = () => {
                    if(inSelect) {
                              toggleSelectedBatch()
                    } else {
                              setIsOpen(true)
                              modalizeRef.current?.open();
                    }
          }

          const onUserLongPress = () => {
                    if(noBatch) {
                              return false
                    }
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                    dispatch(setInSelectAction(true))
                    toggleSelectedBatch()
                    dispatch(setStartAnimationAction(true))
          }

          const contributions = queueList.contributions
          const myContibution = contributions.find(c => c._id == contributor._id)

          /**
           * Return the expected amount of a contributor
           */
          const getExpectedTotal: () => number = useCallback(() => {
                    var total = 0
                    const debt = contributor.debt ? contributor.debt?.monthlyRestrain : 0
                    if(contributor.debt && contributor.debt.payIn <= ((contributor.debt.histories?.length || 0) + 1)) {
                              total += contributor.debt.amount
                    }
                    total += contributor.contributionAmount + debt
                    return total
          }, [contributor])

          const getContributedTotal = useCallback(() => {
                    var total = 0
                    if(myContibution && myContibution.actions) {
                              const action = myContibution.actions?.action ? myContibution.actions?.action : 0
                              const debt = myContibution.actions?.debt ? myContibution.actions?.debt : 0
                              const payedDebt = myContibution.actions?.payedDebt ? myContibution.actions?.payedDebt : 0
                              total = action + debt + payedDebt
                    }
                    return total
          }, [myContibution])

          const getRateAmount: () => number = useCallback(() => {
                    var total = 0
                    myContibution?.actions?.rates?.forEach(r => {
                              total += r.amount
                    })
                    return total
          }, [myContibution])

          useEffect(() => {
                    if(isOpen) {
                              const timer = setTimeout(() => {
                                        setLoadingForm(false)
                              })
                              return () => {
                                        clearTimeout(timer)
                              }
                    }
          }, [isOpen])
          return (
                    <>
                    <ContibutorActionsModalize
                              contributor={contributor}
                              modalizeRef={modalizeRef}
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              loadingForm={loadingForm}
                              setLoadingForm={setLoadingForm}
                              rateTypes={rateTypes}
                    />
                    <View>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                        onLongPress={onUserLongPress}
                                        // delayLongPress={100}
                                        onPress={onUserPress}
                                        useForeground={true}
                              >
                                        <View style={{...styles.user, ...inSelectStyles}}>
                                                  <View style={styles.userImage}>
                                                            {contributor.image ? <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={{ uri: contributor.image }} /> :
                                                            <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={require('../../../../assets/images/man.jpg')} />}
                                                  </View>
                                                  <View style={styles.userInfo}>
                                                            <View style={styles.infoTop}>
                                                                      <Text style={styles.userNames}>
                                                                                { contributor.firstName } { contributor.lastName }
                                                                      </Text>
                                                                      {(getExpectedTotal() == getContributedTotal()) ? <View style={[styles.checkCircle]}>
                                                                                <Ionicons name="md-checkmark-outline" size={18} color="#fff" />
                                                                      </View> : null}
                                                            </View>
                                                            <View style={styles.userActions}>
                                                                      <View style={styles.actionsDetails}>
                                                                                <View style={styles.action}>
                                                                                          <Image source={require('../../../../assets/icons/contribution.png')} style={styles.actionIcon} />
                                                                                          <Text style={[styles.actionAmount, (myContibution && myContibution.actions?.action) ? { color: primaryColor } : undefined]}>
                                                                                                    { contributor.contributionAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
                                                                                          </Text>
                                                                                </View>
                                                                                {contributor.debt ? <View style={[styles.action, { marginLeft: 10 }]}>
                                                                                          <Image source={require('../../../../assets/icons/debt.png')} style={styles.actionIcon} />
                                                                                          <Text style={[styles.actionAmount, (myContibution && myContibution.actions?.debt) ? { color: primaryColor } : undefined]}>
                                                                                                    { contributor.debt.monthlyRestrain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
                                                                                          </Text>
                                                                                          {myContibution && myContibution.actions?.payedDebt && <Ionicons name="checkmark-circle" size={15} color={COLORS.primary} style={{ marginLeft: 2 }} />}
                                                                                </View> : null}
                                                                                {(myContibution?.actions?.rates && myContibution?.actions?.rates?.length > 0) ? <View style={[styles.action, { marginLeft: 10 }]}>
                                                                                          <Image source={require('../../../../assets/icons/contribution.png')} style={styles.actionIcon} />
                                                                                          <Text style={[styles.actionAmount, { color: primaryColor }]}>
                                                                                                    { getRateAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }
                                                                                          </Text>
                                                                                </View> : null}
                                                                      </View>
                                                                      <Text style={styles.contributorTotal}>{ getExpectedTotal().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") } BIF</Text>
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
          userInfo: {
                    marginLeft: 10,
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
          checkCircle: {
                    width: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20,
                    backgroundColor: primaryColor
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
          actionsDetails: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          action: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          actionIcon: {
                    width: 20,
                    height: 20
          },
          actionAmount: {
                    color: '#777',
                    fontWeight: 'bold',
                    fontSize: 11,
                    marginLeft: 2
          },
          contributorTotal: {
                    color: '#777',
                    fontSize: 13
          }
})