import React from 'react'
import { View, Text,  StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


export default function DebtScreen() {
          const navigation = useNavigation()
          return (
                    <View style={styles.container}>
                              <Text>Dettes here</Text>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    paddingHorizontal: 20,
                    backgroundColor: '#fff'
          },
          header: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
          },
          headerLeftHand: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          goBackBtn: {
                    padding: 10,
                    paddingLeft: 0,
                    flexDirection: 'row',
                    alignItems: 'center'
          },
          debtTotal: {
          },
          totalTitle: {
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#777',
                    marginLeft: 10
          },
          nextBtn: {
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingVertical: 10,
          },
          nextText: {
                    color: '#189fed'
          }
})