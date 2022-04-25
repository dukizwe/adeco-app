import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import UsersPaymentContext from '../../context/UsersPaymentContext'
import { MaterialIcons } from '@expo/vector-icons'; 
import { CountUp, useCountUp } from 'use-count-up'

export default function UsersPayHeader() {
          const { queueList } = useContext(UsersPaymentContext)
          const [total, setTotal] = useState(0)
          const [prevTotal, setPrevTotal] = useState(0)

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
                    const { value, reset } = useCountUp({ isCounting: true, start: prevTotal, end: total, duration: 0.3, thousandsSeparator: ' '})
                    /* useEffect(() => {
                              reset()
                    }, [total]) */
                    // return total
                    return `${value} Fbu`
          }
          return (
                    <View style={styles.header}>
                              <TouchableOpacity>
                                        <View style={styles.opDate}>
                                                  <Text style={styles.headerTitle}>Date</Text>
                                                  <Text style={styles.headerValue}>25-01-2022</Text>
                                        </View>
                              </TouchableOpacity>
                              <View style={styles.total}>
                                        <Text style={styles.headerTitle}>Total</Text>
                                        <Text style={styles.headerValue}>
                                                  <MyCountUp />
                                        </Text>
                                        {/* { total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu */}
                              </View>
                              {total == 0 ? <View style={{...styles.nextBtn, opacity: 0.5}}>
                                        <Text style={styles.nextText}>Suivant</Text>
                                        <MaterialIcons name="navigate-next" size={24} color="#189fed" />
                              </View> :
                              <TouchableOpacity style={{...styles.nextBtn, opacity: total == 0 ? 0.5 : 1}}>
                                        <Text style={styles.nextText}>Suivant</Text>
                                        <MaterialIcons name="navigate-next" size={24} color="#189fed" />
                              </TouchableOpacity>}
                    </View>
          )
}

const styles = StyleSheet.create({
          header: {
                    paddingVertical: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 10
          },
          headerTitle: {
                    fontWeight: 'bold',
                    opacity: 0.8,
                    fontSize: 17
          },
          headerValue: {
                    color: '#777',
                    fontWeight: 'bold'
          },
          opDate: {
                    flex: 1
          },
          total: {
                    flex: 1,
                    marginHorizontal: 20,
                    alignItems: 'center'
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