import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import UsersPaymentContext from '../../context/UsersPaymentContext'
import { MaterialIcons, FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons'; 
import { CountUp, useCountUp } from 'use-count-up'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function UsersPayHeader() {
          const { queueList } = useContext(UsersPaymentContext)
          const [total, setTotal] = useState(0)
          const [prevTotal, setPrevTotal] = useState(0)
          const navigation = useNavigation()

          useEffect(() => {
                    var newTotal = 0
                    for(let key in queueList) {
                              const userPay = queueList[key]
                              const actionsAmounts = Object.values(userPay.actions)
                              const sum = actionsAmounts.reduce((prev, current) => parseInt(prev) + parseInt(current), 0)
                              newTotal += sum
                    }
                    setPrevTotal(total)
                    setTotal(newTotal)
          }, [queueList])

          const MyCountUp = () => {
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
                    return `${value} Fbu`
          }
          const route = useRoute()
          return (
                    <View style={styles.header}>
                              {route.name == 'UsersPayment' ? <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4')} useForeground>
                                        <View style={styles.opDate}>
                                                  <FontAwesome5 name="calendar-check" size={22} color="#189fed" style={styles.icon} />
                                        </View>
                              </TouchableNativeFeedback> :
                              <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4')} useForeground onPress={() => navigation.goBack()}>
                                        <View style={styles.opDate}>
                                                  <Ionicons name="arrow-back" size={22} color="#777" />
                                        </View>
                              </TouchableNativeFeedback>}
                              <View style={styles.total}>
                                        <AntDesign name="creditcard" size={24} color="#189fed" style={styles.icon} />
                                        <Text style={styles.headerValue}>
                                                  <MyCountUp />
                                        </Text>
                                        {/* { total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu */}
                              </View>
                              <TouchableOpacity style={{...styles.nextBtn, opacity: total == 0 ? 0.5 : 1}} disabled={total == 0} onPress={() => {
                                        setPrevTotal(total)
                                        setTotal(total)
                                        navigation.navigate('Debt')
                              }}>
                                        <Text style={styles.nextText}>Suivant</Text>
                                        <MaterialIcons name="navigate-next" size={24} color="#189fed" />
                              </TouchableOpacity>
                    </View>
          )
}

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