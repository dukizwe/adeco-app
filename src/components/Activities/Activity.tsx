import React, { useEffect, useRef, useState } from 'react'
import ReactNative, { View, Text, StyleSheet, TouchableNativeFeedback, Animated, Easing  } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { ActivityStyles } from './styles';
import { Activity as ActivityInterface } from '../../types/Activity';
import { ActivitiesIcons } from '../ContributionTab/ActivityForm';
import moment from 'moment';

interface Props {
          activity: ActivityInterface,
          onLongPress?: (activity: ActivityInterface) => void,
          index: number,
          isSelected?: boolean,
          isInSelect?: boolean,
          setIsInSelect?: React.Dispatch<React.SetStateAction<boolean>>,
          selectedActivites?: ActivityInterface[],
          setSelectedActivities?: React.Dispatch<React.SetStateAction<ActivityInterface[]>>
}

export default function Activity({ activity, onLongPress, index, isSelected, isInSelect, setIsInSelect, selectedActivites, setSelectedActivities }: Props) {
          const [bodyShown, setBodyShown] = useState(false)
          
          const activityRef = useRef(null)
          const containerRef = useRef(null)

          const iconType = activity.category?.iconType

          const onPress = () => {
                    if(!isInSelect) return setBodyShown(t => !t)
                    if(isSelected) {
                              const newSelected = selectedActivites ? selectedActivites.filter((act, i) => act.id != activity.id) : []
                              setSelectedActivities && setSelectedActivities(newSelected)
                    } else {
                              setSelectedActivities && setSelectedActivities(t => [...t, activity])
                    }
          }

          useEffect(() => {
                    if(selectedActivites && selectedActivites.length == 0) {
                              setIsInSelect && setIsInSelect(false)
                    }
          }, [selectedActivites])
          return (
                    <View>
                    <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#cbd1d4', false)}
                              onPress={onPress}
                              onLongPress={() => onLongPress && onLongPress(activity)}
                              ref={containerRef}
                              useForeground={true}
                              style={{ backgroundColor: 'red'}}
                    >
                              <Animated.View style={[styles.transanction, isSelected && { backgroundColor: '#ddd' }]} ref={activityRef}>
                                        <View style={styles.transanctionMain}>
                                                  <View style={styles.transanctionRight}>
                                                            <View style={{...styles.transanctionIcon, backgroundColor: '#362b891a'}}>
                                                                      {iconType ? ActivitiesIcons[iconType](activity.category?.iconName, { fontSize: 30 }) : <FontAwesome name="dollar" size={30} color="#362b89ed" />}
                                                            </View>
                                                            <View style={styles.transanctionMiddle}>
                                                                      <Text style={styles.transationTitle}>{activity.category ? activity.category.name : `Flight booking`}</Text>
                                                                      <Text style={styles.transationDay}>{activity.date ? moment(activity.date).format("DD MMMM YYYY") :`17 june 2019`}</Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.transanctionAmount}>
                                                            <Text style={{...styles.amountSign, color: '#362b89ed'}}>
                                                                      {activity.category?.type == "in" ? `+` : `-`}
                                                            </Text>
                                                            <Text style={styles.amount}>
                                                                      {activity.amount ? `${activity.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu` : `$5100.10`}
                                                            </Text>
                                                  </View>
                                        </View>
                                        {bodyShown && activity.comment && <Text style={styles.body}>{activity.comment}</Text>}
                              </Animated.View>
                    </TouchableNativeFeedback>
                    </View>
          )
}

const styles = ActivityStyles