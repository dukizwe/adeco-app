import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native"
import { Entypo, Feather, MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { primaryColor } from "../../styles";
import Contributions from "../../components/ContributionTab/ContributionScreen/Contributions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import fetchApi from "../../utils/fetchApi";
import { ContributionInterface } from "../../interfaces/api/ContributionInterface";
import { COLORS } from "../../styles/COLORS";
import ContributorsSkeletons from "../../components/skeleton/Skeleton";

export default function ContributionScreen() {
          const navigation = useNavigation()
          const [contributions, setContributions] = useState<ContributionInterface[]>([])
          const [loading, setLoading] = useState(true)
          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        const res = await fetchApi('/contributions')
                                        setContributions(res.data)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, []))

          const lastContribution = contributions.length > 0 ? contributions[0] : null
          return (
                    <View style={styles.container}>
                              <View style={styles.header}>
                                        <Text style={styles.title}>
                                                  Contribution
                                        </Text>
                                        <View style={styles.contributionRightSide}>
                                                  <TouchableNativeFeedback useForeground onPress={() => navigation.navigate('NewContributionScreen' as never)}>
                                                            <View style={{ overflow: "hidden", borderRadius: 10 }}>
                                                                      <View style={styles.headerIconTitle}>
                                                                                <Ionicons name="ios-add-circle" size={24} color={primaryColor} />
                                                                                <Text style={[styles.headerBtnTitle, { color: primaryColor }]}>Nouvelle</Text>
                                                                      </View>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                              </View>
                              {loading ? <ContributorsSkeletons /> : <>
                              <View style={styles.lastContributionOverview}>
                                        <View style={styles.lastMonth}>
                                                  <Text style={styles.overviewTitle}>MOIS DERNIER</Text>
                                                  <View style={styles.monthBadge}>
                                                            <Text style={styles.monthCount}>
                                                                      { lastContribution?.month }
                                                            </Text>
                                                  </View>
                                        </View>
                                        <Text style={styles.overviewAmount}>
                                                  { lastContribution ? lastContribution.mainTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0 } BIF
                                        </Text>
                                        <View style={styles.amountBenefits}>
                                                  <Text style={styles.benefit}>
                                                            +{ lastContribution ? lastContribution.inTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0 } BIF
                                                  </Text>
                                                  {lastContribution && lastContribution.outTotal > 0 ?
                                                  <>
                                                   <View style={styles.benefitSeparator} />
                                                  <Text style={[styles.benefit, { color: COLORS.minusAmount }]}>
                                                            -{ lastContribution ? lastContribution.outTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 0 } BIF
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
                              <Contributions contributions={contributions} />
                              </>}
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    backgroundColor: '#FFF'
          },
          header: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10
          },
          title: {
                    fontWeight: "bold",
                    color: '#777',
                    fontSize: 18
          },
          contributionRightSide: {

          },
          headerIconTitle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F1F1F1',
                    paddingHorizontal: 10,
                    paddingVertical: 5
          },
          headerBtnTitle: {
                    color: '#777',
                    marginLeft: 5,
                    fontWeight: 'bold',
                    fontSize: 13
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
                    backgroundColor: primaryColor,
                    borderRadius: 8,
                    paddingVertical: 8,
                    paddingHorizontal: 15,
          },
          overviewActionBtnText: {
                    color: '#fff',
                    fontWeight: "bold",
                    opacity: 0.9
          }
})