import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import UserPayment from '../../components/UserPayment/UserPayment'
import UsersPaymentsQuickActions from '../../components/UsersPaymentsQuickActions/UsersPaymentsQuickActions'
import UsersPaymentContext from '../../context/UsersPaymentContext'

export default function UsersPaymentTab() {
          const users = [
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 1,
                              actions: {
                                        action: true,
                                        rate: true,
                                        debt: 60000
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 2,
                              actions: {
                                        action: true,
                                        rate: false,
                                        debt: 0
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 3,
                              actions: {
                                        action: true,
                                        rate: true,
                                        debt: 0
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              id: 4,
                              actions: {
                                        action: false,
                                        rate: false,
                                        debt: 100000
                              }
                    }
          ]
          const [inSelect, setInSelect] = useState(false)
          const [selectedBatch, setSelectedBatch] = useState([])
          const [queueList, setQueueList] = useState({})
          const isSelected = (user) => selectedBatch.find(u => u.id == user.id)
          const toggleSelectedBatch = (user) => {
                    if(isSelected(user)) {
                              const newSelected = selectedBatch.filter(u => u.id != user.id)
                              setSelectedBatch(newSelected)
                              if(selectedBatch.length -1 === 0) {
                                        setInSelect(false)
                              }
                    } else {
                              setSelectedBatch(prev => ([...prev, user]))
                    }
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
                    setQueueList
          }
          return (
                    <UsersPaymentContext.Provider value={contextValue}>
                              <View style={{backgroundColor: '#fff', paddingHorizontal: 20, flex: 1}}>
                                        <Text>{JSON.stringify(queueList)}</Text>
                                        <FlatList data={users} keyExtractor={(user, index) => index.toString()} renderItem={({ item }) => <UserPayment user={item} />} />
                                        <UsersPaymentsQuickActions />
                              </View>
                    </UsersPaymentContext.Provider>
          )
}