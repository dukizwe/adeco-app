import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../hooks/useAppSelector";
import { queueActivitiesSelector, queueListSelector } from "../../store/selectors/contributionSelectors";
import { COLORS } from "../../styles/COLORS";
import { AntDesign } from '@expo/vector-icons'; 
import { primaryColor } from "../../styles";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { resetNewContributionAcion } from "../../store/actions/contributionActions";

export default function ContributionSuccessScreen() {
          const queueList = useAppSelector(queueListSelector)
          const activities = useAppSelector(queueActivitiesSelector)
          const navigation = useNavigation()
          const dispatch = useAppDispatch()

          const getTotals = useCallback(() => {
                    var action = {
                              length: 0,
                              total: 0
                    }
                    var debt = {
                              length: 0,
                              total: 0
                    }
                    var late = {
                              length: 0,
                              total: 0
                    }
                    var debts = {
                              length: 0,
                              total: 0
                    }
                    queueList.contributions.forEach(contribution => {
                              if (contribution.actions?.action) {
                                        action.total += contribution.actions.action
                                        action.length += 1
                              }
                              if (contribution.actions?.debt) {
                                        debt.total += contribution.actions.debt
                                        debt.length += 1
                              }
                              if (contribution.actions?.rates) {
                                        contribution.actions.rates.forEach(rate => {
                                                  late.total += rate.amount
                                                  late.length += 1
                                        })
                              }
                    })
                    if(queueList.debts) {
                              queueList.debts.forEach(debt => {
                                        debts.total += debt.amount
                                        debts.length += 1
                              })
                    }
                    return {
                              action,
                              late,
                              debt,
                              debts
                    }
          }, [queueList])

          const getActivitiesTotal = useCallback(() => {
                    var debiter = {
                              length: 0,
                              total: 0
                    }
                    var crediter = {
                              length: 0,
                              total: 0
                    }
                    const ins = activities.filter(a => a.category?.type == 'in')
                    const outs = activities.filter(a => a.category?.type == 'out')
                    ins.forEach(inActivty => {
                              debiter.total += parseInt(inActivty.amount)
                              debiter.length += 1
                    })
                    outs.forEach(inActivty => {
                              crediter.total += parseInt(inActivty.amount)
                              crediter.length += 1
                    })
                    return {
                              debiter,
                              crediter,
                              total: debiter.total + (-crediter.total)
                    }
          }, [activities])

          const getInsAmount = useCallback(() => {
                    const total = getTotals()
                    return total.action.total + total.debt.total + total.late.total + getActivitiesTotal().debiter.total
          }, [getTotals])

          const getOutsTotal = useCallback(() => {
                    const totalActivities = getActivitiesTotal().crediter.total + getTotals().debts.total
                    return totalActivities
          }, [getActivitiesTotal])

          useEffect(() => {
                    const unsubscribe = navigation.addListener('beforeRemove', e => {
                              dispatch(resetNewContributionAcion())
                              navigation.navigate('ContributionScreen' as never)
                              e.preventDefault();
                    })
                    return unsubscribe
          }, [navigation])
          return (
                    <View style={styles.container}>
                              <View style={styles.successDescription}>
                                        <AntDesign name="checkcircleo" size={80} color={primaryColor} />
                                        <Text style={styles.successFeedback}>
                                                  La nouvelle contribution a été enregistrée avec succès
                                        </Text>
                              </View>
                              <View style={styles.lastContributionOverview}>
                                        <View style={styles.lastMonth}>
                                                  <Text style={styles.overviewTitle}>
                                                            NOUVEAU MOIS
                                                  </Text>
                                                  <View style={styles.monthBadge}>
                                                            <Text style={styles.monthCount}>4</Text>
                                                  </View>
                                        </View>
                                        <Text style={styles.overviewAmount}>
                                                  BIF 1 000 2000
                                        </Text>
                                        <View style={styles.amountBenefits}>
                                                  <Text style={styles.benefit}>
                                                            +{getInsAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                  </Text>
                                                  <View style={styles.benefitSeparator} />
                                                  <Text style={[styles.benefit, { color: COLORS.minusAmount }]}>
                                                            -{getOutsTotal().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                  </Text>
                                        </View>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: -120
          },
          lastContributionOverview: {
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 15,
          },
          lastMonth: {
                    flexDirection: "row",
                    alignItems: "center",
          },
          overviewTitle: {
                    color: '#777',
                    marginBottom: 5
          },
          monthBadge: {
                    height: 20,
                    minWidth: 20,
                    paddingHorizontal: 5,
                    borderRadius: 20,
                    marginLeft: 10,
                    backgroundColor: '#161140',
                    justifyContent: "center",
                    alignItems: "center"
          },
          monthCount: {
                    color: '#FFF',
                    fontWeight: "bold",
                    fontSize: 10
          },
          overviewAmount: {
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 5
          },
          amountBenefits: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5
          },
          benefit: {
                    color: COLORS.plusAmount,
                    fontWeight: "bold",
                    opacity: 0.8,
                    fontSize: 13
          },
          benefitSeparator: {
                    width: 1,
                    height: "70%",
                    marginHorizontal: 10,
                    backgroundColor: '#777',
                    opacity: 0.8,
          },
          successDescription: {
                    marginVertical: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 50
          },
          successFeedback: {
                    color: '#777',
                    textAlign: "center",
                    marginTop: 20
          }

})