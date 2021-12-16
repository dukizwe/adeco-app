import React, { useContext } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import styles from './styles';
import UsersPaymentContext from '../../context/UsersPaymentContext';


export default function UsersPaymentsQuickActions() {
          const { users, selectedBatch, setSelectedBatch, setInSelect } = useContext(UsersPaymentContext)
          const toggleSelectAll = () => {
                    if(selectedBatch.length != users.length) {
                              setSelectedBatch(users)
                    } else {
                              setSelectedBatch([])
                              setInSelect(false)
                    }
          }

          return (
                    <View style={styles.quickActions}>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4')}
                                        onPress={toggleSelectAll}>
                                        <View style={styles.selectAllCircle}>
                                                  <View style={styles.circle}>
                                                            <Text style={styles.selectedCount}>{selectedBatch.length}</Text>
                                                  </View>
                                        </View>
                              </TouchableNativeFeedback>
                              <View style={styles.actions}>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#40c2d7f5'}}>
                                                            <Text style={styles.actionButtonText}>action</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#362b89ed'}}>
                                                            <Text style={styles.actionButtonText}>retard</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#873475'}}>
                                                            <Text style={styles.actionButtonText}>dette</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#cbd1d4')}>
                                                  <View style={{...styles.quickActionButton, backgroundColor: '#547360'}}>
                                                            <Text style={styles.actionButtonText}>tous</Text>
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#cbd1d4')}>
                                        <View style={styles.exitButton}>
                                                  <Feather name="x" size={24} color="#777" />
                                        </View>
                              </TouchableNativeFeedback>
                    </View>
          )
}