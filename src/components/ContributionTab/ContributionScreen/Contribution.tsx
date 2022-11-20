import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, FontAwesome5, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons'; 
import moment from "moment";
import { ContributionInterface } from "../../../interfaces/api/ContributionInterface";
import { COLORS } from "../../../styles/COLORS";

interface Props {
          contribution: ContributionInterface
}

export default function Contribution({ contribution }: Props) {
          return (
                    <View style={styles.contribution}>
                              <View style={styles.contributionLeftSide}>
                                        <View style={styles.icon}>
                                                  {/* <FontAwesome name="dollar" size={24} color="#777" /> */}
                                                  {/* <FontAwesome5 name="hand-holding-usd" size={22} color="#777" /> */}
                                                  <Image source={require('../../../../assets/icons/contribution.png')} style={styles.iconImage} />
                                        </View>
                                        <View style={styles.details}>
                                                  <Text style={styles.title}>Contribution N° {contribution.month}</Text>
                                                  <Text style={styles.date}>
                                                            {moment(new Date(contribution.contributionDate)).format("DD MMM YYYY")}
                                                  </Text>
                                        </View>
                              </View>
                              <View style={styles.amounts}>
                                        <Text style={styles.total}>{ contribution.mainTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } BIF</Text>
                                        <Text style={[styles.additional, { color: contribution.total >= 0 ? COLORS.plusAmount : COLORS.minusAmount}]}>
                                                  {contribution.total > 0 && '+'}{ contribution.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } BIF
                                        </Text>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          contribution: {
                    backgroundColor: '#f2f6f7',
                    borderRadius: 8,
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    paddingVertical: 20
          },
          contributionLeftSide: {
                    flexDirection: "row"
          },
          icon: {
                    width: 30,
                    height: 30,
                    backgroundColor: '#FFFF',
                    borderRadius: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5
          },
          iconImage: {
                    width: "80%",
                    height: "80%",
                    borderRadius: 100
          },
          details : {
                    marginLeft: 5
          },
          title: {
                    fontWeight: "bold"
          },
          date: {
                    color: '#777',
                    fontSize: 12
          },
          amounts: {

          },
          total: {
                    fontSize: 13,
                    fontWeight: "bold",
                    textAlign: "right"
          },
          additional: {
                    fontSize: 12,
                    textAlign: "right",
                    color: "#03704c",
                    fontWeight: "bold",
                    // opacity: 0.8,
          }
})