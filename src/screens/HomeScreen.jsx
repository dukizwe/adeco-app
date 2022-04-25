import React, { useEffect, useState } from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import CardsCarousel, { entries } from '../components/CardsCarousel/CardsCarousel';
import Activities from '../components/Activities/Activities';

export default function HomeScreen() {
          useEffect(() => {
                    (async () => {
                              // await AsyncStorage.removeItem('user')
                    })()
          }, [])
          const [loading, setLoading] = useState(true)
          return (
                    <ScrollView style={styles.home}>
                              <CardsCarousel setLoading={setLoading} />
                              <Activities loading={loading} setLoading={setLoading}/>
                    </ScrollView>
          )
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
          home: {
                    backgroundColor: '#fff',
                    flex: 1
          },
          
})