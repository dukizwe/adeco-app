import React, { useEffect } from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import CardsCarousel, { entries } from '../components/CardsCarousel/CardsCarousel';
import Activities from '../components/Activities/Activities';

export default function HomeScreen() {
          useEffect(() => {
                    (async () => {
                              // await AsyncStorage.removeItem('user')
                    })()
          }, [])
          return (
                    <ScrollView style={styles.home}>
                              <CardsCarousel />
                              <Activities />
                    </ScrollView>
          )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
          home: {
                    paddingHorizontal: 30,
                    backgroundColor: '#fff',
                    height: '100%'
          },
          
})