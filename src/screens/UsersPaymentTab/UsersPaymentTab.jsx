import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { FlatList, Text, View, BackHandler } from 'react-native'
import UsersPayHeader from '../../components/Header/UsersPayHeader'
import UserPayListHeader from '../../components/UsersPaymentTab/UserPayListHeader'
import UserPayment from '../../components/UsersPaymentTab/UserPayment'
import UsersPaymentsQuickActions from '../../components/UsersPaymentTab/UsersPaymentsQuickActions'
import UsersPaymentContext from '../../context/UsersPaymentContext'

export default function UsersPaymentTab() {
          const { users, startAnimation } = useContext(UsersPaymentContext)
          return (
                    <View style={{backgroundColor: '#fff', paddingHorizontal: 20, flex: 1}}>
                              {/* <UsersPayHeader /> */}
                              <FlatList
                                        ListHeaderComponent={() => <UserPayListHeader />}
                                        showsVerticalScrollIndicator={false}
                                        data={users}
                                        keyExtractor={(user, index) => index.toString()} renderItem={({ item }) => <UserPayment user={item} />}
                              />
                              {startAnimation && <UsersPaymentsQuickActions />}
                    </View>
          )
}