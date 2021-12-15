import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import UserPayment from '../../components/UserPayment/UserPayment'
import UsersPaymentContext from '../../context/UsersPaymentContext'

export default function UsersPaymentTab() {
          const users = [
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              hasDebt: true,
                              id: 1,
                              actions: {
                                        action: true,
                                        retard: true,
                                        dette: false
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              hasDebt: false,
                              id: 2,
                              actions: {
                                        action: true,
                                        retard: false,
                                        dette: true
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              hasDebt: false,
                              id: 3,
                              actions: {
                                        action: true,
                                        retard: true,
                                        dette: true
                              }
                    },
                    {
                              firstName: 'Darcy',
                              lastName: 'Dukizwe',
                              hasDebt: true,
                              id: 4,
                              actions: {
                                        action: false,
                                        retard: false,
                                        dette: false
                              }
                    }
          ]
          const [inSelect, setInSelect] = useState(false)
          const [selectedBatch, setSelectedBatch] = useState([])
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
                    inSelect,
                    setInSelect,
                    selectedBatch,
                    setSelectedBatch,
                    isSelected,
                    toggleSelectedBatch
          }
          return (
                    <UsersPaymentContext.Provider value={contextValue}>
                              <View style={{backgroundColor: '#fff', paddingHorizontal: 20}}>
                                        <FlatList data={users} keyExtractor={(user, index) => index.toString()} renderItem={({ item }) => <UserPayment user={item} />} />
                              </View>
                    </UsersPaymentContext.Provider>
          )
}