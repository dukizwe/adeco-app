import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback  } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { ActivitiesCategoriesStyles } from './styles'

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
                                                  <TouchableWithoutFeedback onPress={() => toggleSelect(i)} key={i.toString()}>
                                                            <View>
                                                            <View style={{...styles.action, opacity: selected.includes(i) ? 0.6 : 1}} >
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

const styles = ActivitiesCategoriesStyles