import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ContributionDashboard() {
          return (
                    <View style={styles.dashboadContainer}>
                              {/* <Text style={styles.title}>
                                        Contribution
                              </Text> */}
                              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dashboards}>
                                        <View style={[styles.dash, { marginLeft: 20 }]}>
                                                  <View style={styles.dashIcon}>
                                                            <Image source={require('../../../assets/icons/contribution-white.png')} style={styles.icon} />
                                                  </View>
                                                  <Text style={styles.dashValue}>+30 000 BIF</Text>
                                                  <Text style={styles.dashLabel}>Action</Text>
                                        </View>
                                        <View style={[styles.dash, { marginLeft: 20, backgroundColor: '#EBF7FA' }]}>
                                                  <View style={[styles.dashIcon, { backgroundColor: '#97D4E7' }]}>
                                                            <Image source={require('../../../assets/icons/debt-white.png')} style={styles.icon} />
                                                  </View>
                                                  <Text style={styles.dashValue}>+500 000 BIF</Text>
                                                  <Text style={styles.dashLabel}>Retenu M</Text>
                                        </View>
                                        <View style={[styles.dash, { marginLeft: 20, backgroundColor: '#FFF6E0' }]}>
                                                  <View style={[styles.dashIcon, { backgroundColor: '#FFD46A' }]}>
                                                            <Image source={require('../../../assets/icons/borrow-white.png')} style={styles.icon} />
                                                  </View>
                                                  <Text style={styles.dashValue}>+300 000 BIF</Text>
                                                  <Text style={styles.dashLabel}>Dettes R</Text>
                                        </View>
                                        <View style={[styles.dash, { marginLeft: 20, backgroundColor: '#eed4e8' }]}>
                                                  <View style={[styles.dashIcon, { backgroundColor: '#873475' }]}>
                                                            <Image source={require('../../../assets/icons/borrow-white.png')} style={styles.icon} />
                                                  </View>
                                                  <Text style={styles.dashValue}>+30 000 BIF</Text>
                                                  <Text style={styles.dashLabel}>Dettes rendus</Text>
                                        </View>
                                        <View style={[styles.dash, { marginLeft: 20, backgroundColor: '#d8d5eaed' }]}>
                                                  <View style={[styles.dashIcon, { backgroundColor: '#362b89ed' }]}>
                                                            <Image source={require('../../../assets/icons/late-white.png')} style={styles.icon} />
                                                  </View>
                                                  <Text style={styles.dashValue}>+30 000 BIF</Text>
                                                  <Text style={styles.dashLabel}>Retard</Text>
                                        </View>
                                        <View style={[styles.dash, { marginHorizontal: 20, backgroundColor: '#b7cae1' }]}>
                                                  <View style={[styles.dashIcon, { backgroundColor: '#1b3555' }]}>
                                                            <Image source={require('../../../assets/icons/activity-white.png')} style={styles.icon} />
                                                  </View>
                                                  <Text style={styles.dashValue}>+30 000 BIF</Text>
                                                  <Text style={styles.dashLabel}>Activités</Text>
                                        </View>
                              </ScrollView>
                    </View>
          )
}

const styles = StyleSheet.create({
          dashboadContainer:  {
                    // paddingHorizontal: 20
          },
          title: {
                    fontWeight: "bold"
          },
          dashboards: {
                    marginTop: 20
          },
          dash: { 
                    borderRadius: 15,
                    padding: 20,
                    backgroundColor: '#FFEDE5'
          },
          dashIcon: {
                    backgroundColor: '#F8753D',
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
          },
          icon: {
                    width: "50%",
                    height: "50%",
          },
          dashValue: {
                    fontSize: 15,
                    fontWeight: "bold",
                    marginTop: 10,
                    marginBottom: 5
          },
          dashLabel: {
                    color: '#777'
          }
})