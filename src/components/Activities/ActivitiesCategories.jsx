import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback  } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function ActivitiesCategories() {
          const categories = [
                    {
                              label: 'Agape',
                              color: '#873475'
                    },
                    {
                              label: 'Aide',
                              color: '#362b89ed'
                    },
                    {
                              label: 'Sacrifice',
                              color: '#ffc107f5'
                    },
                    {
                              label: 'Autres',
                              color: '#40c2d7f5'
                    }
          ]
          const [selected, setSelected] = useState([])
          const toggleSelect = (index) => {
                    if(selected.includes(index)) {
                              const newSelected = selected.filter(i => i != index)
                              setSelected(newSelected)
                    } else {
                              setSelected(prev => [...prev, index])
                    }
          }
          return (          
                    <View style={styles.quickActions}>
                              {categories.map((category, i) => {
                                        return (
                                                  <TouchableWithoutFeedback onPress={() => toggleSelect(i)}>
                                                            <View>
                                                            <View style={{...styles.action, opacity: selected.includes(i) ? 0.6 : 1}} key={i.toString()}>
                                                                      <View style={{...styles.actionIcon, backgroundColor: category.color}}>
                                                                                <Feather name="bell" size={24} color="#fff" />
                                                                      </View>
                                                                      <Text style={styles.actionTitle}>{category.label}</Text>
                                                            </View>
                                                            {selected.includes(i) && <View style={{...styles.selectedCheck, backgroundColor: category.color}}>
                                                                      <Feather name="check" size={19} color="#fff" style={{marginTop: -1, marginLeft: -2}} />
                                                            </View>}
                                                            </View>
                                                  </TouchableWithoutFeedback>
                                        )}
                              )}
                    </View>
          )
}

const styles = StyleSheet.create({
          
          action: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          quickActions: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20
          },
          actionIcon: {
                    borderRadius: 20,
                    padding: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          },
          actionTitle: {
                    marginTop: 5,
                    color: '#000',
                    opacity: 0.6,
                    fontWeight: 'bold'
          },
          selectedCheck: {
                    width: 20,
                    height: 20,
                    backgroundColor: 'red',
                    borderRadius: 100,
                    position: 'absolute',
                    top: -10,
                    right: 0,
                    padding: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
          }
})