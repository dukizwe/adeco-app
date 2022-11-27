import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../../styles/COLORS'

export default function NavigationIndicator({ contributionsLength, activendex }: { contributionsLength: number, activendex: number }) {
          return (
                    <View style={styles.navigation}>
                              <View style={styles.dots}>
                                        {new Array(contributionsLength).fill(0).map((dot, index) => {
                                                  return (
                                                            <View style={[styles.dot, index == activendex && { backgroundColor: COLORS.primary}]} key={index} />
                                                  )
                                        })}
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          navigation: {
          },
          dots: {
                    flexDirection:"row",
                    alignItems: "center"
          },
          dot: {
                    width: 8,
                    height: 8,
                    borderRadius: 10,
                    backgroundColor: '#ddd',
                    marginHorizontal: 2
          },
})