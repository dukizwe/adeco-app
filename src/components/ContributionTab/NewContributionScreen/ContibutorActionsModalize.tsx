import { View } from 'native-base'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TouchableNativeFeedback } from 'react-native'
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
import { User } from '../../../types/User'

interface Props {
          contributor: ContributorInterface,
          modalizeRef: React.RefObject<Modalize>,
          isOpen: boolean,
          setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
          loadingForm: boolean,
          setLoadingForm: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ContibutorActionsModalize({ contributor, modalizeRef, isOpen, setIsOpen, loadingForm, setLoadingForm }: Props) {

          const dispatch = useDispatch()
          const queueList = useSelector(queueListSelector)

          const contributions = queueList.contributions
          const myContibution = contributions.find(c => c._id == contributor._id)
          
          const [selectContribution, setSelectContribution] = useState<boolean>(false)
          const [selectDebt, setSelectDebt] = useState<boolean>(false)

          const handleConfirm = useCallback(() => {
                    if(myContibution) {
                              const newContributions = queueList.contributions.map(c => {
                                        if(c._id === myContibution._id) {
                                                  return {
                                                            ...c,
                                                            actions: {
                                                                      action: selectContribution ? contributor.contributionAmount : undefined,
                                                                      debt: selectDebt ? 0 : undefined,
                                                            }
                                                  }
                                        } else {
                                                  return c
                                        }
                              })
                              dispatch(setQueueListAction({...queueList, contributions: newContributions}))
                    } else {
                              const newContribution = {
                                        _id: contributor._id,
                                        actions: {
                                                  action: selectContribution ? contributor.contributionAmount : undefined,
                                                  debt: selectDebt ? 0 : undefined,
                                        }
                              }
                              dispatch(setQueueListAction({...queueList, contributions: [...queueList.contributions, newContribution]}))
                    }
                    modalizeRef.current?.close()
          }, [selectContribution, selectDebt, myContibution, queueList])

          useEffect(() => {
                    setSelectContribution(myContibution && myContibution.actions?.action ? true : false)
                    setSelectDebt(myContibution && myContibution.actions?.debt ? true : false)
          }, [myContibution])
          return (
                    <Portal>
                              <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                        <Modalize
                                                  ref={modalizeRef}
                                                  onClose={() => {
                                                            Keyboard.dismiss()
                                                  }}
                                                  onClosed={() => {
                                                            setIsOpen(false)
                                                            setLoadingForm(true)
                                                  }}
                                                  adjustToContentHeight
                                                  handlePosition="inside"
                                                  modalStyle={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                                                  scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
                                        >
                                                  {loadingForm ? <ActivityIndicator
                                                            animating
                                                            size={"small"}
                                                            color='#777'
                                                            style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                                                  /> : <View style={styles.modalContainer}>
                                                            <Text style={styles.title}>Confirmer la contribution</Text>
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
                                                                      <TouchableNativeFeedback onPress={() => setSelectDebt(t => !t)}>
                                                                                <View style={styles.action}>
                                                                                          <View style={styles.actionDetails}>
                                                                                                    <Image source={require('../../../../assets/icons/debt.png')} style={styles.actionImage} />
                                                                                                    <View style={styles.actionLabels}>
                                                                                                              <Text style={styles.actionTitle}>Dette</Text>
                                                                                                              <Text style={styles.actionAmount}>6 000 BIF</Text>
                                                                                                    </View>
                                                                                          </View>
                                                                                          <View style={[styles.checkCircle, selectDebt && { backgroundColor: primaryColor, borderWidth: 0 }]}>
                                                                                                    {selectDebt && <Ionicons name="md-checkmark-outline" size={18} color="#fff" />}
                                                                                          </View>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                                      <TouchableNativeFeedback>
                                                                                <View style={styles.action}>
                                                                                          <View style={styles.actionDetails}>
                                                                                                    <Image source={require('../../../../assets/icons/contribution.png')} style={styles.actionImage} />
                                                                                                    <View style={styles.actionLabels}>
                                                                                                              <Text style={styles.actionTitle}>Retard</Text>
                                                                                                              <Text style={styles.actionAmount}>Cliquer pour choisr le type</Text>
                                                                                                    </View>
                                                                                          </View>
                                                                                          <Entypo name="chevron-small-down" size={24} color="#777" />
                                                                                </View>
                                                                      </TouchableNativeFeedback>
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
          title: {
                    color: '#000',
                    fontWeight: "bold",
                    marginVertical: 15,
                    paddingHorizontal: 10,
                    fontSize: 18,
                    textAlign: "center",
                    opacity: 0.6
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
          }
})