import React, { useEffect, useRef, useState } from 'react'
import ReactNative, { View, Text, StyleSheet, TouchableNativeFeedback, Animated, Easing  } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { ActivityStyles } from './styles';

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

const styles = ActivityStyles