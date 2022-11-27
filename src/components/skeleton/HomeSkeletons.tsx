import React from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import ContributorsSkeletons from "./Skeleton"

export default function HomeSkeletons() {
          const { width } = useWindowDimensions()
          return (
                    <View style={{ marginTop: 20 }}>
                              <View style={{ paddingHorizontal: 10 }}>
                                        <View style={{ width: width - 20, height: 200, borderRadius: 20, backgroundColor: '#d9ddde', padding: 20, justifyContent: "space-between" }}>
                                                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                            <View style={{ backgroundColor: '#fff', width: 80, height: 50, borderRadius: 5 }} />
                                                            <View>
                                                                      <View style={{ backgroundColor: '#fff', width: 80, height: 10, borderRadius: 5 }} />
                                                                      <View style={{ backgroundColor: '#fff', width: 50, height: 10, borderRadius: 5, marginTop: 5, alignSelf: "flex-end" }} />
                                                            </View>
                                                  </View>
                                                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                            <View>
                                                                      <View style={{ backgroundColor: '#fff', width: 80, height: 10, borderRadius: 5 }} />
                                                                      <View style={{ backgroundColor: '#fff', width: 50, height: 10, borderRadius: 5, marginTop: 5 }} />
                                                            </View>
                                                            <View>
                                                                      <View style={{ backgroundColor: '#fff', width: 80, height: 10, borderRadius: 5 }} />
                                                                      <View style={{ backgroundColor: '#fff', width: 80, height: 10, borderRadius: 5, marginTop: 5, alignSelf: "flex-end" }} />
                                                            </View>
                                                  </View>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                                                  {(new Array(6).fill(0)).map((category, i) => {
                                                            return (
                                                                      <View style={{ marginLeft: i > 0 ? 10 : 0 }} key={i.toString()}>
                                                                                <View style={{ width: 150, height: 150, backgroundColor: '#d9ddde', borderRadius: 15 }} />
                                                                      </View>
                                                            )
                                                  }
                                                  )}
                                        </View>
                                        <View style={{ width: 100, height: 15, borderRadius: 10, backgroundColor: '#d9ddde', marginTop: 20 }} />
                              </View>
                              <ContributorsSkeletons />
                    </View>
          )
}

const styles = StyleSheet.create({

})