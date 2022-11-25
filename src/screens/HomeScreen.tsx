import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import CardsCarousel, { entries } from '../components/CardsCarousel/CardsCarousel';
import Activities from '../components/Activities/Activities';
import Header from '../components/HomeTab/Header';
import ContributionDashboard from '../components/HomeTab/ContributionDashboard';
import ContributionChart from '../components/HomeTab/ContributionChart';

export default function HomeScreen() {
          const [loading, setLoading] = useState(true)
          return (
                    <>
                    <Header />
                    <ScrollView style={styles.home}>
                              <CardsCarousel setLoading={setLoading} />
                              <ContributionDashboard />
                              <ContributionChart />
                              <Activities loading={loading} setLoading={setLoading}/>
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