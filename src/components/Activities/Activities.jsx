import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet  } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'; 
import ActivitiesCategories from './ActivitiesCategories';
import { entries } from '../CardsCarousel/CardsCarousel';
import Activity from './Activity';

export default function Activities() {
          return (
                    <View style={styles.transationsContainer}>
                              <View style={styles.transanctionHeader}>
                                        <Text style={styles.transationsTitle}>Activites</Text>
                              </View>
                              <ActivitiesCategories />
                              <Text style={styles.transanctionDate}>Today</Text>
                              {entries.map((activity, i) =><Activity activity={activity} key={i.toString()} />)}
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
          }
})