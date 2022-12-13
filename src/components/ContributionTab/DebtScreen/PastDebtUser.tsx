import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View, Image } from 'react-native'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { ContributorInterface } from '../../../interfaces/ContributorInterface'
import { queueListSelector } from '../../../store/selectors/contributionSelectors'

interface Props {
          contributor: ContributorInterface,
          onUserPress: (contributor: ContributorInterface) => void
}

export default function PastDebtUser({ contributor, onUserPress }: Props) {
          const queueList = useAppSelector(queueListSelector)
          const pastDebts = queueList.pastDebts

          const contributorDebt = useCallback((id: string) => {
                    const debt =  pastDebts.find(c => c._id == id)
                    return debt
          }, [pastDebts])
          return (
                    <View>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                                        // delayLongPress={100}
                                        onPress={() => onUserPress(contributor)}
                                        useForeground={true}
                              >
                                        <View style={styles.user}>
                                                  <View style={styles.userImage}>
                                                            {contributor.image ? <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={{ uri: contributor.image }} /> :
                                                            <Image style={{width: '100%', height: '100%', borderRadius: 50}} source={require('../../../../assets/images/man.jpg')} />}
                                                  </View>
                                                  <View style={styles.userInfo}>
                                                            <Text style={styles.userNames}>
                                                                      {contributor.firstName} {contributor.lastName}
                                                            </Text>
                                                            <View style={styles.debtUserFooter}>
                                                                      <Text style={styles.contributorEmail}>
                                                                                {contributor.email}
                                                                      </Text>
                                                                      {contributorDebt(contributor._id) ? <Text style={styles.pastDebtAmount}>
                                                                                { contributorDebt(contributor._id)?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                      </Text> : null}
                                                            </View>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                    </View>
          )
}

const styles = StyleSheet.create({
          user: {
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden'
          },
          userImage: {
                    width: 50,
                    height: 50,
                    borderRadius: 50
          },
          userInfo: {
                    marginLeft: 10,
                    flex: 1
          },
          userNames: {
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: 16,
                    opacity: 0.8,
          },
          contributorEmail: {
                    color: '#777',
                    fontSize: 12
          },
          debtUserFooter: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
          },
          pastDebtAmount: {
                    color: '#777'
          }
})