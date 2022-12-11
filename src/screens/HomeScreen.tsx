import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, ScrollView, Text, View, RefreshControl } from 'react-native'
import CardsCarousel, { entries } from '../components/CardsCarousel/CardsCarousel';
import Activities from '../components/Activities/Activities';
import Header from '../components/HomeTab/Header';
import ContributionDashboard from '../components/HomeTab/ContributionDashboard';
import ContributionChart from '../components/HomeTab/ContributionChart';
import ContributorsTree from '../components/HomeTab/ContributorsTree';
import { ContributionInterface } from '../interfaces/api/ContributionInterface';
import fetchApi from '../utils/fetchApi';
import { ActivitiesCategoriesStyles, ActivityStyles } from '../components/Activities/styles';
import HomeSkeletons from '../components/skeleton/HomeSkeletons';
import { COLORS } from '../styles/COLORS';



export default function HomeScreen() {
          const [loading, setLoading] = useState(true)
          const [contributions, setContributions] = useState<ContributionInterface[]>([])
          const [activendex, setActiveIndex] = useState(0)
          const [selectedContribution, setSelectedContribution] = useState<ContributionInterface | null>(null)
          const [refreshing, setRefreshing] = useState(false)

          useEffect(() => {
                    (async () => {
                              try {
                                        const res = await fetchApi('/contributions')
                                        const contr: ContributionInterface[] = res.data.reverse()
                                        setContributions(contr)
                                        setActiveIndex(contr.length-1)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, [])
          useEffect(() => {
                    const contribution = contributions.find((_, index) => index == activendex) || null
                    setSelectedContribution(contribution)
          }, [activendex, contributions])


          const onRefresh = async () => {
                    try {
                              const res = await fetchApi('/contributions')
                              const contr: ContributionInterface[] = res.data.reverse()
                              setContributions(contr)
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setRefreshing(false)
                    }
          }
                    
          return (
                    <>
                    <Header />
                    <ScrollView
                              style={styles.home}
                              showsVerticalScrollIndicator={false}
                              refreshControl={<RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        colors={[COLORS.primary]}
                              />}
                    >
                              {loading ? <HomeSkeletons /> :
                              <>
                              <CardsCarousel
                                        contributions={contributions}
                                        activendex={activendex}
                                        setActiveIndex={setActiveIndex}
                                        selectedContribution={selectedContribution}
                                        defaultActiveIndex={contributions.length-1}
                              />
                             {selectedContribution ? <>
                             <ContributionDashboard selectedContribution={selectedContribution} />
                              <ContributionChart selectedContribution={selectedContribution} />
                              </> : null}
                              <Activities loading={false} setLoading={setLoading} />
                              {/* <ContributorsTree /> */}
                              </>
                              }
                    </ScrollView>
                    </>
          )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
          home: {
                    backgroundColor: '#fff',
                    flex: 1
          },
          
})