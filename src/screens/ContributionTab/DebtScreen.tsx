import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DebtScreenHeader from '../../components/ContributionTab/DebtScreenHeader';
import { useContext } from 'react';
import UserPayment from '../../components/ContributionTab/UserPayment';
import UserDebt from '../../components/ContributionTab/UserDebt';
import DebtForm from '../../components/ContributionTab/DebtForm';
import { User } from '../../types/User';
import { useForm } from '../../hooks/useForm';
import { DataChanger, DebtFormInterface, UserDebtFormInterface } from '../../types/DebtFormInterface';
import { useAppSelector } from '../../hooks/useAppSelector';
import { queueListSelector, usersSelector } from '../../store/selectors/contributionSelectors';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setQueueListAction } from '../../store/actions/contributionActions';

export default function DebtScreen() {
          const navigation = useNavigation()

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
                              const lastUserInfo = d[selectedUserId] || { amount: '', month: '', comment: ''}
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

          return (
                    <>
                              <View style={styles.container}>
                                        <DebtScreenHeader />
                                        <FlatList
                                                  // ListHeaderComponent={() => <DebtScreenHeader />}
                                                  showsVerticalScrollIndicator={false}
                                                  data={users}
                                                  keyExtractor={(user, index) => index.toString()}
                                                  renderItem={({ item }) => <UserDebt user={item} onUserPress={onUserPress} userId={typeof selectedUserId === 'number' ? selectedUserId : undefined} />}
                                        />
                              </View>
                              {selectedUserId && <DebtForm
                                        onClose={() => setSelectedUserId(null)}
                                        onSubmit={onSubmit}
                                        userId={typeof selectedUserId === 'number' ? selectedUserId : undefined}
                                        onRemove={onRemove}
                                        data={data[selectedUserId] || { amount: '', month: '', comment: '' }}
                                        onChange={onChange}
                              />
                              }
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    paddingHorizontal: 20,
                    backgroundColor: '#fff'
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
          }
})