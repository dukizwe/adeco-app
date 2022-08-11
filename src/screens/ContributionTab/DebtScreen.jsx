import React, { useCallback, useState } from 'react'
import { View, Text,  StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import DebtScreenHeader from '../../components/ContributionTab/DebtScreenHeader';
import { useContext } from 'react';
import ContributionContext from '../../context/ContributionContext';
import UserPayment from '../../components/ContributionTab/UserPayment';
import UserDebt from '../../components/ContributionTab/UserDebt';
import DebtForm from '../../components/ContributionTab/DebtForm';


export default function DebtScreen() {
          const navigation = useNavigation()
          const { users } = useContext(ContributionContext)
          const [showForm, setShowForm] = useState(false)
          const onUserPress = useCallback((userId) => {
                    setShowForm(userId)
          })
          console.log('render')
          return (
                    <>
                    <View style={styles.container}>
                              <DebtScreenHeader />
                              <FlatList
                                        // ListHeaderComponent={() => <DebtScreenHeader />}
                                        showsVerticalScrollIndicator={false}
                                        data={users}
                                        keyExtractor={(user, index) => index.toString()} renderItem={({ item }) => <UserDebt user={item} onUserPress={onUserPress} />}
                              />
                    </View>
                    {showForm && <DebtForm onClose={() => setShowForm(false)} />}
                    </>
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