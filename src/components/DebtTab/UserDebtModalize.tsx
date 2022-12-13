import React, { useCallback, useState } from "react";
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { UserDebtInterface } from "../../interfaces/UserDebtInterface";
import { Feather, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import moment from "moment";
import fetchApi from "../../utils/fetchApi";
import Loading from "../app/Loading";
import wait from "../../helpers/wait";
import { DebtStatusCodes } from "../../enum/debtStatusCodes.enum";
import { useAppSelector } from "../../hooks/useAppSelector";
import { queueListSelector } from "../../store/selectors/contributionSelectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setQueueListAction } from "../../store/actions/contributionActions";
import { userSelector } from "../../store/selectors/userSelector";
import { UserProfileCodes } from "../../enum/userProfileCodes.enum";

interface Props {
          userDebt: UserDebtInterface,
          modalizeRef: React.RefObject<Modalize>,
          isOpen: boolean,
          setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
          loadingForm: boolean,
          setLoadingForm: React.Dispatch<React.SetStateAction<boolean>>,
          onUserDebtUpdate?: (newUserDebt: UserDebtInterface) => void,
          isContribution?: boolean,
}

type ActionType = "REJECT" | "ACCEPT"
type Bubbles = {
          [key in DebtStatusCodes]: JSX.Element
}
export default function UserDebtModalize({ userDebt, modalizeRef, isOpen, setIsOpen, loadingForm, setLoadingForm, onUserDebtUpdate, isContribution = false }: Props) {
          const [isAccepting, setIsaccepting] = useState(false)
          const queueList = useAppSelector(queueListSelector)
          const dispacth = useAppDispatch()

          const user = useAppSelector(userSelector)

          /**
           * Handle REJECT or ACCEPT press
           * @param {ActionType} type Le type d'action
           */
          const onActionPress = async (type: ActionType) => {
                    try {
                              var url = ""
                              if (type == "ACCEPT") {
                                        url = `/debts/action_accept/${userDebt._id}`
                              } else if (type == "REJECT") {
                                        url = `/debts/action_reject/${userDebt._id}`
                              }
                              setIsaccepting(true)
                              const res = await fetchApi(url, {
                                        method: "PUT"
                              })
                              const newUserDebt: UserDebtInterface = res.data
                              if (onUserDebtUpdate) {
                                        onUserDebtUpdate(newUserDebt)
                              }
                              modalizeRef.current?.close()
                              setIsOpen(false)
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setIsaccepting(false)
                    }
          }

          const StatusBubble = () => {
                    const bubbles: Bubbles = {
                              [DebtStatusCodes.PEDDING]: <View style={styles.statusBubble} />,
                              [DebtStatusCodes.ACCEPTED]: <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.primary} />,
                              [DebtStatusCodes.CANCELLED]: <Ionicons name="close-circle-sharp" size={24} color={COLORS.minusAmount} />,
                              [DebtStatusCodes.GIVEN]: <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />,
                              [DebtStatusCodes.SETTLED]: <Ionicons name="checkmark-done-circle-sharp" size={24} color={COLORS.primary} />,
                    }
                    return bubbles[userDebt.statusId.code as DebtStatusCodes]
          }

          /**
           * Determine if current debt is accepted and debited in queuList
           */
          const isDebited = useCallback(() => {
                    const debts = queueList.debts
                    if (!debts) {
                              return false
                    }
                    return debts.find(u => u._id == userDebt._id) ? true : false
          }, [queueList])

          /**
           * Mark the debt as debited (only callable when isContribution == true)
           */
          const onDistribute = () => {
                    const debts = queueList.debts
                    let newDebts: UserDebtInterface[] = []
                    if (isDebited()) {
                              // if debt is in queuList, we remove it
                              if (!debts) return
                              newDebts = debts?.filter(d => d._id != userDebt._id)
                    } else {
                              // otherwise, we add it
                              if (debts) {
                                        newDebts = [...debts, userDebt]
                              } else {
                                        newDebts = [userDebt]
                              }
                    }
                    const newQueuList = {
                              ...queueList,
                              debts: newDebts
                    }
                    dispacth(setQueueListAction(newQueuList))
                    modalizeRef.current?.close()
                    setIsOpen(false)
          }

          /**
           * Determine if can display actions buttons
           * @returns { Boolean }
           */
          const canMakeDecision = (): boolean => {
                    if (isContribution) {
                              return true
                    }

                    const allowedCodes = [UserProfileCodes.ADMIN, UserProfileCodes.PRESIDENT]
                    if(!user || !allowedCodes.includes(user?.profileId.code)) {
                              return false
                    }
                    if (userDebt.statusId.code != DebtStatusCodes.PEDDING) {
                              return false
                    }
                    return true
          }
          return (
                    <>
                              {isAccepting && <Loading />}
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
                                                            // adjustToContentHeight
                                                            handlePosition="inside"
                                                            modalStyle={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                                                            scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
                                                            modalHeight={415}
                                                            snapPoint={405}
                                                            closeSnapPointStraightEnabled={true}
                                                  >
                                                            {loadingForm ? <ActivityIndicator
                                                                      animating
                                                                      size={"small"}
                                                                      color='#777'
                                                                      style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                                                            /> : <View style={styles.modalContainer}>
                                                                      <View style={styles.userImage}>
                                                                                {userDebt.assignedTo.image ? <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={{ uri: userDebt.assignedTo.image }} /> :
                                                                                          <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={require('../../../assets/images/man.jpg')} />}
                                                                      </View>
                                                                      <Text style={styles.title}>
                                                                                {userDebt.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                      </Text>
                                                                      <View style={styles.details}>
                                                                                <View style={styles.detail}>
                                                                                          <View style={styles.detailIcon}>
                                                                                                    <Feather name="user" size={25} color={COLORS.primary} />
                                                                                          </View>
                                                                                          <View style={styles.detailsDescrption}>
                                                                                                    <Text style={styles.detailLabel}>
                                                                                                              Débiteur
                                                                                                    </Text>
                                                                                                    <Text style={styles.detailValue}>
                                                                                                              {userDebt.assignedTo.firstName} {userDebt.assignedTo.firstName}
                                                                                                    </Text>
                                                                                          </View>
                                                                                </View>
                                                                                <View style={styles.detail}>
                                                                                          <View style={styles.detailIcon}>
                                                                                                    <AntDesign name="calendar" size={24} color={COLORS.primary} />
                                                                                          </View>
                                                                                          <View style={styles.detailsDescrption}>
                                                                                                    <Text style={styles.detailLabel}>
                                                                                                              Date de demande
                                                                                                    </Text>
                                                                                                    <Text style={styles.detailValue}>
                                                                                                              {moment(userDebt.issueDate).format('DD MMM[.] YYYY')}
                                                                                                    </Text>
                                                                                          </View>
                                                                                </View>
                                                                                <View style={styles.statusDetail}>
                                                                                          <View style={styles.detail}>
                                                                                                    <View style={styles.detailIcon}>
                                                                                                              <FontAwesome name="dollar" size={24} color={COLORS.primary} />
                                                                                                    </View>
                                                                                                    <View style={[styles.detailsDescrption, { borderBottomWidth: 0 }]}>
                                                                                                              <Text style={styles.detailLabel}>
                                                                                                                        Intérêt mensuel
                                                                                                              </Text>
                                                                                                              <Text style={styles.detailValue}>
                                                                                                                        {userDebt.monthlyRestrain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                                                              </Text>
                                                                                                    </View>
                                                                                                    {userDebt.statusId.code == DebtStatusCodes.GIVEN ? <View>
                                                                                                              <Text style={styles.payedMonth}>
                                                                                                                        {userDebt.histories?.length || 0} / {userDebt.payIn}
                                                                                                              </Text>
                                                                                                              <Text style={styles.monthTitle}>mois</Text>
                                                                                                    </View> : null}
                                                                                          </View>
                                                                                </View>
                                                                                {!canMakeDecision() ? <View style={styles.detail}>
                                                                                          <View style={styles.detailIcon}>
                                                                                                    <StatusBubble />
                                                                                          </View>
                                                                                          <View style={[styles.detailsDescrption, { borderBottomWidth: 0 }]}>
                                                                                                    <Text style={styles.detailLabel}>
                                                                                                              Status
                                                                                                    </Text>
                                                                                                    <Text style={styles.detailValue}>
                                                                                                              {userDebt.statusId.title}
                                                                                                    </Text>
                                                                                          </View>
                                                                                </View> : null}
                                                                      </View>
                                                                      {canMakeDecision() && <View style={styles.actions}>
                                                                                <TouchableNativeFeedback onPress={() => onActionPress('REJECT')} disabled={isContribution}>
                                                                                          <View style={[styles.actionBtn, isContribution && { opacity: 0.5 }]}>
                                                                                                    <Text style={[styles.actionLabel, { color: COLORS.minusAmount }]}>
                                                                                                              Rejeter
                                                                                                    </Text>
                                                                                          </View>
                                                                                </TouchableNativeFeedback>
                                                                                {isContribution ? <TouchableNativeFeedback onPress={onDistribute}>
                                                                                          <View style={[styles.actionBtn, { borderLeftWidth: 1, borderLeftColor: '#F1F1F1' }]}>
                                                                                                    {isAccepting ? <ActivityIndicator size="small" color={COLORS.primary} /> :
                                                                                                              <Text style={styles.actionLabel}>
                                                                                                                        {isDebited() ? "Surprendre" : 'Distribuer'}
                                                                                                              </Text>}
                                                                                          </View>
                                                                                </TouchableNativeFeedback> :
                                                                                          <TouchableNativeFeedback onPress={() => onActionPress('ACCEPT')}>
                                                                                                    <View style={[styles.actionBtn, { borderLeftWidth: 1, borderLeftColor: '#F1F1F1' }]}>
                                                                                                              {isAccepting ? <ActivityIndicator size="small" color={COLORS.primary} /> :
                                                                                                                        <Text style={styles.actionLabel}>
                                                                                                                                  Accepter
                                                                                                                        </Text>}
                                                                                                    </View>
                                                                                          </TouchableNativeFeedback>}
                                                                      </View>}
                                                            </View>}
                                                  </Modalize>
                                        </GestureHandlerRootView>
                              </Portal>
                    </>
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
          details: {
                    paddingHorizontal: 20
          },
          statusDetail: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
          },
          detail: {
                    flexDirection: "row",
                    alignItems: "center",
          },
          detailIcon: {
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center"
          },
          detailsDescrption: {
                    marginLeft: 10,
                    borderBottomWidth: 0,
                    borderBottomColor: '#F1F1F1',
                    flex: 1,
                    paddingVertical: 10
          },
          detailLabel: {
                    color: '#777'
          },
          detailValue: {

          },
          actions: {
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopWidth: 1,
                    borderTopColor: '#F1F1F1'
          },
          actionBtn: {
                    flex: 1,
                    paddingVertical: 20,
          },
          actionLabel: {
                    textAlign: "center",
                    color: COLORS.primary,
                    fontWeight: "bold"
          },
          statusBubble: {
                    width: 18,
                    height: 18,
                    borderWidth: 2,
                    borderColor: COLORS.primary,
                    borderRadius: 30
          },
          payedMonth: {
                    color: '#777',
                    fontWeight: "bold"
          },
          monthTitle: {
                    fontSize: 12,
                    color: '#777',
                    textAlign: "center",
                    marginTop: -8
          }
})