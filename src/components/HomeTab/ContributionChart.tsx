import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { LineChart, PieChart, ProgressChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { ContributionInterface } from "../../interfaces/api/ContributionInterface";
import numeral from "numeral"

interface DotContentProps {
          x: number;
          y: number;
          index: number;
          indexData: number;
}
const DotContent = ({ x, y, index, indexData }: DotContentProps) => {
          const amount = indexData >= 1000000 ? numeral(indexData).format('0.0a').toUpperCase() : indexData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          return (
                    indexData > 0 ? <View
                              style={[
                                        styles.dotContent,
                                        {
                                                  transform: [
                                                            { translateX: x - 40 },
                                                            { translateY: y - 55 }
                                                  ] 
                                        }
                              ]}>
                              <Text style={styles.dotContentText}>
                                        +{ amount }
                              </Text>
                              <View style={styles.downCaret} />
                    </View> : null
          )
}

export default function ContributionChart({ selectedContribution }: { selectedContribution: ContributionInterface }) {
          const { width } = useWindowDimensions()
          const activitiesAmount = selectedContribution.inActivitiesAmount - selectedContribution.outActivitiesAmount
          const performanceData: LineChartData = {
                    labels: ["Action", "Mensuel", "Reglées", "Rendus", "Retard", "Activités"],
                    datasets: [{
                              data: [
                                        selectedContribution.actionsAmount,
                                        selectedContribution.monthlyAmount,
                                        selectedContribution.payedDebtsAmount,
                                        selectedContribution.debtsAmount,
                                        selectedContribution.latesAmount,
                                        selectedContribution.inActivitiesAmount
                              ],
                              color: (opacity = 1) => `#34A9FF`, // optional
                              strokeWidth: 1
                    }]
          }
          const chartConfig: AbstractChartConfig = {
                    backgroundGradientFrom: "#fff",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "#fff",
                    backgroundGradientToOpacity: 0.5,
                    color: (opacity = 1) => `#777`,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    decimalPlaces: 0,
                    useShadowColorFromDataset: true // optional,
          };
          return (
                    <View style={styles.container}>
                              <ScrollView
                                        horizontal
                                        style={{ height: 300 }}
                                        disableIntervalMomentum={true}
                                        showsHorizontalScrollIndicator={false}
                              >
                                        <LineChart
                                                  data={performanceData}
                                                  width={500}
                                                  height={256}
                                                  chartConfig={chartConfig}
                                                  formatYLabel={value => numeral(value).format('0a')}
                                                  bezier
                                                  yLabelsOffset={20}
                                                  withHorizontalLines={false}
                                                  withVerticalLines={false}
                                                  fromZero
                                                  style={{ zIndex: -1, marginTop: 60, marginLeft: -20, paddingHorizontal: 20 }}
                                                  renderDotContent={({index, ...params}) => <DotContent index={index} {...params}  key={index} />}
                                        />
                              </ScrollView>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    // paddingHorizontal: 20
          },
          dotContent: {
                    backgroundColor: '#1b3555',
                    width: 80,
                    borderRadius: 30,
                    height: 40,
                    position: "absolute",
                    justifyContent: "center"
          },
          dotContentText: {
                    fontSize: 12,
                    color: '#FFF',
                    textAlign: "center",
                    fontWeight: "bold",
          },
          downCaret: {
                    position: 'absolute',
                    width: 15,
                    height: 15,
                    backgroundColor: '#1b3555',
                    borderRadius: 4,
                    zIndex: 1,
                    alignSelf: 'center',
                    bottom: '-15%',
                    transform: [{
                              rotate: '45deg'
                    }]
          },
})