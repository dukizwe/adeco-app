import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image, TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import DebtScreenHeader from '../../components/ContributionTab/DebtScreen/DebtScreenHeader';
import { useContext } from 'react';
import { QueuedUser } from '../../types/QueuedUser';
import { UserDebtInterface } from '../../interfaces/UserDebtInterface';
import fetchApi from '../../utils/fetchApi';
import ContributorsSkeletons from '../../components/skeleton/Skeleton';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/COLORS';
import PastDebtForm from '../../components/ContributionTab/DebtScreen/PastDebtForm';
import PastDebtUsersModalize from '../../components/ContributionTab/DebtScreen/PastDebtUsersModalize';
import { Modalize } from 'react-native-modalize';
import { ContributionInterface } from '../../interfaces/api/ContributionInterface';
import { ContributorInterface } from '../../interfaces/ContributorInterface';
import { useAppSelector } from '../../hooks/useAppSelector';
import { queueListSelector } from '../../store/selectors/contributionSelectors';
import UserDebt from '../../components/ContributionTab/DebtScreen/UserDebt';
import PastDebts from '../../components/ContributionTab/DebtScreen/PastDebts';

export default function DebtScreen() {
          const navigation = useNavigation()
          const [debts, setDebts] = useState<UserDebtInterface[]>([])
          const [isLoading, setIsLoading] = useState(true)

          const [pastDebtUser, setPastDebtUser] = useState<null | ContributorInterface>(null)

          const modalizeRef = useRef<Modalize>(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(false)

          const queueList = useAppSelector(queueListSelector)
          const pastDebts = queueList.pastDebts

          const onOpen = () => {
                    setIsOpen(true)
                    modalizeRef.current?.open()
          }

          useEffect(() => {
                    (async () => {
                              try {
                                        const result = await fetchApi('/debts/accepted')
                                        setDebts(result.data)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setIsLoading(false)
                              }
                    })()
          }, [])
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
          if(isLoading) {
                    return <ContributorsSkeletons />
          }
          return (
                    <>
                              <PastDebtUsersModalize
                                        modalizeRef={modalizeRef}
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        loadingForm={loadingForm}
                                        setLoadingForm={setLoadingForm}
                                        setPastDebtUser={setPastDebtUser}
                              />
                              {pastDebtUser ? <PastDebtForm pastDebtUser={pastDebtUser} onClose={() => setPastDebtUser(null)} /> : null}
                              <View style={styles.container}>
                                        {(debts.length == 0 && pastDebts.length ==  0) ? <View style={styles.content}>
                                                  <Text style={styles.title}>Dettes</Text>
                                                  <Image source={require('../../../assets/images/empty-debt.png')} style={styles.emptyImageFeedBack} />
                                                  <Text style={styles.emptyTextFeedback}>
                                                            Les dettes en ettente de distribution seront affichées ici
                                                  </Text>
                                        </View> :
                                                  <>
                                                            <DebtScreenHeader />
                                                            <View style={styles.debts}>
                                                                      {debts.length == 0 ?<Text style={{ marginTop: -10, fontSize: 12, color: '#777' }}>
                                                                                Aucune dette
                                                                      </Text> :debts.map((debt, index) => {
                                                                                return <UserDebt userDebt={debt}  isContribution={true} key={index} />
                                                                      })}
                                                            </View>
                                                            <PastDebts />
                                                  </>}
                                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', true)} onPress={onOpen}>
                                                  <View style={[styles.addButton]}>
                                                            <View style={styles.addButtonContent}>
                                                                      <Ionicons name="add" size={24} color="black" />
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    backgroundColor: '#fff'
          },
          content: {
                    alignItems: 'center',
                    paddingHorizontal: 20
          },
          header: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
          },
          headerLeftHand: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          goBackBtn: {
                    padding: 10,
                    paddingLeft: 0,
                    flexDirection: 'row',
                    alignItems: 'center'
          },
          debtTotal: {
          },
          totalTitle: {
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#777',
                    marginLeft: 10
          },
          nextBtn: {
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 10,
          },
          nextText: {
                    color: '#189fed'
          },
          title: {
                    color: '#777',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 80
          },
          emptyImageFeedBack: {
                    maxWidth: '80%',
                    maxHeight: '30%',
                    marginVertical: 30,
                    resizeMode: "contain",
                    marginLeft: 20
          },
          emptyTextFeedback: {
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 22,
                    color: '#5E5E5E'
          },
          debts: {
                    paddingHorizontal: 10
          },
          addButton: {
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#000',
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    zIndex: 30
          },
          addButtonContent: {
                    width: '70%',
                    height: '70%',
                    borderRadius: 15,
                    backgroundColor: COLORS.smallGreenWhiteColor,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
})