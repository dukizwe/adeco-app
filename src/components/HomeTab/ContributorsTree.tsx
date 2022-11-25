import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { contributorsSelector } from "../../store/selectors/contributionSelectors";

export default function ContributorsTree() {
          const contributors = useSelector(contributorsSelector)
          return (
                    <View style={styles.contributors}>
                              {contributors.map((contributor, index) => {
                                        return (
                                                  <View style={styles.contributor} key={index}>
                                                            <View style={styles.userHeader}>
                                                                      <Image source={require('../../../assets/girl.jpg')} style={styles.image} />
                                                                      <View style={styles.user}>
                                                                                <Text style={styles.userNames}>
                                                                                          { contributor.firstName } { contributor.lastName }
                                                                                </Text>
                                                                                <Text style={styles.userRole}>
                                                                                          { contributor.profile.name }
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                  </View>
                                        )
                              })}
                    </View>
          )
}
const styles = StyleSheet.create({
          contributors: {
                    paddingHorizontal: 20
          },
          contributor: {

          },
          userHeader: {
                    flexDirection: "row",
                    alignItems: "center"
          },
          user: {
                    marginLeft: 10
          },
          image: {
                    width: 50,
                    height: 50,
                    borderRadius: 50
          },
          userNames: {
                    fontWeight: "bold",
                    fontSize: 15
          },
          userRole: {
                    color: '#777',
                    fontSize: 12,
                    marginTop: 5
          }
})