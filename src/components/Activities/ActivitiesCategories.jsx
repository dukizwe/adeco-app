import React from 'react'
import { View, Text, StyleSheet  } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

export default function ActivitiesCategories() {
          return (          
                    <View style={styles.quickActions}>
                              <View style={styles.action}>
                                        <View style={styles.actionIcon}>
                                                  <FontAwesome5 name="tasks" size={20} color='#fff' />
                                        </View>
                                        <Text style={styles.actionTitle}>Agape</Text>
                              </View>
                              <View style={styles.action}>
                                        <View style={{...styles.actionIcon, backgroundColor: '#362b89ed'}}>
                                                  <Feather name="bell" size={24} color="#fff" />
                                        </View>
                                        <Text style={styles.actionTitle}>Aide</Text>
                              </View>
                              <View style={styles.action}>
                                        <View style={{...styles.actionIcon, backgroundColor: '#ffc107f5'}}>
                                                  <AntDesign name="barschart" size={24} color="#fff" />
                                        </View>
                                        <Text style={styles.actionTitle}>Sacrifice</Text>
                              </View>
                              <View style={styles.action}>
                                        <View style={{...styles.actionIcon, backgroundColor: '#40c2d7f5'}}>
                                                  <FontAwesome5 name="tasks" size={20} color='#fff' />
                                        </View>
                                        <Text style={styles.actionTitle}>Autres</Text>
                              </View>
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
                    backgroundColor: '#873475',
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
})