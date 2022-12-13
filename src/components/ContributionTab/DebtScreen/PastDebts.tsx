import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { ContributorInterface } from '../../../interfaces/ContributorInterface'
import { setPastDebtsAction } from '../../../store/actions/contributionActions'
import { contributorsSelector, queueListSelector } from '../../../store/selectors/contributionSelectors'
import PastDebtUser from './PastDebtUser'

export default function PastDebts() {
          const queueList = useAppSelector(queueListSelector)
          const pastDebts = queueList.pastDebts
          const contributors = useAppSelector(contributorsSelector)
          const dispatch = useAppDispatch()

          const onUserPress = (contributor: ContributorInterface) => {
                    const newDebts = pastDebts.filter(d => d._id != contributor._id)
                    dispatch(setPastDebtsAction(newDebts))
          }
          return (
                    <View>
                              <View style={styles.header}>
                                        <Text style={styles.title}>
                                                  Anciennes dettes
                                        </Text>
                              </View>
                              {pastDebts.length == 0 ?<Text style={{ marginTop: 0, fontSize: 12, color: '#777', paddingHorizontal: 10 }}>
                                        Aucune ancienne dette
                              </Text>  :
                              <View>
                                        {pastDebts.map((debt, index) => {
                                                  const contributor = contributors.find(c => c._id == debt._id) as ContributorInterface
                                                  return <PastDebtUser contributor={contributor} onUserPress={onUserPress} key={contributor?._id} />
                                        })}
                              </View>}
                    </View>
          )
}

const styles = StyleSheet.create({
          header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 10
          },
          title: {
                    color: '#777',
                    fontWeight: 'bold',
                    fontSize: 16
          },
})