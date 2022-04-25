import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, BackHandler } from 'react-native'
import UsersPayHeader from '../../components/Header/UsersPayHeader'
import UserPayListHeader from '../../components/UsersPaymentTab/UserPayListHeader'
import UserPayment from '../../components/UsersPaymentTab/UserPayment'
import UsersPaymentsQuickActions from '../../components/UsersPaymentTab/UsersPaymentsQuickActions'
import UsersPaymentContext from '../../context/UsersPaymentContext'

export default function UsersPaymentTab() {
          const users = [
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 1,
                              actions: {
                                        action: 6000,
                                        rate: 2000,
                                        debt: 60000
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 2,
                              actions: {
                                        action: 6000,
                                        rate: 2000,
                                        debt: 0
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 3,
                              actions: {
                                        action: 6000,
                                        rate: 2000,
                                        debt: 0
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 4,
                              actions: {
                                        action: 6000,
                                        rate: 2000,
                                        debt: 100000
                              }
                    }
          ]
          const [inSelect, setInSelect] = useState(false)
          const [selectedBatch, setSelectedBatch] = useState([])
          const [queueList, setQueueList] = useState({})
          const [startAnimation, setStartAnimation] = useState(false)
          const isSelected = (user) => selectedBatch.find(u => u.id == user.id)
          const toggleSelectedBatch = (user) => {
                    if(isSelected(user)) {
                              const newSelected = selectedBatch.filter(u => u.id != user.id)
                              setSelectedBatch(newSelected)
                              if(selectedBatch.length-1 === 0) {
                                        setInSelect(false)
                                        setStartAnimation(false)
                              }
                    } else {
                              setSelectedBatch(prev => ([...prev, user]))
                    }
          }
          const onUserLongPress = (user) => {
                    setInSelect(true)
                    toggleSelectedBatch(user)
                    setStartAnimation(true)
          }
          const contextValue = {
                    users,
                    inSelect,
                    setInSelect,
                    selectedBatch,
                    setSelectedBatch,
                    isSelected,
                    toggleSelectedBatch,
                    queueList,
                    setQueueList,
                    onUserLongPress,
                    setStartAnimation
          }
          return (
                    <UsersPaymentContext.Provider value={contextValue}>
                              <View style={{backgroundColor: '#fff', paddingHorizontal: 20, flex: 1}}>
                                        <UsersPayHeader />
                                        <FlatList
                                                  ListHeaderComponent={() => <UserPayListHeader />}
                                                  showsVerticalScrollIndicator={false}
                                                  data={users}
                                                  keyExtractor={(user, index) => index.toString()} renderItem={({ item }) => <UserPayment user={item} />}
                                        />
                                        {startAnimation && <UsersPaymentsQuickActions />}
                              </View>
                    </UsersPaymentContext.Provider>
          )
}