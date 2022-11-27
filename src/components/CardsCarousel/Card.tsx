import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import randomInt from '../../helpers/randomInt'
import { ContributionInterface } from '../../interfaces/api/ContributionInterface'
import styles from './styles'
export default function Card({ contribution }: {contribution: ContributionInterface} ) {
          const cardColors = ['#18a8c9', '#5d647f', '#3555a2', '#1b3555']

          return (
                    <View style={{...styles.card, backgroundColor: cardColors[randomInt(0, cardColors.length  - 1, 10)]}}>
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
                                                  <Text style={styles.dateText}>
                                                            { moment(contribution.contributionDate).format('DD MMM YYYY').toLowerCase() }
                                                  </Text>
                                        </View>
                              </View>
                              <View style={styles.cardAmounts}>
                                        <Text style={styles.mainAmount}>
                                                  { contribution.mainTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } BIF
                                        </Text>
                                        <Text style={styles.availableAmount}>
                                                  { contribution.availableTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } BIF
                                        </Text>
                              </View>
                              <View style={styles.cardFooter}>
                                        <View>
                                                  <Text style={styles.footerLabel}>Montant</Text>
                                                  <Text style={styles.benefitAmountText}>
                                                            {contribution.total > 0 ? '+' : ''}{ contribution.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } BIF
                                                  </Text>
                                        </View>
                                        <View>
                                                  <Text style={styles.footerLabel}>Contribution</Text>
                                                  <Text style={[styles.benefitAmountText, { textAlign: "center" }]}>
                                                            { contribution.month }
                                                  </Text>
                                        </View>
                              </View>
                    </View>
          )
}