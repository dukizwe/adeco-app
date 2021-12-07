import React, { useEffect, useRef, useState } from 'react'
import ReactNative, { View, Text, StyleSheet, TouchableNativeFeedback, Animated, Easing  } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 

export default function Activity({ activity }) {
          const [bodyShown, setBodyShown] = useState(false)
          /* const [activityPosition, setActivityPosition] = useState({
                    Width: 100
          })
          const heightAnim = useRef(new Animated.Value(0)).current
          
          const startAnimation = () => {
                    setBodyShown(t => !t)
                    activityRef.current.measureLayout(ReactNative.findNodeHandle(containerRef.current), (xPos, yPos, Width, Height) => {
                              setActivityPosition({ x: xPos, y: yPos, width: Width, height: Height });
                              console.log(Height)
                              Animated.timing(
                                        heightAnim,
                                        {
                                                  toValue: Height,
                                                  duration: 100,
                                                  useNativeDriver: false
                                        }
                              ).start()
                    });
          }*/
          
          const activityRef = useRef(null)
          const containerRef = useRef(null)
          return (
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                              onPress={(() => {
                                        setBodyShown(t => !t)
                              })}
                              ref={containerRef}
                    >
                              <Animated.View style={styles.transanction} ref={activityRef}>
                                        <View style={styles.transanctionMain}>
                                                  <View style={styles.transanctionRight}>
                                                            <View style={{...styles.transanctionIcon, backgroundColor: '#362b891a'}}>
                                                                      <FontAwesome name="dollar" size={30} color="#362b89ed" />
                                                            </View>
                                                            <View style={styles.transanctionMiddle}>
                                                                      <Text style={styles.transationTitle}>Flight booking</Text>
                                                                      <Text style={styles.transationDay}>17 june 2019</Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.transanctionAmount}>
                                                            <Text style={{...styles.amountSign, color: '#362b89ed'}}>-</Text>
                                                            <Text style={styles.amount}>$5100.10</Text>
                                                  </View>
                                        </View>
                                        {bodyShown && <Text style={styles.body}>{activity.body}</Text>}
                              </Animated.View>
                    </TouchableNativeFeedback>
          )
}

const styles = StyleSheet.create({
          transanctionHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginBottom: 20
          },
          transationsTitle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    opacity: 0.6
          },
          transanctionDate: {
                    color: '#000',
                    opacity: 0.5,
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginTop: 5
          },
          transanction: {
                    backgroundColor: '#f2f6f7',
                    borderRadius: 10,
                    padding: 15,
                    marginVertical: 10,
          },
          transanctionMain: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    width: '100%'
          },
          transanctionIcon: {
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: '#ebeded'
          },
          transanctionRight: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          transanctionMiddle: {
                    marginLeft: 15,
          },
          transationTitle: {
                    fontSize: 14,
                    color: '#000',
                    opacity: 0.7,
                    fontWeight: 'bold'
          },
          transationDay: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.5,
          },
          transanctionAmount: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          amountSign: {
                    color: 'red',
                    fontWeight: 'bold'
          },
          amount: {
                    fontWeight: 'bold',
                    color: '#000'
          },
          body: {
                    color: '#000',
                    opacity: 0.7
          }
})