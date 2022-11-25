import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { LineChart, PieChart, ProgressChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

export default function ContributionChart() {
          const { width } = useWindowDimensions()
          const [performanceData, setPerformanceData] = useState<LineChartData>({
                    labels: ["Action", "Dettes", "Dettes", "Action", "Dettes", "Dettes"],
                    datasets: [{
                              data: [15000, 5000, 40000, 30000, 20000, 40000],
                              color: (opacity = 1) => `#34A9FF`, // optional
                              strokeWidth: 1
                    }]
          })
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
                              <LineChart
                                        data={performanceData}
                                        width={width + 40}
                                        height={256}
                                        chartConfig={chartConfig}
                                        formatYLabel={value => "15k"}
                                        bezier
                                        yLabelsOffset={20}
                                        withHorizontalLines={false}
                                        withVerticalLines={false}
                                        fromZero
                                        onDataPointClick={(data) => {
                                                  // setSelectedDataPoint({
                                                  //           index: data.index,
                                                  //           value: data.value
                                                  // })
                                                  // Animated.spring(translateX, {
                                                  //           toValue: data.x - 25,
                                                  //           useNativeDriver: true
                                                  // }).start()
                                                  // Animated.spring(translateY, {
                                                  //           toValue: data.y - 10,
                                                  //           useNativeDriver: true
                                                  // }).start()
                                        }}
                                        style={{ zIndex: -1, marginTop: 40, marginLeft: -20 }}
                              // renderDotContent={({x, y, index, indexData}) => <Text key={index}>hy</Text>}
                              // withHorizontalLabels={false}
                              // withInnerLines={false}
                              // withOuterLines={false}
                              />
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    paddingHorizontal: 20
          }
})