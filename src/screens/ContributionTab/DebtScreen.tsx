import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import DebtScreenHeader from '../../components/ContributionTab/DebtScreenHeader';
import { useContext } from 'react';
import UserDebt from '../../components/ContributionTab/UserDebt';
import { QueuedUser } from '../../types/QueuedUser';
import { UserDebtInterface } from '../../interfaces/UserDebtInterface';
import fetchApi from '../../utils/fetchApi';

export default function DebtScreen() {
          const navigation = useNavigation()
          const [debts, setDebts] = useState<UserDebtInterface[]>([])

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
                                                                      renderItem={({ item }) => <UserDebt userDebt={item}  isContribution={true} />}
                                                                      style={styles.debts}
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
          debts: {
                    paddingHorizontal: 10
          }
})