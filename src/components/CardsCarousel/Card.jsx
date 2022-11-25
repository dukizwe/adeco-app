import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import randomInt from '../../helpers/randomInt'
import styles from './styles'
export default function Card({item}) {
          return (
                    <View style={{...styles.card, backgroundColor: item.color}}>
                              <View style={styles.cardHeader}>
                                        <View style={styles.cardCode}>
                                                  <View style={styles.line1Container}>
                                                            <View style={styles.line1}></View>
                                                  </View>
                                                  <View style={styles.line23Container}>
                                                            <View style={styles.line2}></View>
                                                            <View style={styles.line3}></View>
                                                  </View>
                                        </View>
                                        <View style={styles.date}>
                                                  <Text style={styles.dateText}>17 sep, 2021</Text>
                                        </View>
                              </View>
                              <View style={styles.cardAmounts}>
                                        <Text style={styles.mainAmount}>1 000 000 000 BIF</Text>
                                        <Text style={styles.availableAmount}>500 000 BIF</Text>
                              </View>
                              <View style={styles.cardFooter}>
                                        <View style={styles.benefitAmount}>
                                                  <Text style={styles.benefitAmountText}>+30 000</Text>
                                        </View>
                                        <View style={styles.monthDescs}>
                                                  <View style={{...styles.monthDesc, borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 2}}>
                                                            <View style={styles.descTitle}><Text style={styles.descTitleText}>Dettes</Text></View>
                                                            <View style={styles.descCount}><Text style={styles.descCountText}>1</Text></View>
                                                  </View>
                                                  <View style={{...styles.monthDesc, paddingTop: 2}}>
                                                            <View style={styles.descTitle}><Text style={styles.descTitleText}>Retard</Text></View>
                                                            <View style={styles.descCount}><Text style={styles.descCountText}>3</Text></View>
                                                  </View>
                                        </View>
                              </View>
                    </View>
          )
}