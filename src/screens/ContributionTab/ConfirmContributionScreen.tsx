import React, { useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSelector } from "react-redux";
import Contributor from "../../components/ContributionTab/Contributor";
import { contributorsSelector, queueActivitiesSelector, queueListSelector, rateTypesSelector } from "../../store/selectors/contributionSelectors";
import { COLORS } from "../../styles/COLORS";
import { AntDesign } from '@expo/vector-icons';
import Activity from "../../components/Activities/Activity";
import Loading from "../../components/app/Loading";
import { useAppSelector } from "../../hooks/useAppSelector";

export default function ConfirmContributionScreen() {
          const { width } = useWindowDimensions()
          const CARD_WIDTH = (width / 2) - 15

          const contributors = useSelector(contributorsSelector)
          const rateTypes = useSelector(rateTypesSelector)
          const activities = useSelector(queueActivitiesSelector)

          const queueList = useAppSelector(queueListSelector)

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
                    return {
                              action,
                              late,
                              debt
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
                    const totalActivities = getActivitiesTotal().crediter.total
                    return totalActivities
          }, [getActivitiesTotal])
          return (
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                              <View style={styles.container}>
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
                                        <View style={styles.dashboardCards}>
                                                  <View style={[styles.card, { width: CARD_WIDTH, height: CARD_WIDTH / 1.5 }]}>
                                                            <View style={styles.cardHeader}>
                                                                      <View style={styles.cardIconContainer}>
                                                                                <Image source={require('../../../assets/icons/contribution.png')} style={styles.cardIcon} />
                                                                      </View>
                                                                      <View style={styles.cardLabels}>
                                                                                <Text style={styles.cardTitle}>
                                                                                          Actions
                                                                                </Text>
                                                                                <Text style={[styles.cardSubTitle]}>
                                                                                          {getTotals().action.length} contribuables
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                            <View style={styles.cardBody}>
                                                                      <Text style={[styles.cardTotal, { color: COLORS.plusAmount }]}>
                                                                                +{getTotals().action.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={[styles.card, { width: CARD_WIDTH, height: CARD_WIDTH / 1.5 }]}>
                                                            <View style={styles.cardHeader}>
                                                                      <View style={styles.cardIconContainer}>
                                                                                <Image source={require('../../../assets/icons/deby-color.png')} style={styles.cardIcon} />
                                                                      </View>
                                                                      <View style={styles.cardLabels}>
                                                                                <Text style={styles.cardTitle}>
                                                                                          Dettes
                                                                                </Text>
                                                                                <Text style={styles.cardSubTitle}>
                                                                                          {getTotals().debt.length} retenu{getTotals().debt.length > 1 && 's'} mensuel
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                            <View style={styles.cardBody}>
                                                                      <Text style={[styles.cardTotal, { color: COLORS.plusAmount }]}>
                                                                                {getTotals().debt.total > 0 && '+'}{getTotals().debt.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={[styles.card, { width: CARD_WIDTH, height: CARD_WIDTH / 1.5, marginTop: 20 }]}>
                                                            <View style={styles.cardHeader}>
                                                                      <View style={styles.cardIconContainer}>
                                                                                <Image source={require('../../../assets/icons/running.png')} style={styles.cardIcon} />
                                                                      </View>
                                                                      <View style={styles.cardLabels}>
                                                                                <Text style={styles.cardTitle}>
                                                                                          Retard
                                                                                </Text>
                                                                                <Text style={styles.cardSubTitle}>
                                                                                          {getTotals().late.length} retard{getTotals().late.length > 1 && 's'}
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                            <View style={styles.cardBody}>
                                                                      <Text style={[styles.cardTotal, { color: COLORS.plusAmount }]}>
                                                                                +{getTotals().late.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={[styles.card, { width: CARD_WIDTH, height: CARD_WIDTH / 1.5, marginTop: 20 }]}>
                                                            <View style={styles.cardHeader}>
                                                                      <View style={styles.cardIconContainer}>
                                                                                <Image source={require('../../../assets/icons/borrow.png')} style={styles.cardIcon} />
                                                                      </View>
                                                                      <View style={styles.cardLabels}>
                                                                                <Text style={styles.cardTitle}>
                                                                                          Dettes rendus
                                                                                </Text>
                                                                                <Text style={styles.cardSubTitle}>
                                                                                          2 nouveaux dettes
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                            <View style={styles.cardBody}>
                                                                      <Text style={[styles.cardTotal, { color: COLORS.minusAmount }]}>
                                                                                -300 000 BIF
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={[styles.card, { width: CARD_WIDTH, height: CARD_WIDTH / 1.5, marginTop: 5 }]}>
                                                            <View style={styles.cardHeader}>
                                                                      <View style={styles.cardIconContainer}>
                                                                                <Image source={require('../../../assets/icons/activity-color.png')} style={styles.cardIcon} />
                                                                      </View>
                                                                      <View style={styles.cardLabels}>
                                                                                <Text style={styles.cardTitle}>
                                                                                          Activités
                                                                                </Text>
                                                                                <View style={styles.activityDetail}>
                                                                                          <Text style={styles.cardSubTitle}>
                                                                                                    {getActivitiesTotal().debiter.total > 0 && '+'}{getActivitiesTotal().debiter.length} D
                                                                                          </Text>
                                                                                          <Text style={[styles.cardTotal, { color: COLORS.plusAmount, fontSize: 11 }]}>
                                                                                                    {getActivitiesTotal().debiter.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                                          </Text>
                                                                                </View>
                                                                                <View style={styles.activityDetail}>
                                                                                          <Text style={styles.cardSubTitle}>
                                                                                                    {getActivitiesTotal().crediter.total > 0 && '-'}{getActivitiesTotal().crediter.length} C
                                                                                          </Text>
                                                                                          <Text style={[styles.cardTotal, { color: COLORS.minusAmount, fontSize: 11 }]}>
                                                                                                    {getActivitiesTotal().crediter.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                                          </Text>
                                                                                </View>
                                                                      </View>
                                                            </View>
                                                            <View style={styles.cardBody}>
                                                                      <Text style={[styles.cardTotal, { color: getActivitiesTotal().debiter.total >= getActivitiesTotal().crediter.total ? COLORS.plusAmount: COLORS.minusAmount }]}>
                                                                                {getActivitiesTotal().debiter.total >= getActivitiesTotal().crediter.total ? '+' : ''}{getActivitiesTotal().total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} BIF
                                                                      </Text>
                                                            </View>
                                                  </View>
                                                  <View style={[styles.card, { width: CARD_WIDTH, height: CARD_WIDTH / 1.5, marginTop: 5 }]}>
                                                            <View style={styles.emptyCard}>
                                                                      <AntDesign name="plus" size={24} color="#777" />
                                                            </View>
                                                  </View>
                                        </View>
                                        {/* <View style={styles.contributions}>
                                                  <Text style={styles.title}>
                                                            Les contributions
                                                  </Text>
                                                  {contributors.map((contributor, index) => {
                                                            return <Contributor contributor={contributor} rateTypes={rateTypes} key={contributor._id} noBatch />
                                                  })}
                                        </View> */}
                                        {/* <View style={styles.contributions}>
                                                  <Text style={styles.title}>
                                                            Les activités
                                                  </Text>
                                                  {activities.map((activity, index) => {
                                                            return (
                                                                      <Activity activity={activity} index={index} key={activity.id} />
                                                            )
                                                  })}
                                        </View> */}
                              </View>
                    </ScrollView>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
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
          dashboardCards: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    paddingHorizontal: 10,
                    marginTop: 20
          },
          card: {
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: COLORS.smallWhite,
                    elevation: 5,
                    shadowColor: '#DDD',
                    justifyContent: "center"
          },
          cardHeader: {
                    flexDirection: "row"
          },
          cardIconContainer: {
                    width: 40,
                    height: 40,
                    backgroundColor: '#fff',
                    borderRadius: 40,
                    justifyContent: "center",
                    alignItems: "center"
          },
          cardIcon: {
                    width: "70%",
                    height: "70%"
          },
          cardLabels: {
                    marginLeft: 5,
                    flex: 1
          },
          cardTitle: {
                    fontWeight: "bold",
                    fontSize: 13
          },
          cardSubTitle: {
                    color: '#777',
                    fontSize: 11
          },
          activityDetail: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
          },
          cardBody: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10
          },
          cardTotal: {
                    fontSize: 16
          },
          contributions: {
                    paddingHorizontal: 10,
                    paddingTop: 20
          },
          title: {
                    color: '#777',
                    fontWeight: 'bold',
                    fontSize: 16
          },
          emptyCard: {
                    justifyContent: "center",
                    alignItems: "center"
          },
})