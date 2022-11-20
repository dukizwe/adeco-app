import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ContributionInterface } from "../../../interfaces/api/ContributionInterface";
import Contribution from "./Contribution";

interface Props{
          contributions: ContributionInterface[]
}
export default function Contributions({ contributions }: Props) {
          return (
                    <View style={styles.container}>
                              <View style={styles.contributionsHeader}>
                                        {/* <Text style={styles.title}>Toutes les contributions</Text> */}
                                        <View style={styles.contributions}>
                                                  <FlatList
                                                            data={contributions}
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
                    paddingHorizontal: 10
          }
})