import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'

export default function ActivityTabScreen() {
          return (
                    <View style={styles.container}>
                              <LottieView
                                        style={{ width: "100%", }}
                                        source={require('../../../assets/lotties/activities.json')}
                                        autoPlay
                              />
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
          }
})