import React from "react";
import { useCallback } from "react";
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ContributorInterface } from "../../../interfaces/ContributorInterface";
import { UserDebtInterface } from "../../../interfaces/UserDebtInterface";
import { setPastDebtsAction } from "../../../store/actions/contributionActions";
import { contributorsSelector, queueListSelector } from "../../../store/selectors/contributionSelectors";
import PastDebtUser from "./PastDebtUser";

interface Props {
          modalizeRef: React.RefObject<Modalize>,
          isOpen: boolean,
          setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
          loadingForm: boolean,
          setLoadingForm: React.Dispatch<React.SetStateAction<boolean>>,
          setPastDebtUser: React.Dispatch<React.SetStateAction<ContributorInterface | null>>
}
export default function PastDebtUsersModalize({ modalizeRef, isOpen, setIsOpen, loadingForm, setLoadingForm, setPastDebtUser }: Props) {
          const contributors = useAppSelector(contributorsSelector)
          const queueList = useAppSelector(queueListSelector)
          const pastDebts = queueList.pastDebts

          const contributorDebt = useCallback((contributor: ContributorInterface) => {
                    return pastDebts.find(c => c._id == contributor._id)
          }, [pastDebts])
          const dispatch = useAppDispatch()
          const onUserPress = useCallback((contributor: ContributorInterface) => {
                    if(contributorDebt(contributor)) {
                              const newDebts = pastDebts.filter(d => d._id != contributor._id)
                              dispatch(setPastDebtsAction(newDebts))
                    } else {
                              modalizeRef.current?.close(),
                              setPastDebtUser(contributor)
                    }
          }, [pastDebts])
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
                                                  // adjustToContentHeight
                                                  handlePosition="inside"
                                                  modalStyle={{ backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                                                  scrollViewProps={{ keyboardShouldPersistTaps: 'handled' }}
                                                  modalHeight={430}
                                                  snapPoint={420}
                                                  closeSnapPointStraightEnabled={true}
                                        >
                                                  {loadingForm ? <ActivityIndicator
                                                            animating
                                                            size={"small"}
                                                            color='#777'
                                                            style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                                                  /> : <View style={styles.modalContainer}>
                                                            {contributors.map((contributor, index) => {
                                                                      return <PastDebtUser contributor={contributor} onUserPress={onUserPress} key={index} />
                                                            })}
                                                  </View>}
                                        </Modalize>
                              </GestureHandlerRootView>
                    </Portal>
          )
}

const styles = StyleSheet.create({
          modalContainer: {
                    paddingVertical: 20,
          },
})