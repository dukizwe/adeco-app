import { View } from 'native-base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TouchableNativeFeedback, BackHandler, ScrollView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { ContributorInterface } from '../../../interfaces/ContributorInterface'
import { Entypo, Feather, MaterialIcons, Octicons, Ionicons, AntDesign } from '@expo/vector-icons';
import { primaryColor } from '../../../styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { queueListSelector } from '../../../store/selectors/contributionSelectors'
import { setQueueListAction } from '../../../store/actions/contributionActions'
import { ActionNames } from '../../../types/ActionNames'
import { QueuedUser } from '../../../types/QueuedUser'
import { RateTypeInterface } from '../../../interfaces/RateTypeInterface'
import Animated, { withTiming } from 'react-native-reanimated'
import { COLORS } from '../../../styles/COLORS'
import * as Haptics from 'expo-haptics';

interface Props {
          contributor: ContributorInterface,
          modalizeRef: React.RefObject<Modalize>,
          isOpen: boolean,
          setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
          loadingForm: boolean,
          setLoadingForm: React.Dispatch<React.SetStateAction<boolean>>,
          rateTypes: RateTypeInterface[]
}

export default function ContibutorActionsModalize({ contributor, modalizeRef, isOpen, setIsOpen, loadingForm, setLoadingForm, rateTypes }: Props) {
          const dispatch = useDispatch()
          const queueList = useSelector(queueListSelector)
          const contentRef = useRef<ScrollView>(null)

          const contributions = queueList.contributions
          const myContibution = contributions.find(c => c._id == contributor._id)

          const [selectContribution, setSelectContribution] = useState<boolean>(false)
          const [selectDebt, setSelectDebt] = useState<boolean>(false)
          const [selectPayedDebt, setSelectPayedDebt] = useState<boolean>(false)
          const [selectedRateTypes, setSelectedRateTypes] = useState<RateTypeInterface[]>([])

          const [showRateTypes, setShowRateTypes] = useState(false)

          const handleConfirm = useCallback(() => {
                    if (myContibution) {
                              const newContributions = queueList.contributions.map(c => {
                                        if (c._id === myContibution._id) {
                                                  return {
                                                            ...c,
                                                            actions: {
                                                                      action: selectContribution ? contributor.contributionAmount : undefined,
                                                                      debt: selectDebt ? contributor.debt?.monthlyRestrain : undefined,
                                                                      payedDebt: selectPayedDebt ? contributor.debt?.amount : undefined,
                                                                      rates: selectedRateTypes
                                                            }
                                                  }
                                        } else {
                                                  return c
                                        }
                              })
                              dispatch(setQueueListAction({ ...queueList, contributions: newContributions }))
                    } else {
                              const newContribution = {
                                        _id: contributor._id,
                                        actions: {
                                                  action: selectContribution ? contributor.contributionAmount : undefined,
                                                  debt: selectDebt ? contributor.debt?.monthlyRestrain : undefined,
                                                  payedDebt: selectPayedDebt ? contributor.debt?.amount : undefined,
                                                  rates: selectedRateTypes
                                        }
                              }
                              dispatch(setQueueListAction({ ...queueList, contributions: [...queueList.contributions, newContribution] }))
                    }
                    modalizeRef.current?.close()
          }, [selectContribution, selectDebt, selectPayedDebt, myContibution, queueList, selectedRateTypes])

          const toggleDebetTypes = () => {
                    setShowRateTypes(t => !t)
          }

          const isRateTypeSelected: (type: RateTypeInterface) => boolean = type => selectedRateTypes.find(t => t._id == type._id) ? true : false

          const toggleRateType = (type: RateTypeInterface) => {
                    if (isRateTypeSelected(type)) {
                              const newTypes = selectedRateTypes.filter(t => t._id != type._id)
                              setSelectedRateTypes(newTypes)
                    } else {
                              setSelectedRateTypes(types => [...types, type])
                    }
          }
          const onDebtLongPress = () => {
                    setSelectPayedDebt(t => !t)
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }

          const entering = () => {
                    'worklet';
                    const animations = {
                              transform: [{ translateY: withTiming(0, { duration: 150 }) }],
                              opacity: withTiming(1, { duration: 150 }),
                    };
                    const initialValues = {
                              transform: [{ translateY: -10 }],
                              opacity: 0
                    };
                    return {
                              initialValues,
                              animations,
                    };
          };
          const exiting = () => {
                    'worklet';
                    const animations = {
                              transform: [{ translateY: withTiming(-10, { duration: 150 }) }],
                              opacity: withTiming(0, { duration: 150 }),
                    };
                    const initialValues = {
                              transform: [{ translateY: 0 }],
                              opacity: 1
                    };
                    return {
                              initialValues,
                              animations,
                    }
          }

          const getRateAmount: () => number = useCallback(() => {
                    var total = 0
                    myContibution?.actions?.rates?.forEach(r => {
                              total += r.amount
                    })
                    return total
          }, [myContibution])

          useEffect(() => {
                    setSelectContribution(myContibution && myContibution.actions?.action ? true : false)
                    setSelectDebt(myContibution && myContibution.actions?.debt ? true : false)
                    setSelectPayedDebt(myContibution && myContibution.actions?.payedDebt ? true : false)
                    setSelectedRateTypes(myContibution && myContibution.actions?.rates ? myContibution.actions.rates : [])
          }, [myContibution])

          useEffect(() => {
                    if (showRateTypes) {
                              contentRef.current?.scrollToEnd({ animated: true })
                              const handler = BackHandler.addEventListener('hardwareBackPress', () => {
                                        setShowRateTypes(false)
                                        return true
                              })
                              return () => {
                                        handler.remove()
                              }
                    }
          }, [showRateTypes])
          return (
                    <Portal>
                              <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                        <Modalize
                                                  ref={modalizeRef}
                                                  contentRef={contentRef}
                                                  onClose={() => {
                                                            Keyboard.dismiss()
                                                  }}
                                                  onClosed={() => {
                                                            setIsOpen(false)
                                                            setLoadingForm(true)
                                                            setShowRateTypes(false)
                                                  }}
                                                  // adjustToContentHeight
                                                  handlePosition="inside"
                                                  modalStyle={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                                                  scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
                                                  modalHeight={showRateTypes ? 500 : 410}
                                                  snapPoint={400}
                                                  closeSnapPointStraightEnabled={true}
                                        >
                                                  {loadingForm ? <ActivityIndicator
                                                            animating
                                                            size={"small"}
                                                            color='#777'
                                                            style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                                                  /> : <View style={styles.modalContainer}>
                                                            <View style={styles.userImage}>
                                                                      {contributor.image ? <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={{ uri: contributor.image }} /> :
                                                                      <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={require('../../../../assets/images/man.jpg')} />}
                                                            </View>
                                                            <Text style={styles.title}>
                                                                      {contributor.firstName} {contributor.lastName}
                                                            </Text>
                                                            <View style={styles.actions}>
                                                                      <TouchableNativeFeedback onPress={() => setSelectContribution(t => !t)}>
                                                                                <View style={styles.action}>
                                                                                          <View style={styles.actionDetails}>
                                                                                                    <Image source={require('../../../../assets/icons/contribution.png')} style={styles.actionImage} />
                                                                                                    <View style={styles.actionLabels}>
                                                                                                              <Text style={styles.actionTitle}>Contribution</Text>
                                                                                                              <Text style={styles.actionAmount}>
                                                                                                                        {contributor.contributionAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                                                              </Text>
                                                                                                    </View>
                                                                                          </View>
                                                                                          <View style={[styles.checkCircle, selectContribution && { backgroundColor: primaryColor, borderWidth: 0 }]}>
                                                                                                    {selectContribution && <Ionicons name="md-checkmark-outline" size={18} color="#fff" />}
                                                                                          </View>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                                      <TouchableNativeFeedback onPress={() => setSelectDebt(t => !t)} disabled={!contributor.debt || contributor.debt.amount == 0} onLongPress={onDebtLongPress}>
                                                                                <View style={styles.action}>
                                                                                          <View style={styles.actionDetails}>
                                                                                                    <Image source={require('../../../../assets/icons/debt.png')} style={styles.actionImage} />
                                                                                                    <View style={styles.actionLabels}>
                                                                                                              <Text style={styles.actionTitle}>
                                                                                                                        Dette{contributor.debt && ` - ${contributor.debt?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF`}
                                                                                                                        {selectPayedDebt && <Ionicons name="checkmark-circle" size={13} color={COLORS.primary} style={{ marginLeft: 5 }} />}
                                                                                                              </Text>
                                                                                                              {contributor.debt ? <Text style={styles.actionAmount}>
                                                                                                                        {contributor.debt?.monthlyRestrain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                                                                        ({(contributor.debt.histories?.length || 0) + 1}/{contributor.debt.payIn} mois)
                                                                                                              </Text> : <Text style={[styles.actionAmount, { color: COLORS.primary }]}>
                                                                                                                        Pas de dette
                                                                                                              </Text>}
                                                                                                    </View>
                                                                                          </View>
                                                                                          {contributor.debt ? <View style={[styles.checkCircle, selectDebt && { backgroundColor: primaryColor, borderWidth: 0 }]}>
                                                                                                    {selectDebt && <Ionicons name="md-checkmark-outline" size={18} color="#fff" />}
                                                                                          </View> : null}
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                                      <TouchableNativeFeedback onPress={toggleDebetTypes}>
                                                                                <View style={styles.action}>
                                                                                          <View style={styles.actionDetails}>
                                                                                                    <Image source={require('../../../../assets/icons/contribution.png')} style={styles.actionImage} />
                                                                                                    <View style={styles.actionLabels}>
                                                                                                              <Text style={styles.actionTitle}>Retard</Text>
                                                                                                              {(myContibution?.actions?.rates && myContibution.actions?.rates?.length > 0) ? <View>
                                                                                                                        <Text style={styles.actionAmount}>
                                                                                                                                  {getRateAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                                                                                  ({myContibution?.actions?.rates.length > 1 ? `${myContibution?.actions?.rates.length} retards` :
                                                                                                                                            myContibution?.actions?.rates[0].name})
                                                                                                                        </Text>
                                                                                                              </View> :
                                                                                                                        <View>
                                                                                                                                  {showRateTypes ? <Text style={styles.actionAmount}>Cliquer pour masquer les types</Text> :
                                                                                                                                            <Text style={styles.actionAmount}>Cliquer pour choisr le type</Text>}
                                                                                                                        </View>}
                                                                                                    </View>
                                                                                          </View>
                                                                                          {showRateTypes ? <Entypo name="chevron-small-up" size={24} color="#777" /> :
                                                                                                    <Entypo name="chevron-small-down" size={24} color="#777" />}
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                                      {showRateTypes && <>
                                                                                <Animated.View style={styles.rateTypes} entering={entering} exiting={exiting}>
                                                                                          {rateTypes.map(type => {
                                                                                                    return (
                                                                                                              <TouchableNativeFeedback key={type._id} onPress={() => toggleRateType(type)}>
                                                                                                                        <View style={styles.rateType}>
                                                                                                                                  <View style={styles.rateTypeLabels}>
                                                                                                                                            <Text style={styles.rateTypeName}>{type.name}</Text>
                                                                                                                                            <Text style={styles.actionAmount}>
                                                                                                                                                      {type.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                                                                                            </Text>
                                                                                                                                  </View>
                                                                                                                                  <View style={[styles.checkCircle, isRateTypeSelected(type) && { backgroundColor: primaryColor, borderWidth: 0 }]}>
                                                                                                                                            {isRateTypeSelected(type) && <Ionicons name="md-checkmark-outline" size={18} color="#fff" />}
                                                                                                                                  </View>
                                                                                                                        </View>
                                                                                                              </TouchableNativeFeedback>
                                                                                                    )
                                                                                          })}
                                                                                </Animated.View>
                                                                      </>}
                                                            </View>
                                                            <TouchableNativeFeedback onPress={handleConfirm}>
                                                                      <View style={[styles.confirmBtn]}>
                                                                                <Text style={styles.confirmBtnText}>Confirmer</Text>
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                  </View>}
                                        </Modalize>
                              </GestureHandlerRootView>
                    </Portal>
          )
}

const styles = StyleSheet.create({
          modalContainer: {
                    paddingVertical: 10
          },
          userImage: {
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    alignSelf: "center",
                    marginVertical: 15,
                    marginBottom: 10
          },
          title: {
                    color: '#000',
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    fontSize: 18,
                    textAlign: "center",
                    opacity: 0.6,
                    marginBottom: 10
          },
          actions: {

          },
          action: {
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
          },
          actionDetails: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          actionImage: {
                    width: 25,
                    height: 25
          },
          actionLabels: {
                    marginLeft: 10
          },
          actionTitle: {
                    fontWeight: "bold"
          },
          actionAmount: {
                    color: '#777',
                    fontSize: 13
          },
          checkCircle: {
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: '#777',
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 20
          },
          confirmBtn: {
                    borderRadius: 8,
                    paddingVertical: 15,
                    backgroundColor: primaryColor,
                    marginHorizontal: 10,
                    marginTop: 10
          },
          confirmBtnText: {
                    color: '#FFF',
                    fontWeight: "bold",
                    textAlign: "center"
          },
          rateTypes: {
          },
          rateType: {
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 45
          },
          rateTypeLabels: {
          },
          rateTypeName: {

          }
})