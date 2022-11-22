import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, useWindowDimensions, Platform, StatusBar, Dimensions } from "react-native"
import { Entypo, Feather, MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { primaryColor } from "../../styles";
import Contributions from "../../components/ContributionTab/ContributionScreen/Contributions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import fetchApi from "../../utils/fetchApi";
import { ContributionInterface } from "../../interfaces/api/ContributionInterface";
import { COLORS } from "../../styles/COLORS";
import ContributorsSkeletons from "../../components/skeleton/Skeleton";

const { width: SCREEN_HEIGHT } = Dimensions.get('window')

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
export default function ContributionScreen() {
          const navigation = useNavigation()
          const [contributions, setContributions] = useState<ContributionInterface[]>([])
          const [loading, setLoading] = useState(true)


          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        const res = await fetchApi('/contributions')
                                        setContributions(res.data)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, []))

          const lastContribution = contributions.length > 0 ? contributions[0] : null
          return (
                    <View style={styles.container}>
                              <View style={styles.header}>
                                        <Text style={styles.title}>
                                                  Contribution
                                        </Text>
                                        <View style={styles.contributionRightSide}>
                                                  <TouchableNativeFeedback useForeground onPress={() => navigation.navigate('NewContributionScreen' as never)}>
                                                            <View style={{ overflow: "hidden", borderRadius: 10 }}>
                                                                      <View style={styles.headerIconTitle}>
                                                                                <Ionicons name="ios-add-circle" size={24} color={primaryColor} />
                                                                                <Text style={[styles.headerBtnTitle, { color: primaryColor }]}>Nouvelle</Text>
                                                                      </View>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                              </View>
                              {loading ? <ContributorsSkeletons /> : <>
                                        <Contributions contributions={contributions} />
                              </>}
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    backgroundColor: '#FFF'
          },
          header: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10
          },
          title: {
                    fontWeight: "bold",
                    color: '#777',
                    fontSize: 18
          },
          contributionRightSide: {

          },
          headerIconTitle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F1F1F1',
                    paddingHorizontal: 10,
                    paddingVertical: 5
          },
          headerBtnTitle: {
                    color: '#777',
                    marginLeft: 5,
                    fontWeight: 'bold',
                    fontSize: 13
          },
})