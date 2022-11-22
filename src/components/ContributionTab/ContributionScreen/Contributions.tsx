import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ContributionInterface } from "../../../interfaces/api/ContributionInterface";
import { COLORS } from "../../../styles/COLORS";
import Contribution from "./Contribution";

interface Props{
          contributions: ContributionInterface[]
}

const Header = ({ lastContribution }: { lastContribution: ContributionInterface }) => {
          return (
                    <View style={styles.lastContributionOverview}>
                              <View style={styles.lastMonth}>
                                        <Text style={styles.overviewTitle}>MOIS DERNIER</Text>
                                        <View style={styles.monthBadge}>
                                                  <Text style={styles.monthCount}>
                                                            {lastContribution?.month}
                                                  </Text>
                                        </View>
                              </View>
                              <Text style={styles.overviewAmount}>
                                        {lastContribution ? lastContribution.mainTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0} BIF
                              </Text>
                              <View style={styles.amountBenefits}>
                                        <Text style={styles.benefit}>
                                                  +{lastContribution ? lastContribution.inTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0} BIF
                                        </Text>
                                        {lastContribution && lastContribution.outTotal > 0 ?
                                                  <>
                                                            <View style={styles.benefitSeparator} />
                                                            <Text style={[styles.benefit, { color: COLORS.minusAmount }]}>
                                                                      -{lastContribution ? lastContribution.outTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0} BIF
                                                            </Text>
                                                  </> : null}
                              </View>
                              {/* <View style={styles.overviewActions}>
                              <TouchableNativeFeedback useForeground>
                                        <View style={{ overflow: "hidden", borderRadius: 8 }}>
                                                  <View style={styles.overviewActionBtn}>
                                                            <Text style={[styles.overviewActionBtnText,]}>Modifier</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <TouchableNativeFeedback useForeground>
                                        <View style={{ overflow: "hidden", borderRadius: 8, marginLeft: 10 }}>
                                                  <View style={[styles.overviewActionBtn, { backgroundColor: '#ed221f' }]}>
                                                            <Text style={styles.overviewActionBtnText}>Supprimer</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                    </View> */}
                    </View>
          )
}
export default function Contributions({ contributions }: Props) {
          return (
                    <View style={styles.container}>
                              <View style={styles.contributionsHeader}>
                                        <View style={styles.contributions}>
                                                  <FlatList
                                                            data={contributions}
                                                            ListHeaderComponent={() => <Header lastContribution={contributions[0]} />}
                                                            renderItem={({ item: contribution, index}) => {
                                                                      return (
                                                                                <Contribution key={index} contribution={contribution} />
                                                                      )
                                                            }}
                                                            showsVerticalScrollIndicator={false}
                                                  />
                                        </View>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    marginTop: 5
          },
          contributionsHeader: {

          },
          title: {
                    color: '#777',
                    paddingHorizontal: 10,
                    fontWeight: "bold",
                    paddingBottom: 10
          },
          contributions: {
                    paddingHorizontal: 10,
                    paddingBottom: 58
          },
          lastContributionOverview: {
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 15
          },
          lastMonth: {
                    flexDirection: "row",
                    // alignItems: "center",
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
                    marginTop: 3,
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
                    backgroundColor: 'green',
                    opacity: 0.8,
          },
          overviewActions: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10
          },
          overviewActionBtn: {
                    backgroundColor: COLORS.primary,
                    borderRadius: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 15,
          },
          overviewActionBtnText: {
                    color: '#fff',
                    fontWeight: "bold",
                    opacity: 0.9
          },
})