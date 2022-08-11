import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'; 
import ContributionContext from '../../context/ContributionContext';


export default function DebtScreenHeader() {
          const { inSelect, setInSelect, setStartAnimation, setSelectedBatch } = useContext(ContributionContext)
          const [loading, setLoading] = useState(true)
          useEffect(() => {
                    setLoading(false)
          }, [])
          if(loading) {
                    return <View />
          }
          return (
                    <View style={styles.header}>
                              <Text style={styles.title}>Dettes</Text>
                              <View style={styles.actions}>
                                        <TouchableNativeFeedback useForeground={true}>
                                                  <View style={styles.actionBtn}>
                                                            <Feather name="search" size={24} color="#777" />
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 10,
          },
          title: {
                    color: '#777',
                    fontWeight: 'bold',
                    fontSize: 16
          },
          actions: {
                    flexDirection: 'row',
                    alignItems: 'center'
          },
          actionBtn: {
                    margin: 2,
                    padding: 5,
                    borderRadius: 5,
                    overflow: 'hidden'
          }
})