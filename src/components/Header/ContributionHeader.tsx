import React, { useCallback, useContext, useEffect, useState, memo } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableOpacity, TextStyle, SafeAreaView, Platform } from 'react-native'
import { MaterialIcons, FontAwesome5, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { CountUp, useCountUp } from 'use-count-up'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useAppSelector } from '../../hooks/useAppSelector';
import { queueListSelector } from '../../store/selectors/contributionSelectors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { resetNewContributionAcion, setQueueListAction } from '../../store/actions/contributionActions';
import moment from 'moment';
import { COLORS } from '../../styles/COLORS';
import Loading from '../app/Loading';
import { setIsLoadingAction } from '../../store/actions/appActions';
import wait from '../../helpers/wait';
import fetchApi from '../../utils/fetchApi';

export default memo(function ContributionHeader() {
          const queueList = useAppSelector(queueListSelector)
          const [total, setTotal] = useState(0)
          const [prevTotal, setPrevTotal] = useState(0)

          const navigation = useNavigation()
          const route = useRoute()
          const dispatch = useDispatch()

          const [showCalendar, setShowCalendar] = useState(false)

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

          const onCalendaPress = () => {
                    setShowCalendar(true)
          }

          const onChangeDate = (event: DateTimePickerEvent, time?: Date) => {
                    setShowCalendar(Platform.OS === "ios");
                    const date = time || new Date()
                    dispatch(setQueueListAction({ ...queueList, date: date.toDateString() }))
          }

          useEffect(() => {
                    var newTotal = 0
                    queueList.contributions.forEach(contribution => {
                              newTotal += contribution.actions?.action ? contribution.actions?.action : 0
                              newTotal += contribution.actions?.debt ? contribution.actions?.debt : 0
                              var ratesTotal = 0
                              if (contribution.actions?.rates && contribution.actions?.rates?.length > 0) {
                                        contribution.actions?.rates.forEach(rate => {
                                                  newTotal += rate.amount
                                        })
                              }
                    })
                    setPrevTotal(total)
                    setTotal(newTotal)
          }, [queueList])

          const onConfirm = useCallback(() => {
                    (async () => {
                              const contributions = queueList.contributions.map(contribution =>{
                                        return {
                                                  contributedBy: contribution._id,
                                                  actions: {
                                                            action: contribution.actions?.action,
                                                            debt: contribution.actions?.debt,
                                                            rates: contribution.actions?.rates
                                                  }
                                        }
                              })
                              var activities: any[] = []
                              if(queueList.activities && queueList.activities.length > 0) {
                                        activities = queueList.activities.map(activity => {
                                                  return {
                                                            categoryId: activity.category?._id,
                                                            amount: activity.amount,
                                                            description: activity.comment,
                                                            activityDate: activity.date,
                                                  }
                                        })
                              }
                              try {
                                        dispatch(setIsLoadingAction(true))
                                        const newContribution = await fetchApi('/contributions', {
                                                  method: "POST",
                                                  body: JSON.stringify({
                                                            contributions,
                                                            activities,
                                                            debts: queueList.debts?.map(d => d._id)
                                                  }),
                                                  headers: { "Content-Type": "application/json" },
                                        })
                                        navigation.navigate('ContributionSuccessScreen' as never)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        dispatch(setIsLoadingAction(false))
                              }
                    })()
          }, [queueList])

          const onNextPress = useCallback(() => {
                    if(route.name == 'ContributionSuccessScreen') {
                              dispatch(resetNewContributionAcion())
                              return navigation.navigate('ContributionScreen' as never)
                    }
                    if (route.name == 'NewContributionScreen') {
                              navigation.navigate("DebtScreen" as never)
                    } else if (route.name == 'DebtScreen') {
                              navigation.navigate("AcitivitiesScreen" as never)
                    } else if (route.name == "AcitivitiesScreen") {
                              navigation.navigate('ConfirmContributionScreen' as never)
                    } else if(route.name == "ConfirmContributionScreen") {
                              onConfirm()
                    } else if(route.name == "ContributionSuccessScreen") {
                              navigation.navigate('NewContributionScreen' as never)
                    }
          }, [route.name])

          useFocusEffect(useCallback(() => {
                    if (route.name == 'DebtScreen') {
                              calendarTranslateX.value = withSpring(-30)
                              calendarOpacity.value = withSpring(0)

                              backBtnTranslateX.value = withSpring(15)
                              backBtnOpacity.value = withSpring(1)
                    }
          }, [route.name]))

          const onBackPress = useCallback(() => {
                    if(route.name == "ContributionSuccessScreen") {
                              dispatch(resetNewContributionAcion())
                              return navigation.navigate('ContributionScreen' as never)
                    }
                    navigation.goBack()
          }, [route.name])

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

          const noAnimationsRouteNames = ['AcitivitiesScreen', 'ConfirmContributionScreen', 'ContributionSuccessScreen']
          return (
                    <>
                    <View style={styles.header}>
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', false)} useForeground onPress={onCalendaPress} disabled={route.name != "NewContributionScreen"}>
                                        <Animated.View style={[styles.opDate, calendarAnimatedStyles, noAnimationsRouteNames.includes(route.name) && { transform: [{ translateX: -30 }], opacity: 0 }]}>
                                                  <FontAwesome5 name="calendar-check" size={22} color="#189fed" style={styles.icon} />
                                        </Animated.View>
                              </TouchableNativeFeedback>
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', false)} useForeground onPress={onBackPress} disabled={route.name == 'NewContributionScreen'}>
                                        <Animated.View style={[styles.opDate, !noAnimationsRouteNames.includes(route.name) && backBtnAnimatedStyles, { position: 'absolute', transform: [{ translateX: 15 }] }]}>
                                                  {route.name == "ContributionSuccessScreen" ? <AntDesign name="close" size={24} color="#777" /> : <Ionicons name="arrow-back" size={22} color="#777" />}
                                        </Animated.View>
                              </TouchableNativeFeedback>
                              {route.name == "ConfirmContributionScreen" ?
                                        <Text style={{ color: '#777', marginLeft: 20 }}>{queueList.date ? moment(new Date(queueList.date)).format("DD-MM-YYYY") : moment(new Date()).format("DD-MM-YYYY")}</Text> :
                                        route.name != "ContributionSuccessScreen" ? <>
                                                  <View style={styles.total}>
                                                            <AntDesign name="creditcard" size={24} color="#189fed" style={styles.icon} />
                                                            <MyCountUp style={styles.headerValue} />
                                                            {/* { total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu */}
                                                  </View>
                                        </> : null}
                              <TouchableOpacity style={[styles.nextBtn, total == 0 && {opacity: 0.5} ]} disabled={total == 0} onPress={onNextPress}>
                                        <Text style={styles.nextText}>
                                                  {route.name == "ConfirmContributionScreen" ? 'Envoyer' : (route.name == "ContributionSuccessScreen" ? "Liste" : 'Suivant')}
                                        </Text>
                                        {route.name == "ConfirmContributionScreen" ?
                                        <Ionicons name="send-outline" size={22} color={COLORS.primary} />:
                                                  <MaterialIcons name="navigate-next" size={24} color={COLORS.primary} />}
                              </TouchableOpacity>
                              {showCalendar && (
                                        <DateTimePicker
                                                  testID="dateTimePicker"
                                                  value={queueList.date ? new Date(queueList.date) : new Date()}
                                                  mode='date'
                                                  is24Hour={true}
                                                  display="default"
                                                  onChange={onChangeDate}
                                                  maximumDate={new Date()}
                                        />
                              )}
                    </View>
                    </>
          )
})

const styles = StyleSheet.create({
          header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    paddingHorizontal: 10,
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
                    color: '#189fed',
                    marginRight: 5
          }
})