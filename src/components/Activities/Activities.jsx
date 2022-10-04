import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet  } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'; 
import ActivitiesCategories from './ActivitiesCategories';
import { entries } from '../CardsCarousel/CardsCarousel';
import Activity from './Activity';
import { ActivitiesCategoriesStyles, ActivitiesStyles, ActivityStyles } from './styles';

const Skeletons = () => {
          return (
                    <View style={styles.transationsContainer}>
                              <View style={styles.transanctionHeader}>
                                        <View style={{width: 100, height: 15, borderRadius: 10,backgroundColor: '#d9ddde'}}></View>
                              </View>    
                              <View style={ActivitiesCategoriesStyles.quickActions}>
                                        {(new Array(4).fill(0)).map((category, i) => {
                                                  return (
                                                            <View key={i.toString()}>
                                                                      <View>
                                                                      <View style={ActivitiesCategoriesStyles.action} >
                                                                                <View style={{...ActivitiesCategoriesStyles.actionIcon, width: 70, height: 70, backgroundColor: '#d9ddde'}}>
                                                                                          
                                                                                </View>
                                                                                <View style={{...ActivitiesCategoriesStyles.actionTitle, width: 50, height: 10, borderRadius: 10,backgroundColor: '#d9ddde'}}></View>
                                                                      </View>
                                                                      </View>
                                                            </View>
                                                  )}
                                        )}
                              </View>
                              <View style={{width: 100, height: 15, borderRadius: 10,backgroundColor: '#d9ddde'}}></View>
                              {(new Array(10).fill(0)).map((activity, i) => {
                                        return <View key={i.toString()}>
                                        <View style={{...ActivityStyles.transanction, backgroundColor: '#d9ddde'}}>
                                                  <View style={ActivityStyles.transanctionMain}>
                                                            <View style={ActivityStyles.transanctionRight}>
                                                                      <View style={{...ActivityStyles.transanctionIcon, width: 50, height: 50, borderRadius: 100, backgroundColor: '#fff'}}>
                                                                               
                                                                      </View>
                                                                      <View style={ActivityStyles.transanctionMiddle}>
                                                                                <View style={{width: 100, height: 15, borderRadius: 10,backgroundColor: '#fff'}}></View>
                                                                                <View style={{width: 60, height: 10, borderRadius: 10,backgroundColor: '#fff', marginTop: 10}}></View>
                                                                      </View>
                                                            </View>
                                                            <View style={ActivityStyles.transanctionAmount}>
                                                                      <View style={{width: 80, height: 20, borderRadius: 10,backgroundColor: '#fff'}}></View>
                                                            </View>
                                                  </View>
                                        </View>
                                        </View>
                              })}
                    </View>
          )
}

export default function Activities({ loading, setLoading }) {
          useEffect(() => {
                    setTimeout(() => {
                              setLoading(false)
                    }, 3000)
          }, [])
          return (
                    <>
                    {loading ? <Skeletons /> :
                    <View style={styles.transationsContainer}>
                              <View style={styles.transanctionHeader}>
                                        <Text style={styles.transationsTitle}>Activites</Text>
                              </View>
                              <ActivitiesCategories />
                              <Text style={styles.transanctionDate}>Today</Text>
                              {/* {entries.map((activity, i) =><Activity activity={activity} key={i.toString()} />)} */}
                    </View>}
                    </>
          )
}

const styles = ActivitiesStyles