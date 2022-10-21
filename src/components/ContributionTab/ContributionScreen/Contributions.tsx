import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Contribution from "./Contribution";
export default function Contributions() {
          return (
                    <View style={styles.container}>
                              <View style={styles.contributionsHeader}>
                                        {/* <Text style={styles.title}>Toutes les contributions</Text> */}
                                        <View style={styles.contributions}>
                                                  <FlatList
                                                            data={new Array(20).fill(0)}
                                                            renderItem={({ item: contribution, index}) => {
                                                                      return (
                                                                                <Contribution key={index} />
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