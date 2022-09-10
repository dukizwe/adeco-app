import React, { useCallback, useContext, useEffect, useState, memo } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableOpacity, TextStyle, SafeAreaView } from 'react-native'
import { MaterialIcons, FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons'; 
import { CountUp, useCountUp } from 'use-count-up'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useAppSelector } from '../../hooks/useAppSelector';
import { queueListSelector } from '../../store/selectors/contributionSelectors';

export default memo(function ContributionHeader() {
          const queueList = useAppSelector(queueListSelector)
          const [total, setTotal] = useState(0)
          const [prevTotal, setPrevTotal] = useState(0)
          const navigation = useNavigation()
          const route = useRoute()

          const calendarTranslateX = useSharedValue(0)
          const calendarOpacity = useSharedValue(1)

          const backBtnTranslateX = useSharedValue(45)
          const backBtnOpacity = useSharedValue(0)
          const calendarAnimatedStyles = useAnimatedStyle(() => ({
                    transform: [{
                              translateX: calendarTranslateX.value
                    }],
                    opacity: calendarOpacity.value
          }))
          const backBtnAnimatedStyles = useAnimatedStyle(() => ({
                    transform: [{
                              translateX: backBtnTranslateX.value
                    }],
                    opacity: backBtnOpacity.value
          }))

          useEffect(() => {
                    var newTotal = 0
                    for(let key in queueList) {
                              const userPay = queueList[key]
                              const actionsAmounts = userPay.actions ? Object.values(userPay.actions) : 0
                              let sum = actionsAmounts && actionsAmounts.reduce((prev, current) => prev + current, 0)
                             /*  if(userPay.debt) {
                                        sum += userPay.debt.montant
                              } */
                              newTotal += sum
                    }
                    setPrevTotal(total)
                    setTotal(newTotal)
          }, [queueList])

          const onNextPress = useCallback(() => {
                    // return navigation.navigate("DebtScreen" as never)
                    if(route.name == 'Contribution') {
                              navigation.navigate("DebtScreen" as never)
                    } else if (route.name == 'DebtScreen') {
                              navigation.navigate("AcitivitiesScreen" as never)
                    }
          }, [route.name])

          useFocusEffect(useCallback(() => {
                    if(route.name == 'DebtScreen') {
                              calendarTranslateX.value = withSpring(-30)
                              calendarOpacity.value = withSpring(0)
          
                              backBtnTranslateX.value = withSpring(15)
                              backBtnOpacity.value = withSpring(1)
                    }
          }, [route.name]))

          const onBackPress = () => {
                    navigation.goBack()
          }

          useEffect(() => {
                    const unsubscribe = navigation.addListener('beforeRemove', () => {
                              calendarTranslateX.value = withSpring(0)
                              calendarOpacity.value = withSpring(1)
          
                              backBtnTranslateX.value = withSpring(30)
                              backBtnOpacity.value = withSpring(0)
                    })
                    return unsubscribe
          }, [])

          const MyCountUp = ({ style }: { style: TextStyle }) => {
                    const { value, reset } = useCountUp({
                              isCounting: true,
                              start: prevTotal,
                              end: total,
                              duration: 0.3,
                              thousandsSeparator: ' ',
                              onComplete: () => {
                                        setPrevTotal(total)
                              }
                    })
                    return <Text style={style}>{`${value} Fbu`}</Text>
          }

          const noAnimationsRouteNames = ['AcitivitiesScreen']
          return (
                    route.name != "AcitivitiesScreen" ? <View style={styles.header}>
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', false)} useForeground>
                                        <Animated.View style={[styles.opDate, calendarAnimatedStyles, noAnimationsRouteNames.includes(route.name) && { transform: [{ translateX: -30 }], opacity: 0 } ]}>
                                                  <FontAwesome5 name="calendar-check" size={22} color="#189fed" style={styles.icon} />
                                        </Animated.View>
                              </TouchableNativeFeedback>
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', false)} useForeground onPress={onBackPress}>
                                        <Animated.View style={[styles.opDate, !noAnimationsRouteNames.includes(route.name) && backBtnAnimatedStyles, { position: 'absolute', transform: [{ translateX: 15 }] }]}>
                                                  <Ionicons name="arrow-back" size={22} color="#777" />
                                        </Animated.View>
                              </TouchableNativeFeedback>
                              <View style={styles.total}>
                                        <AntDesign name="creditcard" size={24} color="#189fed" style={styles.icon} />
                                        <MyCountUp style={styles.headerValue} />
                                        {/* { total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu */}
                              </View>
                              <TouchableOpacity style={{...styles.nextBtn, opacity: total == 0 ? 0.5 : 1}} disabled={total == 0} onPress={onNextPress}>
                                        <Text style={styles.nextText}>Suivant</Text>
                                        <MaterialIcons name="navigate-next" size={24} color="#189fed" />
                              </TouchableOpacity>
                    </View> : null
          )
})

const styles = StyleSheet.create({
          header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    height: 60
          },
          icon: {
                    opacity: 0.8
          },
          headerTitle: {
                    fontWeight: 'bold',
                    opacity: 0.8,
                    fontSize: 17
          },
          headerValue: {
                    color: '#777',
                    fontWeight: 'bold',
                    marginLeft: 5
          },
          opDate: {
                    padding: 5,
                    borderRadius: 5,
                    overflow: 'hidden'
          },
          total: {
                    marginHorizontal: 20,
                    alignItems: 'center',
                    flexDirection: 'row'
          },
          nextBtn: {
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 10,
          },
          nextText: {
                    color: '#189fed'
          }
})