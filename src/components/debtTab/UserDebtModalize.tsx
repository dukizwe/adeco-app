import React, { useState } from "react";
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { UserDebtInterface } from "../../interfaces/UserDebtInterface";
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import moment from "moment";
import fetchApi from "../../utils/fetchApi";
import Loading from "../app/Loading";
import wait from "../../helpers/wait";


interface Props {
          userDebt: UserDebtInterface,
          modalizeRef: React.RefObject<Modalize>,
          isOpen: boolean,
          setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
          loadingForm: boolean,
          setLoadingForm: React.Dispatch<React.SetStateAction<boolean>>,
          onUserDebtUpdate: (newUserDebt: UserDebtInterface) => void
}
export default function UserDebtModalize({ userDebt, modalizeRef, isOpen, setIsOpen, loadingForm, setLoadingForm, onUserDebtUpdate }: Props) {
          const [isAccepting, setIsaccepting] = useState(false)

          const onConfirm = async () => {
                    try {
                              setIsaccepting(true)
                              const res = await fetchApi(`/debts/action_accept/${userDebt._id}`, {
                                        method: "PUT"
                              })
                              const newUserDebt: UserDebtInterface = res.data
                              onUserDebtUpdate(newUserDebt)
                              modalizeRef.current?.close()
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setIsaccepting(false)
                    }
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
                                                  modalHeight={410}
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
                                                                      <Image style={{ width: '100%', height: '100%', borderRadius: 50 }} source={require('../../../assets/girl.jpg')} />
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
                                                                                                    { moment(userDebt.createdAt).format('DD MMM[.] YYYY')}
                                                                                          </Text>
                                                                                </View>
                                                                      </View>
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
                                                                      </View>
                                                            </View>
                                                            <View style={styles.actions}>
                                                                      <TouchableNativeFeedback>
                                                                                <View style={[styles.actionBtn]}>
                                                                                          <Text style={[styles.actionLabel, { color: COLORS.minusAmount }]}>
                                                                                                    Rejeter
                                                                                          </Text>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                                      <TouchableNativeFeedback onPress={onConfirm}>
                                                                                <View style={[styles.actionBtn,  { borderLeftWidth: 1, borderLeftColor: '#F1F1F1'}]}>
                                                                                          {isAccepting ? <ActivityIndicator size="small" color={COLORS.primary}  /> :
                                                                                          <Text style={styles.actionLabel}>
                                                                                                    Accepter
                                                                                          </Text>}
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            </View>
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
          }
})