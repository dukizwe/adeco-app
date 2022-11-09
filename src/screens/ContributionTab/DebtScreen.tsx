import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DebtScreenHeader from '../../components/ContributionTab/DebtScreenHeader';
import { useContext } from 'react';
import UserDebt from '../../components/ContributionTab/UserDebt';
import DebtForm from '../../components/ContributionTab/DebtForm';
import { User } from '../../types/User';
import { useForm } from '../../hooks/useForm';
import { DataChanger, DebtFormInterface, UserDebtFormInterface } from '../../types/DebtFormInterface';
import { useAppSelector } from '../../hooks/useAppSelector';
import { queueListSelector, usersSelector } from '../../store/selectors/contributionSelectors';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setQueueListAction } from '../../store/actions/contributionActions';
import { UserDebtInterface } from '../../interfaces/UserDebtInterface';
import fetchApi from '../../utils/fetchApi';

export default function DebtScreen() {
          const navigation = useNavigation()
          const [debts, setDebts] = useState<UserDebtInterface[]>([])

          const users = useAppSelector(usersSelector)
          const queueList = useAppSelector(queueListSelector)

          const [selectedUserId, setSelectedUserId] = useState<null | number>(null)

          const dispatch = useAppDispatch()

          const onUserPress = useCallback((userId: number) => {
                    setSelectedUserId(userId)
          }, [])

          /**
           * Check if we h've already give debt to a user
           */
          const debted = typeof selectedUserId === 'number' && selectedUserId && queueList[selectedUserId] ? queueList[selectedUserId].debt : undefined
          const [data, setData] = useState<UserDebtFormInterface>({})

          const onChange: DataChanger = (name, value) => {
                    if (selectedUserId == null) return false
                    setData(d => {
                              const lastUserInfo = d[selectedUserId] || { amount: '', month: '', comment: '' }
                              return {
                                        ...d,
                                        [selectedUserId]: {
                                                  ...lastUserInfo,
                                                  [name]: value
                                        }
                              }
                    })
          }

          const onSubmit = () => {
                    if (selectedUserId == null) return false
                    setSelectedUserId(null)
                    setData(d => ({
                              ...d,
                              [selectedUserId]: {
                                        amount: '',
                                        month: '',
                                        comment: ''
                              }
                    }))
                    const user: User = queueList[selectedUserId]
                    if (user) {
                              dispatch(setQueueListAction({
                                        ...queueList,
                                        [selectedUserId]: {
                                                  ...user, debt: {
                                                            amount: data[selectedUserId].amount,
                                                            month: data[selectedUserId].month,
                                                            comment: data[selectedUserId].comment
                                                  }
                                        }
                              }))
                    } else {
                              dispatch(setQueueListAction({
                                        ...queueList,
                                        [selectedUserId]: {
                                                  id: selectedUserId,
                                                  debt: {
                                                            amount: data[selectedUserId].amount,
                                                            month: data[selectedUserId].month,
                                                            comment: data[selectedUserId].comment
                                                  }
                                        }
                              }))
                    }
          }

          const onRemove = () => {
                    Alert.alert('Enlever la dette', "Voulez-vous enlever la dette à cette personne ?",
                              [
                                        {
                                                  text: "Annuler",
                                                  style: "cancel"
                                        },
                                        {
                                                  text: "Oui", onPress: async () => {
                                                            if (typeof selectedUserId === 'number') {
                                                                      const userId: number = selectedUserId
                                                                      setSelectedUserId(null)
                                                                      dispatch(setQueueListAction({
                                                                                ...queueList,
                                                                                [userId]: {
                                                                                          ...queueList[userId],
                                                                                          debt: undefined
                                                                                }
                                                                      }))
                                                            }
                                                  }
                                        }
                              ]
                    )
          }

          useEffect(() => {
                    (async () => {
                              try {
                                        const result = await fetchApi('/debts/accepted')
                                        setDebts(result.data)
                              } catch (error) {
                                        console.log(error)
                              } finally {

                              }
                    })()
          }, [])
          return (
                    <>
                              <View style={styles.container}>
                                        {debts.length == 0 ? <View style={styles.content}>
                                                  <Text style={styles.title}>Dettes</Text>
                                                  <Image source={require('../../../assets/images/empty-debt.png')} style={styles.emptyImageFeedBack} />
                                                  <Text style={styles.emptyTextFeedback}>
                                                            Les dettes acceptées en ettente de distribution seront affichées ici
                                                  </Text>
                                        </View> :
                                                  <>
                                                            <DebtScreenHeader />
                                                            <FlatList
                                                                      // ListHeaderComponent={() => <DebtScreenHeader />}
                                                                      showsVerticalScrollIndicator={false}
                                                                      data={debts}
                                                                      keyExtractor={(user, index) => index.toString()}
                                                                      renderItem={({ item }) => <UserDebt userDebt={item} />}
                                                            />
                                                  </>}
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
})