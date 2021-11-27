import React from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFecth'
import {
          LineChart,
          BarChart,
          PieChart,
          ProgressChart,
          ContributionGraph,
          StackedBarChart
        } from "react-native-chart-kit";
import {
          completedAffectationSelector,
          uncompletedAffectationSelector } from '../../store/selectors/affectationsSelector';
import { userSelector } from '../../store/selectors/userSelector';

const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen() {
          const navigation = useNavigation()
          const completedAffectations = useSelector(completedAffectationSelector)
          const uncompletedAffectations = useSelector(uncompletedAffectationSelector)
          const chartConfig = {
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                              borderRadius: 15
                    },
                    propsForDots: {
                              r: "6",
                              strokeWidth: "2",
                              stroke: "#ffa726"
                    }
          }
          const user = useSelector(userSelector)
          const [affectationsLoading, affectationsReport] = useFetch('http://app.mediabox.bi:3140/affectationsReports/'+user?.collaboId)
          const [crasLoading, crasReport] = useFetch('http://app.mediabox.bi:3140/crasReports/'+user?.collaboId)
          const affectationsMonths = affectationsReport.map(data => data.month)
          const affectationsDatas = []
          for(let i = 1; i <= 12;  i++) {
                    if(affectationsMonths.includes(i)) {
                              affectationsDatas.push(affectationsReport.find(data => data.month == i).count)
                    } else {
                              affectationsDatas.push(0)
                    }
          }
          const crasMonths = crasReport.map(data => data.month)
          const crasDatas = []
          for(let i = 1; i <= 12;  i++) {
                    if(crasMonths.includes(i)) {
                              crasDatas.push(crasReport.find(data => data.month == i).count)
                    } else {
                              crasDatas.push(0)
                    }
          }
          return (
                    <View style={styles.profileContent}>
                              <View  style={styles.header}>
                                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
                                                  <Ionicons name="arrow-back-outline" size={24} color="black" />
                                        </TouchableOpacity>
                              </View>
                              <ScrollView>
                                        <View style={{paddingBottom: 100}}>
                              <View style={styles.dashboard}>
                                        <View style={{paddingRight: 5, flex: 1}}>
                                                  <View style={{...styles.countContainer, backgroundColor: '#d6246c'}}>
                                                            <View style={styles.description}>
                                                                      <Feather name="circle" size={40} color="#ebf6ff" />
                                                                      <Text style={styles.affectationCount}>{uncompletedAffectations.length}</Text>
                                                                      <Text style={styles.affectationLabel}>Activités Non terminés</Text>
                                                            </View>
                                                            <Text style={styles.mutedText} numberOfLines={1}>6/11/2020</Text>
                                                  </View>
                                        </View>
                                        <View style={{paddingLeft: 5, flex: 1}}>
                                                  <View style={styles.countContainer}>
                                                            <View style={styles.description}>
                                                                      <AntDesign name="checkcircle" size={40} color="#ebf6ff" />
                                                                      <Text style={styles.affectationCount}>{completedAffectations.length}</Text>
                                                                      <Text style={styles.affectationLabel}>Activités terminés</Text>
                                                            </View>
                                                            <Text style={styles.mutedText} numberOfLines={1}>12/5/2017</Text>
                                                  </View>
                                        </View>
                              </View>
                              <View style={{paddingRight: 15}}>
                                        <Text style={styles.chartTitle}>Nombre d'affectations par mois</Text>
                                        <LineChart
                                                  data={{
                                                            labels: ["Ja", "Fé", "Ma", "Ap", "Ma", "Ju", "Ju", "Ao", "Sep", "Oct", "No", "Dé"],
                                                            datasets: [
                                                                      {
                                                                                data: affectationsDatas
                                                                      }
                                                            ]
                                                  }}
                                                  width={screenWidth - 30} // from react-native
                                                  height={220}
                                                  yAxisInterval={1} // optional, defaults to 1
                                                  chartConfig={{...chartConfig, 
                                                            backgroundGradientFrom: "#2095c1",
                                                            backgroundGradientTo: "#2095c1",}}
                                                  bezier
                                                  style={{
                                                            marginVertical: 8,
                                                            borderRadius: 15
                                                  }}
                                        />
                                        <Text style={styles.chartTitle}>Nombre de CRA par mois</Text>
                                        <LineChart
                                                  data={{
                                                            labels: ["Ja", "Fé", "Ma", "Ap", "Ma", "Ju", "Ju", "Ao", "Sep", "Oct", "No", "Dé"],
                                                            datasets: [
                                                                      {
                                                                                data: crasDatas
                                                                      }
                                                            ]
                                                  }}
                                                  width={screenWidth - 30} // from react-native
                                                  height={220}
                                                  yAxisInterval={1} // optional, defaults to 1
                                                  chartConfig={{...chartConfig, 
                                                            backgroundGradientFrom: "#2083c1",
                                                            backgroundGradientTo: "#a085c0",}}
                                                  bezier
                                                  style={{
                                                            marginVertical: 8,
                                                            borderRadius: 15
                                                  }}
                                        />{/* 
                                        <BarChart
                                                  data={{
                                                            labels: ["Ja", "Fé", "Ma", "Ap", "Ma", "Ju", "Ju", "Ao", "Sep", "Oct", "No", "Dé"],
                                                            datasets: [
                                                                      {
                                                                                data: crasDatas
                                                                      },
                                                            ]
                                                  }}
                                                  width={screenWidth - 30}
                                                  height={220}
                                                  chartConfig={{...chartConfig, 
                                                            backgroundGradientFrom: "#2095c1",
                                                            backgroundGradientTo: "#2095c1",}}
                                                  verticalLabelRotation={30}
                                                  style={{
                                                            marginVertical: 8,
                                                            borderRadius: 16
                                                  }}
                                                  showBarTops={true}
                                        /> */}
                                        {/* <Text style={styles.chartTitle}>Nombre de CRA par mois</Text>
                                        <ProgressChart
                                                  data={{
                                                            labels: ["Swim", "Bike", "Run"], // optional
                                                            data: [0.4, 0.6, 0.8]
                                                  }}
                                                  width={screenWidth - 30}
                                                  height={220}
                                                  strokeWidth={16}
                                                  radius={32}
                                                  chartConfig={{...chartConfig, 
                                                            backgroundGradientFrom: "#2083c1",
                                                            backgroundGradientTo: "#a085c0",}}
                                                  hideLegend={false}
                                                  style={{
                                                            marginVertical: 8,
                                                            borderRadius: 16
                                                  }}
                                        /> */}
                              </View>
                              </View>
                              </ScrollView>
                    </View>
          )
}