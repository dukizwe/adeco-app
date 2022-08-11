import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { FlatList, Text, View, BackHandler } from 'react-native'
import UserPayListHeader from '../../components/ContributionTab/UserPayListHeader'
import UserPayment from '../../components/ContributionTab/UserPayment'
import ContributionQuickActions from '../../components/ContributionTab/ContributionQuickActions'
import ContributionContext from '../../context/ContributionContext'

export default function ContributionTab() {
          const { users, startAnimation } = useContext(ContributionContext)
          return (
                    <View style={{backgroundColor: '#fff', paddingHorizontal: 20, flex: 1}}>
                              <FlatList
                                        ListHeaderComponent={() => <UserPayListHeader />}
                                        showsVerticalScrollIndicator={false}
                                        data={users}
                                        keyExtractor={(user, index) => index.toString()} renderItem={({ item }) => <UserPayment user={item} />}
                              />
                              {startAnimation && <ContributionQuickActions />}
                    </View>
          )
}