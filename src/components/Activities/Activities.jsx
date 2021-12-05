import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet  } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'; 
import ActivitiesCategories from './ActivitiesCategories';

export default function Activities() {
          return (
                    <View style={styles.transationsContainer}>
                              <View style={styles.transanctionHeader}>
                                        <Text style={styles.transationsTitle}>Activites</Text>
                              </View>
                              <ActivitiesCategories />
                              <Text style={styles.transanctionDate}>Today</Text>
                              <View style={styles.transanction}>
                                        <View style={styles.transanctionRight}>
                                                  <View style={{...styles.transanctionIcon, backgroundColor: '#362b891a'}}>
                                                            <FontAwesome name="dollar" size={30} color="#362b89ed" />
                                                  </View>
                                                  <View style={styles.transanctionMiddle}>
                                                            <Text style={styles.transationTitle}>Flight booking</Text>
                                                            <Text style={styles.transationDay}>17 june 2019</Text>
                                                  </View>
                                        </View>
                                        <View style={styles.transanctionAmount}>
                                                  <Text style={{...styles.amountSign, color: '#362b89ed'}}>-</Text>
                                                  <Text style={styles.amount}>$5100.10</Text>
                                        </View>
                              </View>
                              <View style={styles.transanction}>
                                        <View style={styles.transanctionRight}>
                                                  <View style={styles.transanctionIcon}>
                                                            <Feather name="shopping-bag" size={24} color="#40c2d7f5" />
                                                  </View>
                                                  <View style={styles.transanctionMiddle}>
                                                            <Text style={styles.transationTitle}>Flight booking</Text>
                                                            <Text style={styles.transationDay}>17 june 2019</Text>
                                                  </View>
                                        </View>
                                        <View style={styles.transanctionAmount}>
                                                  <Text style={styles.amountSign}>-</Text>
                                                  <Text style={styles.amount}>$5100.10</Text>
                                        </View>
                              </View>
                              <Text style={styles.transanctionDate}>Last week</Text>
                              <View style={styles.transanction}>
                                        <View style={styles.transanctionRight}>
                                                  <View style={{...styles.transanctionIcon, backgroundColor: '#ffc10717'}}>
                                                            <FontAwesome name="dollar" size={30} color="#ffc107f5" />
                                                  </View>
                                                  <View style={styles.transanctionMiddle}>
                                                            <Text style={styles.transationTitle}>Flight booking</Text>
                                                            <Text style={styles.transationDay}>17 june 2019</Text>
                                                  </View>
                                        </View>
                                        <View style={styles.transanctionAmount}>
                                                  <Text style={styles.amountSign}>-</Text>
                                                  <Text style={styles.amount}>$5100.10</Text>
                                        </View>
                              </View>
                              <View style={styles.transanction}>
                                        <View style={styles.transanctionRight}>
                                                  <View style={styles.transanctionIcon}>
                                                            <FontAwesome name="dollar" size={30} color="#40c2d7f5" />
                                                  </View>
                                                  <View style={styles.transanctionMiddle}>
                                                            <Text style={styles.transationTitle}>Flight booking</Text>
                                                            <Text style={styles.transationDay}>17 june 2019</Text>
                                                  </View>
                                        </View>
                                        <View style={styles.transanctionAmount}>
                                                  <Text style={styles.amountSign}>-</Text>
                                                  <Text style={styles.amount}>$5100.10</Text>
                                        </View>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          transanctionHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginBottom: 20
          },
          transationsTitle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    opacity: 0.6
          },
          transanctionDate: {
                    color: '#000',
                    opacity: 0.5,
                    fontSize: 13,
                    fontWeight: 'bold',
                    marginTop: 5
          },
          transanction: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    backgroundColor: '#f2f6f7',
                    borderRadius: 10,
                    padding: 15,
                    marginVertical: 10
          },
          transanctionIcon: {
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: '#ebeded'
          },
          transanctionRight: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          transanctionMiddle: {
                    marginLeft: 15,
          },
          transationTitle: {
                    fontSize: 14,
                    color: '#000',
                    opacity: 0.7,
                    fontWeight: 'bold'
          },
          transationDay: {
                    fontSize: 13,
                    color: '#000',
                    opacity: 0.5,
          },
          transanctionAmount: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          amountSign: {
                    color: 'red',
                    fontWeight: 'bold'
          },
          amount: {
                    fontWeight: 'bold'
          },
})